/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        amber: {
          50: '#FFF9EB',
          100: '#FFF0CC',
          200: '#FFE099',
          300: '#FFD066',
          400: '#FFC033',
          500: '#F5A623',
          600: '#D4891A',
          700: '#A36A14',
          800: '#724B0E',
          900: '#412C08',
        },
        charcoal: {
          50: '#F5F5F5',
          100: '#E8E8E8',
          200: '#D1D1D1',
          300: '#B0B0B0',
          400: '#888888',
          500: '#6B6B6B',
          600: '#4A4A4A',
          700: '#333333',
          800: '#1A1A1A',
          900: '#0A0A0A',
          950: '#050505',
        },
        silver: {
          50: '#FAFAFA',
          100: '#F0F0F0',
          200: '#E4E4E4',
          300: '#D4D4D4',
          400: '#C4C4C4',
          500: '#B8B8B8',
          600: '#9A9A9A',
          700: '#7A7A7A',
          800: '#5A5A5A',
          900: '#3A3A3A',
        },
      },
      fontFamily: {
        heading: ['"DM Sans"', 'system-ui', 'sans-serif'],
        body: ['"Inter"', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        '2xs': ['0.625rem', { lineHeight: '0.875rem' }],
        'body': ['1.125rem', { lineHeight: '1.75rem' }],
        'body-lg': ['1.25rem', { lineHeight: '1.875rem' }],
      },
      spacing: {
        18: '4.5rem',
        22: '5.5rem',
        26: '6.5rem',
        30: '7.5rem',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'fade-in-up': 'fadeInUp 0.6s ease-out forwards',
        'slide-in-left': 'slideInLeft 0.6s ease-out forwards',
        'slide-in-right': 'slideInRight 0.6s ease-out forwards',
        'counter': 'counter 2s ease-out forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-24px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(24px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
      },
    },
  },
  plugins: [],
};
