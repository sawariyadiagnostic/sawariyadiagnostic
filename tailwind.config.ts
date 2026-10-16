import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: 'calc(var(--spacing) * 4)', // 1rem with 14px base = 14px padding
      screens: {
        sm: '40rem',
        md: '48rem', 
        lg: '64rem',
        xl: '80rem',
        '2xl': '96rem',
      },
    },
    extend: {
      fontFamily: {
        bagel: ['Bagel Fat One', 'cursive'],
      },
      colors: {
        border: "var(--border)",
        input: "var(--input)",
        ring: "var(--ring)",
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: {
          DEFAULT: "var(--primary)",
          foreground: "var(--primary-foreground)",
        },
        secondary: {
          DEFAULT: "var(--secondary)",
          foreground: "var(--secondary-foreground)",
        },
        destructive: {
          DEFAULT: "var(--destructive)",
          foreground: "var(--destructive-foreground)",
        },
        muted: {
          DEFAULT: "var(--muted)",
          foreground: "var(--muted-foreground)",
        },
        accent: {
          DEFAULT: "var(--accent)",
          foreground: "var(--accent-foreground)",
          blue: "hsl(var(--accent-blue))",
          emerald: "hsl(var(--accent-emerald))",
          purple: "hsl(var(--accent-purple))",
          teal: "hsl(var(--accent-teal))",
          orange: "hsl(var(--accent-orange))",
        },
        popover: {
          DEFAULT: "var(--popover)",
          foreground: "var(--popover-foreground)",
        },
        card: {
          DEFAULT: "var(--card)",
          foreground: "var(--card-foreground)",
        },
        peacock: {
          canvas: '#F3F8F8',
          pupil: '#0A1128',
          sapphire: '#112240',
          indigo: '#1A365D',
          teal: '#0B6E66',
          'teal-deep': '#074F49',
          cyan: '#0A6C82',
          'cyan-deep': '#085061',
          emerald: '#04724D',
          'emerald-deep': '#035439',
          gold: '#FFC300',
          amber: '#FCA311',
          'gold-ink': '#7C4406',
          crimson: '#C81E1E',
        },
      },
      boxShadow: {
        'peacock-card': '0 2px 6px -1px rgba(10, 17, 40, 0.05), 0 1px 2px -1px rgba(10, 108, 130, 0.04)',
        'peacock-hover': '0 12px 24px -6px rgba(10, 108, 130, 0.14), 0 4px 10px -2px rgba(10, 17, 40, 0.06)',
        'peacock-ocellus': '0 10px 30px -5px rgba(10, 17, 40, 0.45), 0 0 20px 0 rgba(10, 108, 130, 0.28)',
        'peacock-gold': '0 4px 16px -2px rgba(255, 195, 0, 0.40)',
      },
      borderRadius: {
        lg: "var(--radius-card)",
        md: "var(--radius-control)",
        sm: "0.625rem",
        xl: "var(--radius-panel)",
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [tailwindcssAnimate],
} satisfies Config;
