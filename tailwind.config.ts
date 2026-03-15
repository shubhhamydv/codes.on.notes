// tailwind.config.ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#080808",
        bg2: "#111111",
        bg3: "#181818",
        green: "#00ff87",
        purple: "#818cf8",
        pink: "#f472b6",
      },
      fontFamily: {
        display: ["Syne", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
        body: ["DM Sans", "sans-serif"],
        grotesk: ["var(--font-space-grotesk)", "sans-serif"]
      },
      animation: {
        "fade-in": "fadeIn 0.4s ease forwards",
        pulse: "pulse 2s infinite",
      },
      keyframes: {
        fadeIn: {
          from: { opacity: "0", transform: "translateY(16px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
