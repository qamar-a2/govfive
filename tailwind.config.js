/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.html"],
  theme: {
    extend: {
      colors: {
      
        'gov-primary': 'var(--color-primary)',
        'gov-light': 'var(--color-light)',
        'gov-bage': 'var(--color-bage)',
        'gov-bage2': 'var(--color-bage2)',
        'gov-border': 'var(--color-border)',
      },
    },
  },
  plugins: [],
}