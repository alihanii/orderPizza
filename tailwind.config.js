/** @type {import('tailwindcss').Config} */
//eslint-disable-next-line
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    // fontFamily: { sans: 'Roboto Mono , monospace' },
    fontFamily: { sans: 'TKT-herma, Roboto Mono', mono: 'Roboto Mono' },
    extend: {
      height: { screen: '100dvh' },
      minHeight: { screen: '100dvh' },
      screens: { ssm: '300px', s3m: '300px', mdd: '550px' },
    },
  },
  plugins: [],
};
