import type { NextRequest } from 'next/server'

export async function POST(request: NextRequest) {
  const apiUrl = process.env.API_URL ?? 'http://localhost:3001'

  let body: unknown
  try {
    body = await request.json()
  } catch {
    return Response.json({ message: 'Requisição inválida.' }, { status: 400 })
  }

  let response: Response
  try {
    response = await fetch(`${apiUrl}/api/generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
      signal: AbortSignal.timeout(25_000),
    })
  } catch (err) {
    const isTimeout = err instanceof Error && err.name === 'TimeoutError'
    console.error('[proxy] falha ao conectar ao backend:', err)
    return Response.json(
      { message: isTimeout
          ? 'O servidor de IA demorou muito para responder. Tente novamente.'
          : 'Não foi possível conectar ao servidor de IA.' },
      { status: isTimeout ? 504 : 502 },
    )
  }

  const data = await response.json().catch(() => ({}))
  return Response.json(data, { status: response.status })
}
