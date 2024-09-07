/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        pinkLight: "#FEE2E3",
        pinkMedium: "#F5A3B7",
        purpleGray: "#B0A6BD",
        grayLight: "#D4D6DC",
        slate: "#697586",
        darkGray: "#383838",
        offWhite: "#F9F9FC",
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
    },
  },
  plugins: [],
};
