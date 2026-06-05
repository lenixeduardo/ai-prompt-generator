import { GoogleGenerativeAI, SchemaType } from '@google/generative-ai'
import type { PromptOutput } from '@/types/prompt'

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

export async function generateStructuredPrompt(userText: string): Promise<PromptOutput> {
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!)

  const model = genAI.getGenerativeModel({
    model: 'gemini-2.5-pro',
    systemInstruction: SYSTEM_PROMPT,
    generationConfig: {
      maxOutputTokens: 8192,
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

  let text: string
  try {
    const result = await model.generateContent(userText)
    text = result.response.text()
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err)
    throw Object.assign(
      new Error(`Falha ao chamar a API Gemini: ${message}`),
      { statusCode: 502 },
    )
  }

  try {
    const parsed = JSON.parse(text) as PromptOutput
    if (!Array.isArray(parsed.tags)) parsed.tags = []
    return parsed
  } catch {
    throw Object.assign(
      new Error('A IA retornou uma resposta malformada. Tente novamente.'),
      { statusCode: 502 },
    )
  }
}
