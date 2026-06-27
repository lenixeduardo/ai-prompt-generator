'use client'

import Image from 'next/image'

/* ── Icon primitives ── */

function Sparkle({ size = 16, className = '' }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M10 0 L11.8 8.2 L20 10 L11.8 11.8 L10 20 L8.2 11.8 L0 10 L8.2 8.2 Z" />
    </svg>
  )
}

function HamburgerIcon() {
  return (
    <svg width="20" height="16" viewBox="0 0 20 16" fill="none" aria-hidden="true">
      <rect y="0"  width="20" height="2.2" rx="1.1" fill="#0F3D2E" />
      <rect y="7"  width="20" height="2.2" rx="1.1" fill="#0F3D2E" />
      <rect y="14" width="20" height="2.2" rx="1.1" fill="#0F3D2E" />
    </svg>
  )
}

function BookOpen() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#0F3D2E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
    </svg>
  )
}

function ShieldCheck() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#0F3D2E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <polyline points="9 12 11 14 15 10" />
    </svg>
  )
}

function LightningBolt({ size = 18, color = '#22C55E' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color} aria-hidden="true">
      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
    </svg>
  )
}

function HeartIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="#22C55E" aria-hidden="true">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  )
}

function StarFilled() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="#F59E0B" aria-hidden="true">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  )
}

function ArrowRight() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  )
}

/* ── Feature Card ── */

interface FeatureCardProps {
  illustration: React.ReactNode
  title: string
  description: string
}

function FeatureCard({ illustration, title, description }: FeatureCardProps) {
  return (
    <div className="bg-white rounded-2xl p-3 flex flex-col items-center text-center shadow-feature border border-[#E8F7EC]">
      <div className="mb-2 mt-1">{illustration}</div>
      <h3 className="text-[#0F3D2E] font-bold text-[13px] leading-tight mb-1">{title}</h3>
      <p className="text-[#64748B] text-[11px] leading-[1.45]">{description}</p>
    </div>
  )
}

/* ── Cat-laptop illustration uses real asset ── */
function CatLaptopIllustration() {
  return (
    <div className="relative w-[68px] h-[60px]">
      <Image
        src="/cat-laptop.png"
        alt="Gato com laptop"
        fill
        className="object-contain"
      />
    </div>
  )
}

/* ── Trophy SVG ── */
function TrophyIllustration() {
  return (
    <svg width="52" height="60" viewBox="0 0 52 60" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      {/* Base */}
      <rect x="14" y="52" width="24" height="5" rx="2.5" fill="#B45309" />
      <rect x="18" y="47" width="16" height="7" rx="1" fill="#D97706" />
      {/* Cup body */}
      <path d="M10 6 L10 28 Q10 42 26 42 Q42 42 42 28 L42 6 Z" fill="#F59E0B" />
      {/* Cup shine */}
      <path d="M14 8 L14 26 Q14 36 22 38" stroke="#FCD34D" strokeWidth="2.5" strokeLinecap="round" />
      {/* Handles */}
      <path d="M10 12 Q2 12 2 20 Q2 28 10 28" stroke="#D97706" strokeWidth="3" fill="none" strokeLinecap="round" />
      <path d="M42 12 Q50 12 50 20 Q50 28 42 28" stroke="#D97706" strokeWidth="3" fill="none" strokeLinecap="round" />
      {/* Stars */}
      <path d="M26 14 L27.5 18.5 L32 18.5 L28.5 21.5 L30 26 L26 23 L22 26 L23.5 21.5 L20 18.5 L24.5 18.5 Z" fill="#FDE68A" />
    </svg>
  )
}

/* ── Flame SVG ── */
function FlameIllustration() {
  return (
    <svg width="48" height="60" viewBox="0 0 48 60" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      {/* Outer flame */}
      <path d="M24 4 C24 4 36 16 36 30 C36 42.15 31 52 24 56 C17 52 12 42.15 12 30 C12 16 24 4 24 4 Z" fill="#EF4444" />
      {/* Mid flame */}
      <path d="M24 14 C24 14 32 24 32 33 C32 40.7 28.4 47 24 50 C19.6 47 16 40.7 16 33 C16 24 24 14 24 14 Z" fill="#F97316" />
      {/* Inner flame */}
      <path d="M24 24 C24 24 29 31 29 37 C29 41.97 26.76 46 24 48 C21.24 46 19 41.97 19 37 C19 31 24 24 24 24 Z" fill="#FCD34D" />
      {/* Glow dot */}
      <circle cx="24" cy="40" r="4" fill="#FEF08A" opacity="0.7" />
    </svg>
  )
}

/* ── Green hills SVG background ── */
function HillsBackground() {
  return (
    <svg
      viewBox="0 0 375 130"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full block"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      {/* Sky fill */}
      <rect width="375" height="130" fill="#E8F7EC" />

      {/* Far back hill – lightest */}
      <ellipse cx="280" cy="155" rx="220" ry="120" fill="#C8EED8" />

      {/* Left background hill */}
      <ellipse cx="60" cy="145" rx="140" ry="100" fill="#BBE8CB" />

      {/* Central main hill – where cat stands */}
      <ellipse cx="230" cy="180" rx="240" ry="155" fill="#86EFAC" />

      {/* Left foreground mound */}
      <ellipse cx="20" cy="140" rx="90" ry="70" fill="#A7F3D0" />

      {/* Right foreground mound */}
      <ellipse cx="355" cy="145" rx="80" ry="65" fill="#A7F3D0" />

      {/* Ground strip */}
      <rect x="0" y="105" width="375" height="25" fill="#86EFAC" />

      {/* Small bush left */}
      <ellipse cx="15" cy="107" rx="18" ry="12" fill="#4ADE80" />
      <ellipse cx="32" cy="109" rx="14" ry="10" fill="#4ADE80" />

      {/* Small bush right */}
      <ellipse cx="345" cy="106" rx="16" ry="11" fill="#4ADE80" />
      <ellipse cx="362" cy="108" rx="13" ry="9" fill="#4ADE80" />

      {/* Tiny bush center-left */}
      <ellipse cx="130" cy="112" rx="10" ry="7" fill="#4ADE80" />

      {/* Tiny bush center-right */}
      <ellipse cx="290" cy="110" rx="9" ry="6" fill="#4ADE80" />

      {/* Grass details / strokes on hills */}
      <line x1="85"  y1="110" x2="85"  y2="103" stroke="#4ADE80" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="105" y1="108" x2="105" y2="101" stroke="#4ADE80" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="180" y1="112" x2="180" y2="104" stroke="#4ADE80" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="250" y1="110" x2="250" y2="103" stroke="#4ADE80" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

/* ── Cloud decorations ── */
function CloudShape({ className = '' }: { className?: string }) {
  return (
    <svg width="80" height="40" viewBox="0 0 80 40" fill="white" className={className} aria-hidden="true">
      <ellipse cx="40" cy="28" rx="36" ry="14" />
      <ellipse cx="28" cy="22" rx="20" ry="16" />
      <ellipse cx="52" cy="20" rx="22" ry="18" />
      <ellipse cx="40" cy="16" rx="18" ry="14" />
    </svg>
  )
}

/* ── Avatar placeholder ── */
function AvatarCircle({ gradient, initials }: { gradient: string; initials: string }) {
  return (
    <div
      className="w-9 h-9 rounded-full border-[2.5px] border-white flex items-center justify-center text-white font-bold text-[10px] flex-shrink-0"
      style={{ background: gradient }}
    >
      {initials}
    </div>
  )
}

/* ══════════════════════════════════════════════
   Main HeroPage Component
══════════════════════════════════════════════ */

export default function HeroPage() {
  return (
    <div className="min-h-screen bg-[#F6FBF7] font-poppins">
      <div className="max-w-[430px] mx-auto overflow-hidden relative">

        {/* ── Navigation Header ── */}
        <header className="bg-white flex items-center justify-between px-4 py-3 sticky top-0 z-30 shadow-[0_1px_0_#E8F7EC]">
          <div className="flex items-center gap-2">
            <div className="relative w-9 h-9 rounded-xl overflow-hidden flex-shrink-0">
              <Image
                src="/mascot.png"
                alt="PromptLabz"
                fill
                className="object-cover object-top scale-[1.35] translate-y-1"
                priority
              />
            </div>
            <span className="text-[22px] font-extrabold tracking-tight leading-none">
              <span className="text-[#0F3D2E]">Prompt</span>
              <span className="text-[#22C55E]">Labz</span>
            </span>
          </div>

          <button
            className="bg-[#F0F4F1] rounded-xl p-[10px] hover:bg-[#E2EDEA] transition-colors"
            aria-label="Menu"
          >
            <HamburgerIcon />
          </button>
        </header>

        {/* ── Hero Section ── */}
        <section className="bg-[#E8F7EC] relative overflow-hidden">

          {/* Cloud decorations */}
          <CloudShape className="absolute top-4 right-[36%] opacity-60 scale-75" />
          <CloudShape className="absolute top-0 right-4 opacity-40 scale-50" />

          {/* Sparkle top-right */}
          <div className="absolute top-5 right-5 text-[#22C55E]">
            <Sparkle size={22} />
          </div>

          {/* Hero body */}
          <div className="px-5 pt-7 pb-2 relative z-10">

            {/* Cat — absolutely positioned top-right */}
            <div className="absolute right-0 top-0 w-[48%] z-10" style={{ height: '330px' }}>
              <div className="relative w-full h-full">
                {/* Sparkle beside cat */}
                <div className="absolute left-2 top-12 text-[#22C55E] z-20">
                  <Sparkle size={10} />
                </div>
                <Image
                  src="/mascot.png"
                  alt="Mascote PromptLabz — gato estudioso com capelo"
                  fill
                  className="object-contain object-bottom drop-shadow-lg"
                  priority
                />
              </div>
            </div>

            {/* Heading — left 66% (cat at z-10 overlaps the right edge) */}
            <div className="w-[66%]">
              <h1 className="text-[38px] font-extrabold leading-[1.08] tracking-tight text-[#0F3D2E]">
                Aprenda<br />
                Engenharia<br />
                de Prompts
              </h1>

              <div className="mt-1">
                <p className="text-[36px] font-extrabold leading-[1.12] tracking-tight text-[#22C55E]">
                  do zero ao
                </p>
                <div className="flex items-center gap-1">
                  <p className="text-[36px] font-extrabold leading-[1.12] tracking-tight text-[#22C55E]">
                    avançado
                  </p>
                  <span className="text-[22px] leading-none">⚡</span>
                  <span className="text-[22px] leading-none">⚡</span>
                </div>
              </div>
            </div>

            {/* Spacer so content clears the cat image */}
            <div style={{ height: '32px' }} />

            {/* Description */}
            <p className="text-[#0F3D2E] text-[14.5px] leading-[1.6] mt-0 mb-5 max-w-[230px]">
              Domine ChatGPT, Claude e IA generativa com lições gamificadas.
              Do zero ao avançado, sem precisar saber programar.
            </p>

            {/* CTA Button */}
            <button className="w-full bg-[#0F3D2E] text-white font-bold text-[13.5px] uppercase tracking-[0.12em] py-[15px] rounded-full flex items-center justify-center gap-2.5 shadow-[0_4px_20px_rgba(15,61,46,0.35)] hover:bg-[#1a5c44] active:scale-[0.98] transition-all mb-5">
              COMEÇAR AGORA
              <span className="text-lg font-bold">→</span>
            </button>

            {/* Stats row */}
            <div className="flex items-center gap-3 mb-6">
              {/* 68+ lições */}
              <div className="flex items-center gap-1.5">
                <BookOpen />
                <div className="leading-none">
                  <div className="text-[12px] font-bold text-[#0F3D2E]">68+</div>
                  <div className="text-[11px] text-[#0F3D2E]">lições</div>
                </div>
              </div>

              <span className="text-[#22C55E] text-[10px] font-black">●</span>

              {/* Gamificado */}
              <div className="flex items-center gap-1">
                <span className="text-[14px] leading-none">⚡</span>
                <span className="text-[12px] font-semibold text-[#0F3D2E]">Gamificado</span>
              </div>

              <span className="text-[#22C55E] text-[10px] font-black">●</span>

              {/* 100% grátis */}
              <div className="flex items-center gap-1.5">
                <ShieldCheck />
                <div className="leading-none">
                  <div className="text-[12px] font-bold text-[#0F3D2E]">100%</div>
                  <div className="text-[11px] text-[#0F3D2E]">grátis</div>
                </div>
              </div>
            </div>
          </div>

          {/* Hills landscape */}
          <div className="relative -mb-1 z-0">
            <HillsBackground />
          </div>
        </section>

        {/* ── Features Section ── */}
        <section className="bg-white px-4 pt-8 pb-8">
          {/* Section heading */}
          <div className="text-center mb-6">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Sparkle size={13} className="text-[#22C55E]" />
              <h2 className="text-[15.5px] font-bold text-[#0F3D2E] leading-tight">
                Aprenda brincando. Evolua de verdade.
              </h2>
              <Sparkle size={13} className="text-[#22C55E]" />
            </div>
            <p className="text-[13px] text-[#64748B] leading-[1.55]">
              Lições curtas, desafios e recompensas para você<br />
              aprender mais e melhor todos os dias.
            </p>
          </div>

          {/* Feature cards */}
          <div className="grid grid-cols-3 gap-2.5">
            <FeatureCard
              illustration={<CatLaptopIllustration />}
              title="Lições práticas"
              description="Conteúdo direto ao ponto com exemplos reais."
            />
            <FeatureCard
              illustration={<TrophyIllustration />}
              title="Gamificado"
              description="Ganhe XP, conquistas e suba de nível."
            />
            <FeatureCard
              illustration={<FlameIllustration />}
              title="Progresso real"
              description="Acompanhe seu progresso e veja sua evolução."
            />
          </div>
        </section>

        {/* ── Social Proof Section ── */}
        <section className="bg-[#E8F7EC] px-4 py-5">
          <div className="flex items-center gap-3">

            {/* Heart + text */}
            <div className="flex items-start gap-2 flex-1 min-w-0">
              <div className="flex-shrink-0 mt-0.5">
                <HeartIcon />
              </div>
              <p className="text-[11.5px] text-[#0F3D2E] leading-[1.5]">
                Junte-se a milhares de alunos que já estão evoluindo com o{' '}
                <span className="text-[#22C55E] font-semibold">PromptLabz</span>
              </p>
            </div>

            {/* Avatar group */}
            <div className="flex -space-x-2.5 flex-shrink-0">
              <AvatarCircle gradient="linear-gradient(135deg,#5BA4A4,#2E7D8E)" initials="" />
              <AvatarCircle gradient="linear-gradient(135deg,#C8906A,#8B4E2F)" initials="" />
              <AvatarCircle gradient="linear-gradient(135deg,#5B89B8,#2E5A8E)" initials="" />
              <div className="w-9 h-9 rounded-full border-[2.5px] border-white bg-[#22C55E] flex items-center justify-center text-white font-bold flex-shrink-0" style={{ fontSize: '9px' }}>
                +5k
              </div>
            </div>

            {/* Rating */}
            <div className="flex-shrink-0 text-right">
              <div className="flex items-center gap-0.5 justify-end">
                <StarFilled /><StarFilled /><StarFilled /><StarFilled /><StarFilled />
              </div>
              <div className="text-[#0F3D2E] font-bold text-[13.5px] mt-0.5">4.9/5</div>
              <div className="text-[#64748B] text-[10.5px]">de alunos</div>
            </div>

          </div>
        </section>

      </div>
    </div>
  )
}
