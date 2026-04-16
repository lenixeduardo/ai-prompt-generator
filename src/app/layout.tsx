import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'AI Prompt Generator — Framework P-C-R-F-I',
  description:
    'Transforme ideias simples em prompts altamente otimizados usando o framework P-C-R-F-I: Precisão, Contexto, Representação, Formato e Iteração.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  )
}
