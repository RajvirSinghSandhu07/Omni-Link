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
        dark: {
          900: "#0b0c10", // Deepest background
          800: "#14161f", // Main dashboard background
          700: "#1c1e2b", // Sidebar/Cards background
          600: "#2a2d3e", // Borders/Hover
          500: "#3d425b", // Muted text/icons
        },
        neon: {
          blue: "#4cc9f0", // Mission Control Cyan
          green: "#00f58d", // Success/Active Green
          orange: "#ffb703", // Warning
          red: "#f72585",   // Emergency Red
          purple: "#7209b7",// Secondary Accent
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      animation: {
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "glow": "glow 2s ease-in-out infinite alternate",
        "slide-up": "slideUp 0.5s ease-out",
        "fade-in": "fadeIn 0.5s ease-out",
        "typing-dot": "typingDot 1.4s infinite ease-in-out both",
      },
      keyframes: {
        glow: {
          "0%": { boxShadow: "0 0 5px rgba(76, 201, 240, 0.2)" },
          "100%": { boxShadow: "0 0 20px rgba(76, 201, 240, 0.4)" },
        },
        slideUp: {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        typingDot: {
          "0%, 80%, 100%": { transform: "scale(0)" },
          "40%": { transform: "scale(1)" },
        }
      },
    },
  },
  plugins: [],
};

export default config;
