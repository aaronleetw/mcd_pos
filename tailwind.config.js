/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  safelist: [
    "text-lime-400"
  ],
  theme: {
    extend: {
      backgroundImage: {
        "metal": "url('http://cdn.backgroundhost.com/backgrounds/subtlepatterns/brushed_alu_dark.png')",
      }
    },
  },
  plugins: [],
}

