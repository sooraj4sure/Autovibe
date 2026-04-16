import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        obsidian: {
          DEFAULT: "#0D0D0D",
          50: "#1a1a1a",
          100: "#141414",
          200: "#0f0f0f",
        },
        gold: {
          DEFAULT: "#C9A14A",
          light: "#D4B06A",
          dark: "#A8832E",
          pale: "#EDD99A",
          muted: "#8A6E35",
        },
        ivory: {
          DEFAULT: "#F5F0E8",
          dark: "#E8E0D0",
        },
        graphite: {
          DEFAULT: "#1E1E1E",
          light: "#2A2A2A",
          mid: "#333333",
          soft: "#444444",
        },
        ash: "#888888",
        smoke: "#CCCCCC",
      },
      fontFamily: {
        display: ["var(--font-playfair)", "Georgia", "serif"],
        body: ["var(--font-cormorant)", "Georgia", "serif"],
        sans: ["var(--font-poppins)", "system-ui", "sans-serif"],
        mono: ["var(--font-space-mono)", "monospace"],
      },
      backgroundImage: {
        "gold-gradient": "linear-gradient(135deg, #C9A14A 0%, #EDD99A 50%, #A8832E 100%)",
        "dark-gradient": "linear-gradient(180deg, #0D0D0D 0%, #1E1E1E 100%)",
        "luxury-radial": "radial-gradient(ellipse at 50% 0%, #2A2A2A 0%, #0D0D0D 70%)",
        "card-shine": "linear-gradient(135deg, rgba(201,161,74,0.08) 0%, transparent 50%, rgba(201,161,74,0.04) 100%)",
      },
      animation: {
        "fade-up": "fadeUp 0.6s ease-out forwards",
        "fade-in": "fadeIn 0.4s ease-out forwards",
        "shimmer": "shimmer 2s linear infinite",
        "float": "float 6s ease-in-out infinite",
        "glow-pulse": "glowPulse 3s ease-in-out infinite",
        "slide-in-right": "slideInRight 0.5s ease-out forwards",
        "curtain": "curtain 0.8s ease-out forwards",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% center" },
          "100%": { backgroundPosition: "200% center" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
        glowPulse: {
          "0%, 100%": { boxShadow: "0 0 20px rgba(201,161,74,0.2)" },
          "50%": { boxShadow: "0 0 40px rgba(201,161,74,0.5)" },
        },
        slideInRight: {
          "0%": { opacity: "0", transform: "translateX(30px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        curtain: {
          "0%": { clipPath: "inset(0 100% 0 0)" },
          "100%": { clipPath: "inset(0 0% 0 0)" },
        },
      },
      boxShadow: {
        "gold": "0 4px 24px rgba(201,161,74,0.25)",
        "gold-lg": "0 8px 48px rgba(201,161,74,0.35)",
        "card": "0 2px 20px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.04)",
        "card-hover": "0 8px 40px rgba(0,0,0,0.8), 0 0 0 1px rgba(201,161,74,0.2)",
        "glass": "0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.06)",
      },
      borderColor: {
        "gold-subtle": "rgba(201,161,74,0.25)",
        "gold-bright": "rgba(201,161,74,0.6)",
      },
    },
  },
  plugins: [],
};

export default config;
