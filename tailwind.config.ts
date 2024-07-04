import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
	],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
    },
    extend: {
      cursor: {
        hand: 'url(/custom-cursors/hand.svg) 12 12, auto',
        grab: 'url(/custom-cursors/grab.svg) 12 12, auto',
      },
      backgroundImage: theme => ({
        'hero-background': "url(/hero-bg.png)",
        'blur-background': "url(/placeholders/landingcta.jpg)",
      }),
      fontFamily: {
        'roobert': ['Roobert PRO', 'Helvetica', 'Arial', 'sans-serif'],
        'figtree': ['Figtree', 'sans-serif']
      },
      scale: {
        '102': '1.02',
      },
      colors: {
        'custom-blue': '#2E4DE6',
        'custom-blue-dark': '#1C3CB6',
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
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "fadeOut": {
          '0%': { opacity: '1' },
          '100%': { opacity: '0' },
        },
      },
      animation: {
        "fadeOut": 'fadeOut 2s forwards',
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      screens: {
        'h-600': {'raw': '(min-height: 545px)'},
        'xs': '450px',
        "2xl": "1400px",
        '3xl': '1800px',
      },
      boxShadow: {
        'custom-1': '0px 1px 2px rgba(0, 0, 0, 0.25), 0px 1px 3px rgba(0, 0, 0, 0.09)',
        'custom-2': '0px 0px 2px rgba(0, 0, 0, 0.16), 0px 2px 3px rgba(0, 0, 0, 0.24), 0px 2px 6px rgba(0, 0, 0, 0.1), inset 0px 0px 0px 1px rgba(255, 255, 255, 0.1)',
        'custom-3': '0px 1px 2px rgba(0, 0, 0, 0.28), 0px 2px 6px rgba(0, 0, 0, 0.14), inset 0px 0px 0px 1px rgba(255, 255, 255, 0.1)',
        'custom-4': '0px 0px 3px rgba(0, 0, 0, 0.19), 0px 5px 4px rgba(0, 0, 0, 0.16), 0px 2px 16px rgba(0, 0, 0, 0.06), inset 0px 0px 0px 1px rgba(255, 255, 255, 0.1)',
      }
    },
    
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config


export default config