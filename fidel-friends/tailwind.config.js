/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fef9e7',
          100: '#fdf3cf',
          200: '#fae79f',
          300: '#f8db6f',
          400: '#f5cf3f',
          500: '#f4c40f',
          600: '#c39d0c',
          700: '#927609',
          800: '#614f06',
          900: '#302703',
        },
        accent: {
          green: '#22c55e',
          blue: '#3b82f6',
          red: '#ef4444',
          purple: '#a855f7',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        amharic: ['var(--font-noto-sans-ethiopic)', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
      },
    },
  },
  plugins: [],
}
