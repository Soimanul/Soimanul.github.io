import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#0a0a0f',
        'bg-secondary': '#111118',
        'bg-card': '#13131c',
        surface: '#1a1a26',
        text: '#f0ede8',
        'text-muted': '#8a8790',
        accent: '#7aab7a',
        'accent-dark': '#4a7a4a',
        'accent-light': '#a8cba8',
        border: '#1e1e2e',
      },
      fontFamily: {
        display: ['Fraunces', 'Georgia', 'serif'],
        heading: ['Syne', 'sans-serif'],
        body: ['Instrument Sans', 'sans-serif'],
      },
      screens: {
        xs: '480px',
      },
    },
  },
  plugins: [],
} satisfies Config
