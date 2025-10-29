import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: "#6D28D9", // rich purple
          accent: "#B45309", // gold accent
        },
      },
    },
  },
  plugins: [],
};
export default config;
