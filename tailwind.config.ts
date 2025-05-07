import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'media',
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-geist-screens)'],
        mono: ['var(--font-geist-mono)']
      },
      colors: {
        background: '#CDDDDD', // Light mode background
        foreground: '#171717', // Light mode foreground
        dark: {
          background: '#15021d', // Dark mode background
          foreground: '#edcdf0', // Dark mode foreground
        }
      },
      container: {
        center: true,
        padding: '1rem'
      }, 
      screens: {
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px'
      }
    }
  },
  plugins: []
}
export default config 