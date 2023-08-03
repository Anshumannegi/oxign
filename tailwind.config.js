/** @type {import('tailwindcss').Config} */
module.exports = {
<<<<<<< HEAD
  darkMode: "false",
=======
  darkMode: false, // Disable dark mode
>>>>>>> 12823f2853abf2bb065257df3e480f9d44349528
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      keyframes: {
        wave: {
          to: { transform: "translateY(-10px)" },
        },
      },
      animation: {
        "waving-hand": "wave 0.7s linear infinite alternate",
      },
    },
  },
  plugins: [],
};
