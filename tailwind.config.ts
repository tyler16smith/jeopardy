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
        jeopardy: 'hsl(280,100%,70%)',
        'jeopardy-light': 'hsl(280,100%,80%)',
        'jeopardy-dark': 'hsl(280,100%,60%)',
      }
    },
  },
  plugins: [],
} satisfies Config;
