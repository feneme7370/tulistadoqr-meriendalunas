/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    'node_modules/flowbite-vue/**/*.{js,jsx,ts,tsx,vue}',
    'node_modules/flowbite/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    extend: {
      "colors": {
        "primary": {
          '50': '#f5f8f6',
          '100': '#e0e7e3',
          '200': '#c0cfc6',
          '300': '#94ab9e',
          '400': '#738e7f',
          '500': '#597365',
          '600': '#465b50',
          '700': '#3a4b42',
          '800': '#313e38',
          '900': '#2c3530',
          '950': '#161d1a',
        },
        "secondary": {
          50: "#F4FFE5",
          100: "#EAFFCC",
          200: "#D5FF99",
          300: "#BFFF66",
          400: "#AAFF33",
          500: "#95FF00",
          600: "#77CC00",
          700: "#599900",
          800: "#3B6600",
          900: "#1E3300",
          950: "#0F1900"
        }
      }
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
}

