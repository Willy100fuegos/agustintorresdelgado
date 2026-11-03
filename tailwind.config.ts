import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
        heading: ['"Franklin Gothic Heavy"', '"Franklin Gothic"', '"Arial Black"', 'sans-serif'],
      },
    },
  },
  plugins: [],
} satisfies Config;
