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
    screens: {
      "3xl": { max: "1300px" },
      "2xl": { max: "1200px" },
      xl: { max: "1000px" },
      lg: { max: "850px" },
      md: { max: "650px" },
      sm: { max: "500px" },
      xs: { max: "340px" },
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
