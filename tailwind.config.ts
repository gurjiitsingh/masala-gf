import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        athens: {
          blue: '#305680',
          gold: '#d4af37',
          white: '#ffffff',
          beige: '#fdf6e3',
          dark: '#1f2d3d',
        },
      },
    },
  },
  plugins: [],
}

export default config
