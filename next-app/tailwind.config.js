/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      spacing: {
        100: '32rem',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        hero: "url('/img/hero.JPG')",
        jadwalMisa: "url('/img/bg-JadwalMisa.JPG')",
        berita: "url('/img/bg-Berita.JPG')",
        depan: "url('/img/depan_mimbar.jpg')",
        dalam: "url('/img/gereja_dalam.jpg')",
        partor: "url('/imgpastor.jpg')",
      },
      colors: {
        primary: '#7D390F',
        secondary: '#DBA150',
        'primary-200': '#9F5C32',
        'secondary-200': '#E4C599',
      },
      backgroundColor: {
        asek: '#DBA150',
      },
      textColor: {
        custom: '#FF9843',
        custom2: '#ffffff66',
      },
      keyframes: {
        shimmer: {
          '100%': { transform: 'translateX(100%)' },
        },
      },
      fontFamily: {
        'Open Sans': ['Open Sans', 'sans-serif'],
        'open-sans': ['"Open Sans"', 'sans-serif'],
      },
      fontOpticalSizing: ['responsive'],
      fontStyle: ['responsive'],
      fontVariationSettings: ['responsive'],
      fontWeight: ['responsive'],
    },
  },
  plugins: [],
};
