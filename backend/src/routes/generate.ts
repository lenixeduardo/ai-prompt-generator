import { FastifyPluginAsync, FastifySchema } from 'fastify'
import { generateStructuredPrompt } from '../services/promptService'

interface GenerateBody {
  text: string
}

const schema: FastifySchema = {
  body: {
    type: 'object',
    required: ['text'],
    additionalProperties: false,
    properties: {
      text: { type: 'string', minLength: 3, maxLength: 1000 },
    },
  },
  response: {
    '4xx': {
      type: 'object',
      properties: {
        error: { type: 'string' },
        message: { type: 'string' },
      },
    },
  },
}

// Per-IP rate limiting: 5 requests per minute
const rateLimitMap = new Map<string, { count: number; resetAt: number }>()
const RATE_LIMIT = 5
const RATE_WINDOW = 60 * 1000 // 1 minute

function checkRateLimit(ip: string): { allowed: boolean; retryAfter?: number } {
  const now = Date.now()
  const entry = rateLimitMap.get(ip)

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_WINDOW })
    return { allowed: true }
  }

  if (entry.count >= RATE_LIMIT) {
    return { allowed: false, retryAfter: Math.ceil((entry.resetAt - now) / 1000) }
  }

  entry.count++
  return { allowed: true }
}

const generate: FastifyPluginAsync = async (fastify) => {
  fastify.post<{ Body: GenerateBody }>('/generate', { schema }, async (request, reply) => {
    const ip = (request.headers['x-forwarded-for'] as string | undefined)?.split(',')[0].trim()
      ?? request.ip
      ?? 'unknown'

    const rateCheck = checkRateLimit(ip)
    if (!rateCheck.allowed) {
      return reply
        .status(429)
        .header('Retry-After', String(rateCheck.retryAfter))
        .send({ message: `Muitas requisições. Tente novamente em ${rateCheck.retryAfter} segundos.` })
    }

    const result = await generateStructuredPrompt(request.body.text)
    return reply.status(200).send(result)
  })
}

export default generate
