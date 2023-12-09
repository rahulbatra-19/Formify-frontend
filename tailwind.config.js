/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        body: "#eaf2fd",
        header: "#06367a",
        blue_light: "#c3eeff",
      },
    },
  },
  plugins: [],
};
