import colors from "tailwindcss/colors";
import defaultTheme from "tailwindcss/defaultTheme";
import typography from "@tailwindcss/typography";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{astro,html,js,jsx,ts,tsx,mdx,vue,svelte}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        accent: 'var(--color-accent)',
        'accent-subtle': 'var(--color-accent-subtle)',
        'primary-bg': 'var(--color-primary-bg)',
        'primary-text': 'var(--color-primary-text)',
        bg: 'var(--color-bg)',
        surface: 'var(--color-surface)',
        border: 'var(--color-border)',
        text: 'var(--color-text)',
        muted: 'var(--color-muted)',
      },
      fontFamily: {
        sans: ['Rubik', 'sans-serif'],
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
              color: 'rgb(59, 130, 246)',
              '&:hover': { color: 'rgb(37, 99, 235)' },
            },
          },
        },
        dark: {
          css: {
            color: theme('colors.gray.300'),
            a: {
              color: 'rgb(96, 165, 250)',
              '&:hover': { color: 'rgb(147, 197, 253)' },
            },
          },
        },
      }),
    },
  },
  plugins: [typography],
};
