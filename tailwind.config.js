/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors:{
       blueBg: "#0F172A"
      }
    },
  },
  plugins: [
    require('tailwindcss-no-scrollbar')
        // ...
  ]
}