module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        death: '#00A',
        windows: {
          100: '#FFFCF1',
          200: '#D6D3CE',
          300: '#6F6C6F',
          700: '#084fdd',
          900: '#2B3346',
        }
      },
      animation: {
        'blink': 'blink 1s steps(1) infinite;'
      },
      backgroundImage: {
        scanline: 'linear-gradient(0deg, rgba(0, 0, 0, 0) 25%, rgba(0, 0, 0, 0.33) 25%, rgba(0, 0, 0, 0.33) 50%, rgba(0, 0, 0, 0) 50%, rgba(0, 0, 0, 0) 75%, rgba(0, 0, 0, 0.33) 75%, rgba(0, 0, 0, 0.33) 100%)',
        vignette: 'radial-gradient(ellipse at center, rgba(0, 0, 0, 0) 50%, rgba(0, 0, 0, 0.25) 100%)'
      }
    },
    fontFamily: {
      'death': ['Perfect\\ dos']
    }
  },
  plugins: [],
}
