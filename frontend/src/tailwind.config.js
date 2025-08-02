/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "primitive-colour-tealb-900": "var(--primitive-colour-tealb-900)",
        "samantic-colour-border-secondary":
          "var(--samantic-colour-border-secondary)",
        "samantic-colour-content-primary":
          "var(--samantic-colour-content-primary)",
        white: "var(--white)",
      },
      fontFamily: {
        "text-m-regular": "var(--text-m-regular-font-family)",
        geist: ["Geist", "sans-serif"],
        poppins: ["Poppins", "sans-serif"],
        actor: ["Actor", "sans-serif"],
      },
      // Extended responsive breakpoints for better mobile experience
      screens: {
        'xs': '475px',
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
        '3xl': '1920px',
      },
      // Custom spacing for consistent layout
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      // Custom container settings
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',
          sm: '2rem',
          lg: '4rem',
          xl: '5rem',
          '2xl': '6rem',
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
