/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
    "./app/**/*.{js,jsx}",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      fontFamily: {
        sans: ["var(--font-inter)"],
        mono: ["var(--font-notoSerif)"],
        serif: ["Noto Serif"],
        openSans: ["Open Sans", "sans-serif"],
      },
      backgroundColor: {
        "gray-100": "#F6F7FC",
        "gray-200": "#F1F2F6",
        "gray-300": "#E4E6ED",
        "gray-400": "#D6D9E4",
        "gray-500": "#C8CCDB",
        "gray-600": "#9AA1B9",
        "gray-700": "#646D89",
        "gray-800": "#424C6B",
        "gray-900": "#2A2E3F",
        "green-100": "#F1F5F3",
        "green-200": "#E6EBE9",
        "green-300": "#D5DFDA",
        "green-400": "#ABC0B4",
        "green-500": "#81A08F",
        "green-600": "#5D7B6A",
        "green-700": "#465C50",
        "green-800": "#2F3E35",
        "green-900": "#171F1B",
        "orange-100": "#FAEDE8",
        "orange-200": "#F9DACE",
        "orange-300": "#F3B59C",
        "orange-400": "#ED906B",
        "orange-500": "#E76B39",
        "orange-600": "#C14817",
        "orange-700": "#803010",
        "orange-800": "#631F04",
        "orange-900": "#401808",
        "utility-bg": "#F7F7FB",
        "utility-black": "#000000",
        "utility-red": "#B61515",
        "utility-white": "#FFFFFF",
        "vacant-bg": "#F0F2F8",
        "vacant-text": "#006753",
        "occupied-bg": "#E4ECFF",
        "occupied-text": "#084BAF",
        "assign-clean-bg": "#E5FFFA",
        "assign-clean-text": "#006753",
        "assign-dirty-bg": "#FFE5E5",
        "assign-dirty-text": "#A50606",
        "vacant-clean-inspected-bg": "#FFF9E5",
        "vacant-clean-inspected-text": "#766A00",
        "out-of-order-bg": "#F0F1F8",
        "out-of-order-text": "#6E7288",
      },
      textColor: {
        "gray-100": "#F6F7FC",
        "gray-200": "#F1F2F6",
        "gray-300": "#E4E6ED",
        "gray-400": "#D6D9E4",
        "gray-500": "#C8CCDB",
        "gray-600": "#9AA1B9",
        "gray-700": "#646D89",
        "gray-800": "#424C6B",
        "gray-900": "#2A2E3F",
        "green-100": "#F1F5F3",
        "green-200": "#E6EBE9",
        "green-300": "#D5DFDA",
        "green-400": "#ABC0B4",
        "green-500": "#81A08F",
        "green-600": "#5D7B6A",
        "green-700": "#465C50",
        "green-800": "#2F3E35",
        "green-900": "#171F1B",
        "orange-100": "#FAEDE8",
        "orange-200": "#F9DACE",
        "orange-300": "#F3B59C",
        "orange-400": "#ED906B",
        "orange-500": "#E76B39",
        "orange-600": "#C14817",
        "orange-700": "#803010",
        "orange-800": "#631F04",
        "orange-900": "#401808",
        "utility-black": "#000000",
        "utility-red": "#B61515",
        "utility-white": "#FFFFFF",
        "vacant-text": "#006753",
        "occupied-text": "#084BAF",
        "assign-clean-text": "#006753",
        "assign-dirty-text": "#A50606",
        "vacant-clean-inspected-text": "#766A00",
        "out-of-order-text": "#6E7288",
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      scrollbarStyles: {
        width: "4px",
        track: {
          boxShadow: "inset 0 0 5px grey",
          borderRadius: "10px",
        },
        thumb: {
          background: "#e4e6ed",
          borderRadius: "10px",
        },
        hover: {
          thumb: {
            background: "#b30000",
          },
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
