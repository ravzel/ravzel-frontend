/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        charcoal: {
          DEFAULT: '#0E0E0E',
          50: '#262626',
          100: '#1F1F1F',
          200: '#181818',
          300: '#141414',
          400: '#111111',
          500: '#0E0E0E',
          deep: '#080808'
        },
        cream: {
          DEFAULT: '#F8F6EE',
          muted: '#E6E4DC',
          darker: '#C5C3BA'
        },
        purple: {
          DEFAULT: '#A78BFA',
          accent: '#A78BFA',
          subtle: 'rgba(167, 139, 250, 0.12)',
          border: 'rgba(167, 139, 250, 0.35)',
          glow: 'rgba(167, 139, 250, 0.25)'
        },
        grey: {
          DEFAULT: '#D9D9D9',
          muted: '#8E8E8E',
          hairline: 'rgba(217, 217, 217, 0.12)',
          'hairline-strong': 'rgba(217, 217, 217, 0.22)',
          faint: 'rgba(217, 217, 217, 0.06)'
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', '"Space Mono"', 'monospace']
      },
      transitionTimingFunction: {
        'tactile': 'cubic-bezier(0.16, 1, 0.3, 1)',
        'editorial': 'cubic-bezier(0.25, 1, 0.5, 1)'
      },
      letterSpacing: {
        'widest-custom': '0.2em',
        'tighter-editorial': '-0.035em'
      }
    },
  },
  plugins: [],
}
