import type { Config } from "tailwindcss";

// تصميم داكن: أسود + أخضر. المقياس ink مقلوب عمدًا (50 = أغمق خلفية، 900 = أفتح نص).
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#071b0e",
          100: "#0d2a16",
          200: "#bbf7d0",
          300: "#166534",
          400: "#4ade80",
          500: "#22c55e",
          600: "#16a34a",
          700: "#4ade80",
          800: "#86efac",
          900: "#bbf7d0",
        },
        ink: {
          50: "#050805",
          100: "#0d130d",
          200: "#1a251a",
          300: "#2b3a2b",
          400: "#5f7a62",
          500: "#8aa58d",
          600: "#a9c2ab",
          700: "#c6dbc8",
          800: "#e2eee3",
          900: "#f2fbf3",
        },
        panel: "#0a100a",
        code: "#020402",
        gold: { 400: "#facc15", 500: "#eab308" },
      },
      fontFamily: {
        sans: ["var(--font-cairo)", "system-ui", "sans-serif"],
        mono: ["ui-monospace", "SFMono-Regular", "Menlo", "Consolas", "monospace"],
      },
      boxShadow: {
        glow: "0 0 40px -8px rgba(34,197,94,0.45)",
      },
    },
  },
  plugins: [],
};

export default config;
