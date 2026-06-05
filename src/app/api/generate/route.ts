import type { NextRequest } from 'next/server'
import { generateStructuredPrompt } from '@/lib/gemini'

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

export async function POST(request: NextRequest) {
  const ip =
    request.headers.get('x-forwarded-for')?.split(',')[0].trim() ||
    request.headers.get('x-real-ip') ||
    'unknown'

  const rateCheck = checkRateLimit(ip)
  if (!rateCheck.allowed) {
    return Response.json(
      { message: `Muitas requisições. Tente novamente em ${rateCheck.retryAfter} segundos.` },
      { status: 429, headers: { 'Retry-After': String(rateCheck.retryAfter) } },
    )
  }

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
    const retryAfter = (err as { retryAfter?: number }).retryAfter
    const headers = retryAfter ? { 'Retry-After': String(retryAfter) } : undefined
    return Response.json({ message }, { status: statusCode, headers })
  }
}
