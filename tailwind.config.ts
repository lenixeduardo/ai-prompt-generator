import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // PromptLabz design system
        pl: {
          dark:     '#0F3D2E',
          green:    '#22C55E',
          light:    '#A7F3D0',
          bgLight:  '#E8F7EC',
          bgOff:    '#F6FBF7',
          muted:    '#64748B',
          warning:  '#F59E0B',
          danger:   '#EF4444',
          info:     '#3B82F6',
          neutral:  '#64748B',
        },
        // Legacy brand (kept for PromptGenerator)
        brand: {
          DEFAULT: '#8B5CF6',
          hover:   '#7C3AED',
          faint:   'rgba(139,92,246,0.08)',
          glow:    'rgba(139,92,246,0.25)',
        },
        surface: {
          DEFAULT: '#13131C',
          hover:   '#1A1A26',
          border:  '#252533',
          deep:    '#0E0E16',
        },
        base:  '#09090F',
        ink: {
          DEFAULT: '#F0F0FA',
          muted:   '#8080A0',
          faint:   '#363648',
        },
        accent: {
          persona:  '#8B5CF6',
          task:     '#06B6D4',
          context:  '#EC4899',
          format:   '#6366F1',
          examples: '#F59E0B',
        },
      },
      fontFamily: {
        sans:    ['var(--font-poppins)', 'system-ui', 'sans-serif'],
        poppins: ['var(--font-poppins)', 'system-ui', 'sans-serif'],
        mono:    ['JetBrains Mono', 'ui-monospace', 'monospace'],
      },
      backgroundImage: {
        'brand-gradient': 'linear-gradient(135deg, #8B5CF6 0%, #6D28D9 100%)',
        'card-gradient':  'linear-gradient(145deg, #13131C 0%, #0E0E16 100%)',
      },
      boxShadow: {
        'brand-sm': '0 0 0 1px rgba(139,92,246,0.3)',
        'brand-md': '0 0 20px rgba(139,92,246,0.15), 0 0 0 1px rgba(139,92,246,0.25)',
        card:       '0 1px 3px rgba(0,0,0,0.4), 0 4px 16px rgba(0,0,0,0.2)',
        feature:    '0 2px 12px rgba(15,61,46,0.08)',
      },
    },
  },
  plugins: [],
}

export default config
