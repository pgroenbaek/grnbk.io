/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors");
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,ts,tsx,mdx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        gray: colors.neutral,
      },
      fontFamily: {
        sans: ["Inter Variable", "Inter", ...defaultTheme.fontFamily.sans],
      },
      aspectRatio: {
        "4/3": "4 / 3",
        "3/2": "3 / 2",
        "2/3": "2 / 3",
        "9/16": "9 / 16",
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            a: {
              color: 'rgb(59, 130, 246)', // softer blue (blue-500)
              '&:hover': {
                color: 'rgb(37, 99, 235)', // original blue (blue-600)
              },
            },
          },
        },
        dark: {
          css: {
            color: theme('colors.gray.300'),
            a: {
              color: 'rgb(96, 165, 250)', // softer for dark mode (blue-400)
              '&:hover': {
                color: 'rgb(147, 197, 253)', // blue-300
              },
            },
          },
        },
      }),
    },
  },
  plugins: [require("@tailwindcss/typography")],
};