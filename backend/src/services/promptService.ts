import { GoogleGenerativeAI, SchemaType } from '@google/generative-ai'

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!)

const SYSTEM_PROMPT = `You are a world-class Prompt Engineer specializing in the P-C-R-F-I framework (Precision, Context, Representation, Format, Iteration) and structured prompt architecture for Large Language Models.

Your sole purpose is to transform any simple, vague user input into a highly optimized, production-ready structured prompt.

## P-C-R-F-I Framework Application
- **P (Precisão/Precision)**: Eliminate ambiguity. Define objectives with measurable specificity.
- **C (Contexto/Context)**: Enrich with audience, purpose, domain constraints, and relevant background.
- **R (Representação/Representation)**: Define a precise, domain-expert persona with relevant credentials.
- **F (Formato/Format)**: Specify output structure, length, tone, voice, and style guidelines.
- **I (Iteração/Iteration)**: Embed quality criteria and refinement guidance within the prompt.

## Output Rules
1. Respond ONLY with valid JSON — zero markdown fences, zero explanations, zero extra text outside the JSON object.
2. Detect the user's input language and match ALL output field values to that language.
3. Make the persona hyper-specific (e.g., "Sommelier de Café Especial com 15 anos de experiência e certificação SCA, especializado em origens brasileiras" instead of "expert in coffee").
4. Task must open with a strong imperative verb (Escreva, Crie, Analise, Desenvolva, Redija...).
5. Context must address: target audience skill level, primary purpose, and key constraints.
6. Format must specify: structure type (listicle, ensaio, passo a passo), approximate length, tone, and voice.
7. Examples field: provide 1-2 brief but concrete illustrative examples that show the expected output pattern, or "N/A" if not applicable.
8. optimizedPrompt: a single, seamless, ready-to-paste prompt that elegantly integrates all five elements as one cohesive instruction.
9. Tags: 3-5 lowercase, hyphenated semantic tags describing the domain and output type.

## Strict JSON Schema (no extra keys)
{
  "persona": "string",
  "task": "string",
  "context": "string",
  "format": "string",
  "examples": "string",
  "optimizedPrompt": "string",
  "tags": ["string"]
}`

export interface PromptOutput {
  persona: string
  task: string
  context: string
  format: string
  examples: string
  optimizedPrompt: string
  tags: string[]
}

// Fallback chain: try each model in order until one succeeds
const MODEL_CHAIN = ['gemini-2.0-flash', 'gemini-1.5-flash', 'gemini-1.5-flash-8b']

// Auto-retry threshold: if retryAfter <= this value (seconds), wait and retry silently
const AUTO_RETRY_MAX_WAIT = 15

// In-memory response cache: key = normalised input, value = { result, expiry }
const responseCache = new Map<string, { result: PromptOutput; expiry: number }>()
const CACHE_TTL = 60 * 60 * 1000   // 1 hour
const CACHE_MAX_SIZE = 200

function getCached(key: string): PromptOutput | null {
  const entry = responseCache.get(key)
  if (!entry) return null
  if (Date.now() > entry.expiry) {
    responseCache.delete(key)
    return null
  }
  return entry.result
}

function setCached(key: string, result: PromptOutput): void {
  if (responseCache.size >= CACHE_MAX_SIZE) {
    responseCache.delete(responseCache.keys().next().value as string)
  }
  responseCache.set(key, { result, expiry: Date.now() + CACHE_TTL })
}

function isQuotaError(message: string): boolean {
  return message.includes('429') || message.includes('quota') || message.includes('Too Many Requests')
}

function parseRetryAfter(message: string): number {
  const match = message.match(/retry.*?(\d+(?:\.\d+)?)s/i)
  return match ? Math.ceil(parseFloat(match[1])) : 60
}

function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms))
}

async function callModel(modelName: string, userText: string): Promise<string> {
  const model = genAI.getGenerativeModel({
    model: modelName,
    systemInstruction: SYSTEM_PROMPT,
    generationConfig: {
      maxOutputTokens: 2048,
      responseMimeType: 'application/json',
      responseSchema: {
        type: SchemaType.OBJECT,
        properties: {
          persona:         { type: SchemaType.STRING },
          task:            { type: SchemaType.STRING },
          context:         { type: SchemaType.STRING },
          format:          { type: SchemaType.STRING },
          examples:        { type: SchemaType.STRING },
          optimizedPrompt: { type: SchemaType.STRING },
          tags: { type: SchemaType.ARRAY, items: { type: SchemaType.STRING } },
        },
        required: ['persona', 'task', 'context', 'format', 'examples', 'optimizedPrompt', 'tags'],
      },
    },
  })
  const result = await model.generateContent(userText)
  return result.response.text()
}

export async function generateStructuredPrompt(userText: string): Promise<PromptOutput> {
  const cacheKey = userText.trim().toLowerCase()
  const cached = getCached(cacheKey)
  if (cached) return cached

  let lastErr: unknown
  let text: string | undefined

  for (const modelName of MODEL_CHAIN) {
    try {
      text = await callModel(modelName, userText)
      lastErr = undefined
      break
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err)

      if (!isQuotaError(message)) {
        throw Object.assign(
          new Error(`Falha ao chamar a API Gemini: ${message}`),
          { statusCode: 502 },
        )
      }

      const retryAfter = parseRetryAfter(message)
      lastErr = err

      if (retryAfter <= AUTO_RETRY_MAX_WAIT) {
        await sleep(retryAfter * 1000)
        try {
          text = await callModel(modelName, userText)
          lastErr = undefined
          break
        } catch (retryErr) {
          const retryMsg = retryErr instanceof Error ? retryErr.message : String(retryErr)
          if (!isQuotaError(retryMsg)) {
            throw Object.assign(
              new Error(`Falha ao chamar a API Gemini: ${retryMsg}`),
              { statusCode: 502 },
            )
          }
          lastErr = retryErr
        }
      }
      // quota still exceeded — try next model in chain
    }
  }

  if (text === undefined) {
    const message = lastErr instanceof Error ? lastErr.message : String(lastErr)
    const retryAfter = parseRetryAfter(message)
    throw Object.assign(
      new Error(`Cota da API excedida em todos os modelos. Tente novamente em ${retryAfter} segundos.`),
      { statusCode: 429, retryAfter },
    )
  }

  try {
    const parsed = JSON.parse(text) as PromptOutput
    if (!Array.isArray(parsed.tags)) parsed.tags = []
    setCached(cacheKey, parsed)
    return parsed
  } catch {
    throw Object.assign(
      new Error('A IA retornou uma resposta malformada. Tente novamente.'),
      { statusCode: 502 },
    )
  }
}
