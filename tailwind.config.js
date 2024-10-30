/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        accent: "#e54065",
        background: "#f4f5f9",
        borderColor: "#cfd2dc",
        text: "#636363",
        filterButton: "#e1e4ea",
        readBackground: "#f2f2f2",
      },
    },
  },
  plugins: [],
}

