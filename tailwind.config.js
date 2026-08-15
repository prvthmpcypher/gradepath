/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./calculator.html",
    "./about.html",
    "./docs.html",
    "./contact.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: ['class', '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        ink: 'var(--ink)',
        bg: 'var(--bg)',
        paper: 'var(--paper)',
        gpblue: 'var(--blue)',
        gpgold: 'var(--gold)',
        gpwash: 'var(--wash)',
        gpred: 'var(--red)',
        gpmuted: 'var(--muted)',
        gpline: 'var(--line)',
      },
      fontFamily: {
        serif: ['"Source Serif 4"', 'serif'],
        sans: ['"Atkinson Hyperlegible"', 'sans-serif'],
        mono: ['"Geist Mono"', 'monospace'],
      },
      lineHeight: {
        tight: '1.04',
        loose: '1.65',
      },
    },
  },
  plugins: [],
};
