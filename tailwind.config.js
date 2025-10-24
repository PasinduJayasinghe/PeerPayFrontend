export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Montserrat', 'system-ui', 'sans-serif'],
        'mono': ['Google Sans Code', 'monospace'],
        'condensed': ['Roboto Condensed', 'sans-serif'],
      },
    },
  },
  plugins: [],
}