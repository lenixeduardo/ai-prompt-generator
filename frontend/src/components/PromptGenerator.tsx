'use client'

import { useState, useCallback, useRef } from 'react'
import {
  User,
  Target,
  MapPin,
  LayoutList,
  Lightbulb,
  Copy,
  Check,
  Sparkles,
  Loader2,
  Wand2,
  ChevronRight,
  ArrowUpRight,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import type { PromptOutput } from '@/types/prompt'
import { generatePrompt } from '@/lib/api'

type SectionKey = 'persona' | 'task' | 'context' | 'format' | 'examples'

interface Section {
  key: SectionKey
  label: string
  framework: string
  icon: LucideIcon
  color: string
  bg: string
  ring: string
}

const SECTIONS: Section[] = [
  {
    key: 'persona',
    label: 'Persona',
    framework: 'Representação · R',
    icon: User,
    color: 'text-violet-400',
    bg: 'bg-violet-500/10',
    ring: 'ring-violet-500/20',
  },
  {
    key: 'task',
    label: 'Tarefa',
    framework: 'Precisão · P',
    icon: Target,
    color: 'text-cyan-400',
    bg: 'bg-cyan-500/10',
    ring: 'ring-cyan-500/20',
  },
  {
    key: 'context',
    label: 'Contexto',
    framework: 'Contexto · C',
    icon: MapPin,
    color: 'text-pink-400',
    bg: 'bg-pink-500/10',
    ring: 'ring-pink-500/20',
  },
  {
    key: 'format',
    label: 'Formato',
    framework: 'Formato · F',
    icon: LayoutList,
    color: 'text-indigo-400',
    bg: 'bg-indigo-500/10',
    ring: 'ring-indigo-500/20',
  },
  {
    key: 'examples',
    label: 'Exemplos',
    framework: 'Iteração · I',
    icon: Lightbulb,
    color: 'text-amber-400',
    bg: 'bg-amber-500/10',
    ring: 'ring-amber-500/20',
  },
]

const QUICK_EXAMPLES = [
  'escreva sobre café especial',
  'crie uma landing page para SaaS',
  'analise métricas de vendas',
  'plano de estudos para machine learning',
]

export default function PromptGenerator() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState<PromptOutput | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [copied, setCopied] = useState<string | null>(null)
  const outputRef = useRef<HTMLDivElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault()
      const trimmed = input.trim()
      if (!trimmed || loading) return

      setLoading(true)
      setError(null)
      setOutput(null)

      try {
        const result = await generatePrompt(trimmed)
        setOutput(result)
        requestAnimationFrame(() => {
          outputRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
        })
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Ocorreu um erro inesperado.')
      } finally {
        setLoading(false)
      }
    },
    [input, loading],
  )

  const handleCopy = useCallback(async (text: string, key: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(key)
      setTimeout(() => setCopied(null), 2000)
    } catch { /* clipboard not available */ }
  }, [])

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
        void handleSubmit(e as unknown as React.FormEvent)
      }
    },
    [handleSubmit],
  )

  return (
    <div className="min-h-screen bg-base text-ink">

      {/* ── Header ── */}
      <header className="sticky top-0 z-20 border-b border-surface-border bg-base/70 backdrop-blur-xl">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-3.5">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-brand-gradient shadow-brand-sm">
              <Wand2 className="h-4 w-4 text-white" />
            </div>
            <span className="text-sm font-bold tracking-tight">AI Prompt Generator</span>
          </div>

          <div className="hidden items-center gap-1 sm:flex">
            {[
              { letter: 'P', label: 'Precisão' },
              { letter: 'C', label: 'Contexto' },
              { letter: 'R', label: 'Representação' },
              { letter: 'F', label: 'Formato' },
              { letter: 'I', label: 'Iteração' },
            ].map(({ letter, label }, i, arr) => (
              <span key={letter} className="flex items-center gap-1">
                <span
                  title={label}
                  className="cursor-default rounded-md px-1.5 py-0.5 text-[11px] font-bold text-ink-muted transition-colors hover:bg-surface-border hover:text-ink"
                >
                  {letter}
                </span>
                {i < arr.length - 1 && (
                  <span className="text-[10px] text-ink-faint">·</span>
                )}
              </span>
            ))}
          </div>
        </div>
      </header>

      {/* ── Hero ── */}
      <section className="relative overflow-hidden">
        {/* Background glow */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 -top-32 flex justify-center"
        >
          <div className="h-[500px] w-[800px] rounded-full bg-brand/5 blur-[120px]" />
        </div>

        <div className="relative mx-auto max-w-2xl px-5 pb-16 pt-20 text-center">
          {/* Eyebrow */}
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-brand/20 bg-brand-faint px-3.5 py-1.5">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-brand" />
            <span className="text-xs font-semibold tracking-wide text-brand">
              Framework P · C · R · F · I
            </span>
          </div>

          <h1 className="mb-4 text-4xl font-extrabold leading-[1.15] tracking-tight sm:text-5xl">
            Transforme ideias em{' '}
            <span className="text-gradient-brand">prompts perfeitos</span>
          </h1>

          <p className="mx-auto mb-10 max-w-lg text-base leading-relaxed text-ink-muted">
            Descreva o que precisa em linguagem natural. A IA estrutura seu prompt com{' '}
            <strong className="font-semibold text-ink">Persona, Tarefa, Contexto, Formato</strong>{' '}
            e <strong className="font-semibold text-ink">Exemplos</strong> — pronto para qualquer LLM.
          </p>

          {/* ── Input Form ── */}
          <form onSubmit={handleSubmit} className="text-left">
            <div
              className={`overflow-hidden rounded-2xl border bg-surface shadow-card transition-all duration-200 ${
                loading
                  ? 'border-brand/40 glow-pulse'
                  : 'border-surface-border hover:border-brand/20 focus-within:border-brand/40 focus-within:shadow-brand-md'
              }`}
            >
              <textarea
                ref={textareaRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Insira sua ideia original aqui... (ex: Criar um artigo sobre café especial para iniciantes)"
                rows={5}
                maxLength={1000}
                disabled={loading}
                aria-label="Descreva o que você quer gerar"
                className="w-full resize-none bg-transparent px-5 py-5 text-sm leading-relaxed text-ink placeholder-ink-muted/60 outline-none disabled:opacity-60"
              />

              <div className="flex items-center justify-between border-t border-surface-border bg-surface-deep px-5 py-3">
                <span className="text-xs text-ink-muted">
                  <span className={input.length >= 900 ? 'text-amber-400 font-medium' : ''}>
                    {input.length}
                  </span>
                  /1000 ·{' '}
                  <kbd className="rounded border border-surface-border bg-surface px-1.5 py-0.5 font-mono text-[10px] text-ink-muted">
                    Ctrl+Enter
                  </kbd>
                </span>

                <button
                  type="submit"
                  disabled={!input.trim() || loading}
                  className="flex items-center gap-2 rounded-xl btn-shimmer px-5 py-2.5 text-sm font-bold text-white shadow-brand-sm transition-transform hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-surface-deep disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:scale-100"
                >
                  {loading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Sparkles className="h-4 w-4" />
                  )}
                  {loading ? 'Gerando...' : 'Otimizar Prompt'}
                </button>
              </div>
            </div>
          </form>

          {/* Error */}
          {error && (
            <div
              role="alert"
              className="mt-4 animate-fade-in rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400"
            >
              {error}
            </div>
          )}

          {/* Quick examples */}
          {!output && !loading && (
            <div className="mt-5 flex animate-fade-in flex-wrap justify-center gap-2">
              {QUICK_EXAMPLES.map((ex) => (
                <button
                  key={ex}
                  type="button"
                  onClick={() => { setInput(ex); textareaRef.current?.focus() }}
                  className="flex items-center gap-1 rounded-full border border-surface-border bg-surface px-3 py-1.5 text-xs text-ink-muted transition-all hover:border-brand/30 hover:bg-surface-hover hover:text-ink"
                >
                  <ChevronRight className="h-3 w-3" />
                  {ex}
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── Output ── */}
      {output && (
        <section
          ref={outputRef}
          className="mx-auto max-w-2xl px-5 pb-28"
        >
          {/* Tags */}
          <div className="mb-6 flex animate-fade-in flex-wrap justify-center gap-2">
            {output.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-surface-border bg-surface px-3 py-1 text-[11px] font-medium text-ink-muted"
              >
                #{tag}
              </span>
            ))}
          </div>

          {/* Output header */}
          <div className="animate-fade-in mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-ink-muted">
                Resultado Estruturado
              </span>
            </div>
            <span className="rounded-full border border-brand/20 bg-brand-faint px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-brand">
              P-C-R-F-I
            </span>
          </div>

          {/* Section Cards — vertical stack */}
          <div className="animate-stagger mb-5 flex flex-col gap-3">
            {SECTIONS.map(({ key, label, framework, icon: Icon, color, bg, ring }) => (
              <div
                key={key}
                className="group flex flex-col gap-3 rounded-2xl border border-surface-border bg-surface p-5 shadow-card transition-all hover:border-brand/20 hover:bg-surface-hover"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    {/* Circular icon */}
                    <div className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full ${bg} ring-1 ${ring}`}>
                      <Icon className={`h-4 w-4 ${color}`} />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-ink">{label}</p>
                      <p className="text-[10px] uppercase tracking-wider text-ink-muted">{framework}</p>
                    </div>
                  </div>

                  <button
                    onClick={() => handleCopy(output[key], key)}
                    aria-label={`Copiar ${label}`}
                    className="flex-shrink-0 rounded-lg p-1.5 text-ink-muted opacity-0 transition-all group-hover:opacity-100 hover:bg-surface-border hover:text-ink"
                  >
                    {copied === key
                      ? <Check className="h-3.5 w-3.5 text-emerald-400" />
                      : <Copy className="h-3.5 w-3.5" />
                    }
                  </button>
                </div>

                <p className="pl-11 text-sm leading-relaxed text-ink-muted">{output[key]}</p>
              </div>
            ))}
          </div>

          {/* Optimized Prompt */}
          <div className="animate-fade-up rounded-2xl border border-brand/25 bg-surface p-5 shadow-brand-md">
            <div className="mb-4 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-brand/10 ring-1 ring-brand/20">
                  <Sparkles className="h-4 w-4 text-brand" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-ink">Prompt Otimizado</p>
                  <p className="text-[10px] uppercase tracking-wider text-ink-muted">Pronto para usar</p>
                </div>
              </div>

              <button
                onClick={() => handleCopy(output.optimizedPrompt, 'full')}
                aria-label="Copiar prompt completo"
                className="flex items-center gap-2 rounded-xl border border-surface-border px-4 py-2 text-xs font-semibold text-ink-muted transition-all hover:border-brand/30 hover:bg-surface-hover hover:text-ink"
              >
                {copied === 'full' ? (
                  <>
                    <Check className="h-3.5 w-3.5 text-emerald-400" />
                    <span className="text-emerald-400">Copiado!</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-3.5 w-3.5" />
                    Copiar
                  </>
                )}
              </button>
            </div>

            <div className="rounded-xl border border-surface-border bg-base px-5 py-4">
              <pre className="whitespace-pre-wrap font-mono text-[13px] leading-relaxed text-ink">
                {output.optimizedPrompt}
              </pre>
            </div>
          </div>

          {/* Reset */}
          <div className="mt-8 flex justify-center">
            <button
              onClick={() => {
                setOutput(null)
                setInput('')
                requestAnimationFrame(() => textareaRef.current?.focus())
                window.scrollTo({ top: 0, behavior: 'smooth' })
              }}
              className="flex items-center gap-1.5 rounded-full border border-surface-border px-5 py-2.5 text-sm text-ink-muted transition-all hover:border-brand/30 hover:bg-surface-hover hover:text-ink"
            >
              <ArrowUpRight className="h-3.5 w-3.5" />
              Gerar outro prompt
            </button>
          </div>
        </section>
      )}

      {/* ── Footer ── */}
      <footer className="border-t border-surface-border py-6 text-center">
        <p className="text-xs text-ink-muted">
          AI Prompt Generator · Framework{' '}
          <span className="text-brand">P-C-R-F-I</span>
        </p>
      </footer>
    </div>
  )
}
