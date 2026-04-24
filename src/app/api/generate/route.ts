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
      signal: AbortSignal.timeout(25000),
    })
  } catch (err) {
    console.error('[proxy] backend unreachable', {
      apiUrl,
      error: err instanceof Error ? err.message : String(err),
      name: err instanceof Error ? err.name : 'Unknown',
    })

    const isTimeout = err instanceof Error && err.name === 'TimeoutError'
    return Response.json(
      {
        message: isTimeout
          ? 'O servidor de IA demorou demais para responder. Aguarde alguns segundos e tente novamente.'
          : 'Não foi possível conectar ao servidor de IA.',
      },
      { status: isTimeout ? 504 : 502 },
    )
  }

  const data = await response.json().catch(() => ({}))
  return Response.json(data, { status: response.status })
}
