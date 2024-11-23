import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      sm: "640px",
      sd: "768px",
      md: "992px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1440px",
      "3xl": "1536px",
    },
    extend: {
      fontFamily: {
        geistsans: ["var(--font-geist-sans)"],
        geistmono: ["var(--font-geist-mono)"],
      },
      colors: {
        light: "var(--color-light)",
        dark: "var(--color-dark)",
        yellow: "var(--color-yellow)",
      },
    },
  },
  plugins: [],
} satisfies Config;
