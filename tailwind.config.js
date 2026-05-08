/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          bg: 'var(--color-bg)',
          surface: 'var(--color-surface)',
          surface2: 'var(--color-surface2)',
          green: 'var(--color-primary)',
          bright: 'var(--color-primary-bright)',
          muted: 'var(--color-primary-muted)',
          gold: 'var(--color-accent)',
          text: 'var(--color-text-primary)',
          textMuted: 'var(--color-text-secondary)',
          border: 'var(--color-border)',
        },
      },
      fontFamily: {
        heading: ['Space Grotesk', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'wipe-in': 'wipeIn 0.6s ease-out forwards',
        'gold-sweep': 'goldSweep 0.6s ease-in-out forwards',
        'blink': 'blink 1s step-end infinite',
        'slide-right': 'slideRight 0.3s ease-out',
      },
      keyframes: {
        wipeIn: {
          '0%': { clipPath: 'inset(0 100% 0 0)' },
          '100%': { clipPath: 'inset(0 0% 0 0)' },
        },
        goldSweep: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' },
        },
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
        slideRight: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(4px)' },
        },
      },
    },
  },
  plugins: [],
}
