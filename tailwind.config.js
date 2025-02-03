/** @type {import('tailwindcss').Config} */
export default {
  content: ["/index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        smokeWhite: "#f2f2f2",
        cream: "#f5f5dc",
      },
    },
  },
  plugins: [],
};
