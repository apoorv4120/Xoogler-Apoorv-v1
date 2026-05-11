import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      fontFamily: {
        nunito: ['var(--font-nunito)', 'sans-serif'],
        syne: ['var(--font-syne)', 'sans-serif'],
        barlow: ['var(--font-barlow)', 'sans-serif'],
        outfit: ['var(--font-outfit)', 'sans-serif'],
        serif: ['var(--font-serif)', 'serif'],
      },
      colors: {
        g: {
          blue: '#4285F4',
          'blue-dark': '#1558D6',
          red: '#EA4335',
          'red-dark': '#C5221F',
          yellow: '#FBBC05',
          'yellow-dark': '#B06000',
          green: '#34A853',
          'green-dark': '#1E8E3E',
          dark: '#202124',
          gray: '#5F6368',
          light: '#F8F9FA',
          border: '#E8EAED',
        },
      },
      animation: {
        'fade-up': 'fadeUp 0.6s ease-out both',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' },
        },
      },
    },
  },
  plugins: [],
}

export default config
