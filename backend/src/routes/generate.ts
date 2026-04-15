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

const generate: FastifyPluginAsync = async (fastify) => {
  fastify.post<{ Body: GenerateBody }>('/generate', { schema }, async (request, reply) => {
    const result = await generateStructuredPrompt(request.body.text)
    return reply.status(200).send(result)
  })
}

export default generate
