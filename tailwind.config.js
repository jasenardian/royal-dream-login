/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'pop-in': {
          '0%': { opacity: '0', transform: 'scale(0.8)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'bounce-slow': {
          '0%, 100%': { transform: 'translateY(-5%) rotate(12deg)' },
          '50%': { transform: 'translateY(5%) rotate(12deg)' },
        }
      },
      animation: {
        'fade-in': 'fade-in 0.3s ease-out',
        'pop-in': 'pop-in 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
        'float': 'float 3s ease-in-out infinite',
        'bounce-slow': 'bounce-slow 2s infinite',
      },
    },
  },
  plugins: [
    require('daisyui'),
  ],
}