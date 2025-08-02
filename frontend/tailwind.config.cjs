/** @type {import('tailwindcss').Config} */
// tailwind.config.cjs
// This file is where you customize Tailwind's default theme,
// define custom utility classes, and specify where Tailwind should look for classes.

module.exports = {
  // The 'content' array tells Tailwind which files to scan for utility classes.
  // This ensures only the necessary CSS is generated, keeping your bundle size small.
  content: ["./src/**/*.{html,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      // Custom colors defined using CSS variables, likely from your design system.
      colors: {
        "primitive-colour-neutral-600": "var(--primitive-colour-neutral-600)",
        "primitive-colour-tealb-900": "var(--primitive-colour-tealb-900)",
        "samantic-colour-border-secondary": "var(--samantic-colour-border-secondary)",
        "samantic-colour-content-primary": "var(--samantic-colour-content-primary)",
        "samantic-colour-content-secondary": "var(--samantic-colour-content-secondary)",
        white: "var(--white)",
        "your-brand-primary-100": "var(--your-brand-primary-100)",
        "your-brand-primary-active": "var(--your-brand-primary-active)",
      },
      // Custom font families.
      // By defining them here, you can use Tailwind classes like `font-geist` and `font-poppins`.
      fontFamily: {
        "text-m-regular": "var(--text-m-regular-font-family)",
        "text-s-regular": "var(--text-s-regular-font-family)",
        geist: ["Geist", "sans-serif"], // Maps `font-geist` to the Geist font
        poppins: ["Poppins", "sans-serif"], // Maps `font-poppins` to the Poppins font
        actor: ["Actor", "sans-serif"], // Maps `font-actor` to the Actor font
      },
      // Custom box shadows defined using CSS variables.
      boxShadow: {
        "drop-shadow-REG-NEW": "var(--drop-shadow-REG-NEW)",
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
  plugins: [], // Add any Tailwind plugins here if needed (e.g., @tailwindcss/forms)
};
