import Fastify from 'fastify'
import cors from '@fastify/cors'
import generateRoute from './routes/generate'

if (!process.env.GEMINI_API_KEY) {
  console.error('FATAL: GEMINI_API_KEY environment variable is not set.')
  process.exit(1)
}

const server = Fastify({
  logger: {
    transport:
      process.env.NODE_ENV !== 'production'
        ? { target: 'pino-pretty', options: { colorize: true } }
        : undefined,
  },
})

const start = async () => {
  await server.register(cors, {
    origin: process.env.FRONTEND_URL ?? 'http://localhost:3000',
    methods: ['GET', 'POST', 'OPTIONS'],
  })

  server.setErrorHandler((error, _request, reply) => {
    const statusCode = error.statusCode ?? 500
    server.log.error(error)
    reply.status(statusCode).send({
      error: error.name,
      message: statusCode < 500 ? error.message : 'Internal Server Error',
    })
  })

  server.get('/health', async () => ({ status: 'ok' }))

  await server.register(generateRoute, { prefix: '/api' })

  const port = Number(process.env.PORT ?? 3001)
  await server.listen({ port, host: '0.0.0.0' })
}

start().catch((err) => {
  console.error(err)
  process.exit(1)
})
