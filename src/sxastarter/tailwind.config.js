const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/*.{js,ts,jsx,tsx}',
  ],
  safelist: [
    {
      pattern: /basis-/,
      variants: ['sm', 'md', 'lg'],
    },
    {
      pattern: /self-/,
      variants: ['sm', 'md', 'lg'],
    },
    {
      pattern: /order-/,
      variants: ['sm', 'md', 'lg'],
    },
    {
      pattern: /grow/,
      variants: ['sm', 'md', 'lg'],
    },
    {
      pattern: /(m|p)(y|x|t|b|l|r)-/,
      variants: ['sm', 'md', 'lg'],
    },
    {
      pattern: /bg-/,
    },
    {
      pattern: /text-/,
    },
    {
      pattern: /flex|block|hidden|inline|inline-block|block|table|table-row|table-cell|inline-flex/,
      variants: ['sm', 'md', 'lg'],
    },
  ],
  theme: {
    screens: {
      md: '768px',
      lg: '1200px',
      ...defaultTheme.screens,
    },
    extend: {
      maxWidth: {
        30: '30rem',
      },
    },
  },
  plugins: [],
};
