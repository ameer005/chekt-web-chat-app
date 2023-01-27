/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      exo: ["Exo", "sans-serif"],
    },
    extend: {
      colors: {
        colorPrimary: "#3ba58b",
        accentColor: "#ffa338",
        colorSecondary: "#4d426d",
        colorBg: "#f5f7fb",
        colorWhite: "#ffffff",
        colorBlack: "#343535",
        colorGray: "#92939c",
      },
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
