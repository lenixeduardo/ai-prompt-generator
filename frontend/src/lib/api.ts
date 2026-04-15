import type { PromptOutput } from '@/types/prompt'

export async function generatePrompt(text: string): Promise<PromptOutput> {
  const res = await fetch('/api/generate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text }),
  })

  if (!res.ok) {
    const body = await res.json().catch(() => ({})) as { message?: string }
    throw new Error(body.message ?? `Erro HTTP ${res.status}`)
  }

  return res.json() as Promise<PromptOutput>
}
