import {nextui} from '@nextui-org/theme'

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      maxWidth: {
        portal: 'var(--content)',
      },
      borderRadius: {
        portal: 'var(--radius-card)',
        surface: 'var(--radius-surface)',
      },
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        card: 'var(--card)',
        'card-foreground': 'var(--card-foreground)',
        popover: 'var(--popover)',
        'popover-foreground': 'var(--popover-foreground)',
        primary: 'var(--primary)',
        'primary-foreground': 'var(--primary-foreground)',
        secondary: 'var(--secondary)',
        'secondary-foreground': 'var(--secondary-foreground)',
        muted: 'var(--muted)',
        'muted-foreground': 'var(--muted-foreground)',
        accent: 'var(--accent)',
        'accent-foreground': 'var(--accent-foreground)',
        destructive: 'var(--destructive)',
        'destructive-foreground': 'var(--destructive-foreground)',
        border: 'var(--border)',
        input: 'var(--input)',
        ring: 'var(--ring)',
        canvas: 'var(--canvas)',
        subtle: 'var(--subtle)',
        edge: 'var(--edge)',
        success: 'var(--success)',
        warning: 'var(--warning)',
        info: 'var(--info)',
        'success-tint': 'var(--success-tint)',
        'warning-tint': 'var(--warning-tint)',
        'accent-tint': 'var(--accent-tint)',
      },
      fontFamily: {
        sans: ["var(--font-sans)"],
        mono: ["var(--font-mono)"],
      },
    },
  },
  darkMode: "class",
  plugins: [
    nextui({
      themes: {
        light: {
          colors: {
            background: "#fbfbfb",
            foreground: "#262626",
            primary: {
              DEFAULT: "#10b068",
              foreground: "#ffffff",
            },
            focus: "#10b068",
            default: {
              50: "#fafafa",
              100: "#f2f2f2",
              200: "#ebebeb",
              300: "#e4e4e4",
              400: "#a8a8a8",
              500: "#737373",
              600: "#525252",
              700: "#404040",
              800: "#262626",
              900: "#171717",
            },
          },
        },
        dark: {
          colors: {
            background: "#2a2a2a",
            foreground: "#f5f5f5",
            primary: {
              DEFAULT: "#10b068",
              foreground: "#171717",
            },
            focus: "#10b068",
            default: {
              50: "#171717",
              100: "#262626",
              200: "#3f3f3f",
              300: "#525252",
              400: "#737373",
              500: "#a8a8a8",
              600: "#d4d4d4",
              700: "#e5e5e5",
              800: "#f5f5f5",
              900: "#fafafa",
            },
          },
        },
      },
    }),
  ],
}
