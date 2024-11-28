import { type Config } from 'tailwindcss'
import plugin from 'tailwindcss/plugin'
import TailwindCSSAnimate from 'tailwindcss-animate'

export default {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        border: '#404040',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: '#171717',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: '#0a0a0a',
          light: '#262626',
          lighter: '#404040',
          darker: '#0a0a0a',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: '#9400d5',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        success: {
          DEFAULT: '#388e3c',
        },
        card: {
          DEFAULT: '#404040',
          foreground: 'hsl(var(--primary-foreground))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        'up-down': {
          '0%': { transform: 'translateY(0)' },
          '10%': { transform: 'translateY(15px)' },
          '20%': { transform: 'translateY(0)' },
          '30%': { transform: 'translateY(10px)' },
          '40%': { transform: 'translateY(20px)' },
          '50%': { transform: 'translateY(15px)' },
          '60%': { transform: 'translateY(30px)' },
          '70%': { transform: 'translateY(20px)' },
          '80%': { transform: 'translateY(15px)' },
          '90%': { transform: 'translateY(20px)' },
          '100%': { transform: 'translateY(0)' },
        },
        shine: {
          '0%': {
            'background-position': '0% 0%',
          },
          '50%': {
            'background-position': '100% 100%',
          },
          to: {
            'background-position': '0% 0%',
          },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'up-down': 'up-down 2.5s linear infinite',
        shine: 'shine var(--duration) infinite linear',
      },
    },
  },
  plugins: [
    TailwindCSSAnimate,
    plugin(({ matchUtilities, theme }) => {
      matchUtilities(
        {
          'animation-delay': value => ({
            'animation-delay': value,
          }),
        },
        {
          values: theme('transitionDelay'),
        }
      )
    }),
  ],
} satisfies Config
