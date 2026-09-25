import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      // Keep in sync with the CSS variables in globals.css. Hex (not var()) so
      // Tailwind opacity modifiers like bg-teal/20 work.
      colors: {
        ink: {
          DEFAULT: '#062320',
          2: '#0b2f2a',
          line: '#164640',
        },
        teal: {
          DEFAULT: '#14b89a',
          bright: '#3ce6c2',
          deep: '#0a7d68',
        },
        sun: {
          DEFAULT: '#f5a623',
          deep: '#d98a0a',
        },
        mist: '#f3f7f6',
        text: '#0f1716',
        muted: '#5b6b68',
        border: '#e3ebe9',
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['var(--font-display)', 'var(--font-sans)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      maxWidth: {
        copy: '40rem',
      },
    },
  },
  plugins: [],
};

export default config;
