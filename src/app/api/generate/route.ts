import type { NextRequest } from 'next/server'
import { generateStructuredPrompt } from '@/lib/gemini'

export async function POST(request: NextRequest) {
  let body: { text?: unknown }
  try {
    body = await request.json()
  } catch {
    return Response.json({ message: 'Requisição inválida.' }, { status: 400 })
  }

  const text = typeof body?.text === 'string' ? body.text.trim() : ''
  if (!text || text.length < 3) {
    return Response.json({ message: 'Texto muito curto. Mínimo 3 caracteres.' }, { status: 400 })
  }
  if (text.length > 1000) {
    return Response.json({ message: 'Texto muito longo. Máximo 1000 caracteres.' }, { status: 400 })
  }

  try {
    const result = await generateStructuredPrompt(text)
    return Response.json(result)
  } catch (err) {
    const statusCode = (err as { statusCode?: number }).statusCode ?? 500
    const message = err instanceof Error ? err.message : 'Erro interno do servidor.'
    return Response.json({ message }, { status: statusCode })
  }
}
