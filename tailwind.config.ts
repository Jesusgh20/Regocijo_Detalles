import type { Config } from 'tailwindcss'

export default {
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './app.vue',
    './error.vue',
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        body: ['Jost', 'sans-serif'],
      },
      colors: {
        // Paleta floral suave
        petal: {
          50:  '#fff5f7',
          100: '#ffe8ee',
          200: '#ffc5d5',
          300: '#ffa0ba',
          400: '#ff7a9f',
          500: '#f25480',
          600: '#d43868',
          700: '#a8264f',
          800: '#7d1a39',
          900: '#520f25',
        },
        sage: {
          50:  '#f4f7f0',
          100: '#e6eedd',
          200: '#cddcbc',
          300: '#b1c898',
          400: '#93b272',
          500: '#759a52',
          600: '#5c7d3f',
          700: '#44602e',
          800: '#2e431f',
          900: '#1a2711',
        },
        cream: {
          50:  '#fdfaf4',
          100: '#faf4e5',
          200: '#f5e8c8',
          300: '#eed9a2',
          400: '#e5c876',
          500: '#d9b24e',
          600: '#b8903a',
          700: '#8e6d2a',
          800: '#654d1d',
          900: '#3d2e10',
        },
        blush: '#fdf0f3',
        ivory: '#faf8f3',
      },
      backgroundImage: {
        'petal-gradient': 'linear-gradient(135deg, #fff5f7 0%, #fdf0f3 50%, #f4f7f0 100%)',
        'hero-gradient': 'linear-gradient(160deg, #ffe8ee 0%, #faf8f3 40%, #e6eedd 100%)',
      },
      boxShadow: {
        'floral': '0 4px 30px rgba(242, 84, 128, 0.08)',
        'floral-lg': '0 12px 50px rgba(242, 84, 128, 0.12)',
        'card': '0 2px 20px rgba(0, 0, 0, 0.06)',
      },
      borderRadius: {
        'organic': '60% 40% 55% 45% / 45% 55% 45% 55%',
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
      },
    },
  },
  plugins: [],
} satisfies Config
