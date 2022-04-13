module.exports = {
  content: ['./resources/js/**/*.{html,js,svelte,ts,edge}'],
  theme: {
    extend: {},
  },
  plugins: [require('daisyui'), require('tailwindcss-flip')],
  // daisyUI config (optional)
  daisyui: {
    styled: true,
    themes: [
      'night',
      'winter',
      'dracula',
      'black',
      'lofi',
      {
        mytheme: {
          'primary': '#057AFF',
          'secondary': '#f9a8d4',
          'accent': '#37CDBE',
          'neutral': '#f3f4f6',
          'base-100': '#FFFFFF',
          'info': '#3ABFF8',
          'success': '#4ade80',
          'warning': '#facc15',
          'error': '#ef4444',
        },
      },
    ],
    base: true,
    utils: true,
    logs: true,
    rtl: false,
    prefix: '',
    darkTheme: 'dark',
  },
}
