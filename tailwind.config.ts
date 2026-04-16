import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./data/**/*.{ts,tsx}",
    "./hooks/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          cream: "#FFF8E7",
          gold: "#F6C453",
          sky: "#9DDCFB",
          green: "#80D39B",
          red: "#FF8F8F",
          ink: "#2B2D42",
          amharic: "#5B4B8A"
        }
      },
      borderRadius: {
        "4xl": "2rem"
      },
      boxShadow: {
        float: "0 20px 45px rgba(43, 45, 66, 0.14)"
      },
      fontFamily: {
        display: ["Arial Rounded MT Bold", "Trebuchet MS", "sans-serif"],
        body: ["Inter", "Noto Sans Ethiopic", "Nyala", "sans-serif"]
      }
    }
  },
  plugins: []
};

export default config;
