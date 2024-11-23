import type { Config } from "tailwindcss";
import { nextui } from "@nextui-org/react";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        increaseWidth: {
          '0%': { width: '0' },
          '100%': { width:'100%' },
        },
        move:{
          "0%":{left:"-30%"},
          "100%":{left:"90%"}
        }
      },
      animation: {
        'increaseWidth': 'increaseWidth 1s linear',
        "move":"move 1s linear infinite alternate"
      },
    },
  },
  plugins: [nextui()],
} satisfies Config;
