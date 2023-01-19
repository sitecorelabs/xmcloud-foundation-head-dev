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
      variants: ['sm', 'md'],
    },
    {
      pattern: /self-/,
      variants: ['sm', 'md'],
    },
    {
      pattern: /order-/,
      variants: ['sm', 'md'],
    },
    {
      pattern: /offset-/,
      variants: ['sm', 'md'],
    },
    {
      pattern: /grow/,
      variants: ['sm', 'md'],
    },
    {
      pattern: /(m|p)(y|x|t|b|l|r)-/,
      variants: ['sm', 'md'],
    },
    {
      pattern: /flex/,
      variants: ['sm', 'md'],
    },
    {
      pattern: /block/,
      variants: ['sm', 'md'],
    },
    {
      pattern: /hidden/,
      variants: ['sm', 'md'],
    },
    {
      pattern: /inline/,
      variants: ['sm', 'md'],
    },
    {
      pattern: /inline-block/,
      variants: ['sm', 'md'],
    },
    {
      pattern: /block/,
      variants: ['sm', 'md'],
    },
    {
      pattern: /table/,
      variants: ['sm', 'md'],
    },
    {
      pattern: /table-row/,
      variants: ['sm', 'md'],
    },
    {
      pattern: /table-cell/,
      variants: ['sm', 'md'],
    },
    {
      pattern: /inline-flex/,
      variants: ['sm', 'md'],
    },
    {
      pattern: /gap/,
      variants: ['sm', 'md'],
    },
    {
      pattern: /columns/,
      variants: ['sm', 'md'],
    },
    {
      pattern: /grid/,
      variants: ['sm', 'md'],
    },
    {
      pattern: /h/,
      variants: ['sm', 'md'],
    },
    {
      pattern: /items/,
      variants: ['sm', 'md'],
    },
    {
      pattern: /rounded/,
      variants: ['sm', 'md'],
    },
    {
      pattern: /w/,
      variants: ['sm', 'md'],
    },
    {
      pattern: /text-/,
      variants: ['sm', 'md'],
    },
    {
      pattern: /bg-/,
    },
    {
      pattern: /font-/,
    },
  ],
  theme: {
    screens: {
      md: '768px',
      lg: '1200px',
      ...defaultTheme.screens,
    },
    colors: {},
  },
};
