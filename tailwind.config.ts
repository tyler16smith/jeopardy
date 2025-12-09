import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],
      },
      colors: {
        jeopardy: 'hsl(217, 88.50%, 62.40%)',
        'jeopardy-light': 'hsl(217, 81.30%, 70.60%)',
        'jeopardy-dark': 'hsl(217, 57.10%, 41.20%)',
      }
    },
  },
  plugins: [],
} satisfies Config;
