/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      sans: ["Lato", "sans-serif"],
      heading: ["Inter", "sans-serif"],
    },
    extend: {
      transitionProperty: {
        height: 'height'
      }
    }

  },
  plugins: [],
}
