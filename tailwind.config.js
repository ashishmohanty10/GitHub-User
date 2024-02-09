/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
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
      colors: {
        primaryBG: "#141c2f",
        boxBG: "#1f2a48",
        textColor: "#fefefe",
        blueBox: "#0079fe",
        iconColor: "#4b6a9b",
      },
    },
  },
  plugins: [],
};
