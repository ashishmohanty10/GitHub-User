/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        sm: "2rem",
        lg: "4rem",
        xl: "5rem",
        "2xl": "6rem",
      },
    },
    extend: {
      fontFamily: {
        primaryFont: "Inter",
        secondarFont: "Space Mono",
      },
      colors: {
        primaryDarkColor: "#141c2f",
        boxColor: "#1f2a48",
        btnColor: "#0079fe",
        primaryTextColor: "#eff0f2",
      },
    },
  },
  plugins: [],
};
