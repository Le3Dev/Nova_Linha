/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Azul-petróleo extraído das faces do símbolo da logo Nova Linha
        brand: {
          50:  '#f1f5f6',
          100: '#dfe8eb',
          200: '#c0d2d8',
          300: '#92afb9',
          400: '#648792',
          500: '#4a6670',   // face clara do símbolo
          600: '#2f5262',
          700: '#1b3e4c',   // face média do símbolo
          800: '#12303c',
          900: '#0b2029',
          950: '#04131b',   // sombra do símbolo
        },
        // Acento areia/champanhe — usado com moderação para valorizar
        sand: {
          100: '#f4ece0',
          200: '#e8d9c1',
          300: '#dcc4a0',
          400: '#cdab7e',
          500: '#b8935f',
          600: '#97764a',
        },
        paper: '#f6f4ef',
        // Superfícies do modo escuro (petróleo quase neutro)
        dark: {
          900: '#081419',
          800: '#0f1e25',
          700: '#182b33',
        },
      },
      fontFamily: {
        sans:    ['Montserrat', 'system-ui', 'sans-serif'],
        display: ['Montserrat', 'system-ui', 'sans-serif'],
        serif:   ['"Cormorant Garamond"', 'Georgia', 'serif'],
      },
      keyframes: {
        marquee: {
          from: { transform: 'translateX(0)' },
          to:   { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        marquee: 'marquee 40s linear infinite',
      },
    },
  },
  plugins: [],
}
