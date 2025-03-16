/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./*.html', './app/js/**/*.js', './app/scss/**/*.scss'],
  theme: {
    extend: {
        spacing: {
            '30': '7.5rem', 
          },
    },
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
  ],
}

