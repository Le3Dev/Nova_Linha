/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Paleta extraída da logo Nova Linha (azul marinho + aço)
        brand: {
          50:  '#f0f5fb',
          100: '#dce8f5',
          200: '#b4d0eb',
          300: '#7aaada',
          400: '#4281c4',
          500: '#1a5faa',   // tom médio — botões, destaques
          600: '#144a87',
          700: '#0f3765',
          800: '#0a2547',
          900: '#06162c',
          950: '#030c18',
        },
        // Azul marinho escuro da logo (corpo do edifício)
        dark: {
          900: '#0c1a27',
          800: '#112232',
          700: '#1a3145',
        },
      },
      fontFamily: {
        sans:    ['Montserrat', 'system-ui', 'sans-serif'],
        display: ['Montserrat', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
