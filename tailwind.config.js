/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
 
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {},
    container: {
      center: true,
      padding: '1rem',
      screens: {
        xl: '1440px',
      },
    },
    colors: {
      'primary': '#F05A2C',
      'secondary': '#6c757d',
      'success': '#28a745',
      'info': '#17a2b8',
      'warning': '#ffc107',
      'danger': '#dc3545',
      'light': '#f8f9fa',
      'dark': '#343a40'
    }
  },
  plugins: [],
}

