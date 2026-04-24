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
    })
  } catch (err) {
    console.error('[proxy] falha ao conectar ao backend:', err)
    return Response.json(
      { message: 'Não foi possível conectar ao servidor de IA.' },
      { status: 502 },
    )
  }

  const data = await response.json().catch(() => ({}))
  return Response.json(data, { status: response.status })
}
