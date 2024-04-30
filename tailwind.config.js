module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      boxShadow: {
        md: '0 6px 8px rgba(31, 41, 55, 0.07)',
        '3xl':
          '0 24px 72px 0 rgba(31, 41, 55, 0.22), 0 0 0 1px rgba(0, 0, 0, 0.04)',
      },
      aspectRatio: {
        '3/4': '3 / 4',
      },
    },
  },
  plugins: [],
};
