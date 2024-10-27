/** @type {import('tailwindcss').Config} */
export default {
  content: ['./.vitepress/**/*.{vue,js}', './examples/**/*.{vue,js}'],
  theme: {
    extend: {
      boxShadow: {
        concave:
          'inset 0 1px 0 0 rgb(0 0 0 / 0.07), inset 0 -1px 0 0 rgb(255 255 255 / 0.8)',
      },
      fontFamily: {
        sans: ['"Nunito Variable"'],
        display: ['"Jura Variable"'],
      },
    },
  },
  plugins: [],
};
