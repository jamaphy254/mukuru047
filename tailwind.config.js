/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    screens: {
      sm: "480px",
      md: "547px",
      lg: "680px",
      xl: "768px",
      "2xl": "1024px",
      "3xl": "1680px",
    },
    extend: {
      // backgroundImage: {
      //   img: "url('/public/back.png')",
      // },
      colors: {
        primary: "teal",
        secondary: "#f7f2d9",
        green: "#0BCE83",
        dark: "#1D1D1D",
        danger: "#C30E0E",
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
    },
  },
  plugins: [],
};
