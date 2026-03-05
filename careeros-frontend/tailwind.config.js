/** @type {import('tailwindcss').Config} */
export default {

  darkMode: "class",

  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],

  theme: {
    extend: {

      colors: {
        primary: "#3b82f6",
        secondary: "#6366f1",
        success: "#22c55e",
        warning: "#f59e0b",
        danger: "#ef4444",
      },

      boxShadow: {
        card: "0 10px 25px rgba(0,0,0,0.08)",
      },

      transitionDuration: {
        400: "400ms",
      },

    },
  },

  plugins: [],

};