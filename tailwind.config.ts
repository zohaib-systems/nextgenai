import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{tsx,ts}',
    './components/**/*.{tsx,ts}',
    './pages/**/*.{tsx,ts}',
    './src/**/*.{tsx,ts}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#090A0E', // Deep Black (Primary Background)
        primaryBlue: '#165C9D', // Electric Blue (Primary Blue)
        secondary: '#072057', // Navy Blue (Secondary Navy)
        accent: '#996726', // Gold (Accent Gold)
        metallic: '#5E5855', // Metallic Gray
      },
    },
  },
  darkMode: 'class',
  plugins: [],
};

export default config;
