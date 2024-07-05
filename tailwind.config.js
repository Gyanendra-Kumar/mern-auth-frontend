/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        btnPrimary: "#0ea5e9",
        errorRed: "#DA1E28",
      },
    },
  },
  plugins: [],
};
