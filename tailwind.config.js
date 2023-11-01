module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        death: '#00A',
        spotify: '#282828',
        windows: {
          100: '#FFFCF1',
          200: '#D6D3CE',
          300: '#6F6C6F',
          700: '#084fdd',
          900: '#2B3346',
        }
      },
      animation: {
        'blink': 'blink 1s steps(1) infinite;',
        'static': 'static .2s infinite alternate'
      },
      keyframes: {
        'static': {
          '100%': {'background-position': '50% 0, 60% 50%'}
        }
      },
      backgroundImage: {
        scanline: 'linear-gradient(0deg, rgba(0, 0, 0, 0) 25%, rgba(0, 0, 0, 0.33) 25%, rgba(0, 0, 0, 0.33) 50%, rgba(0, 0, 0, 0) 50%, rgba(0, 0, 0, 0) 75%, rgba(0, 0, 0, 0.33) 75%, rgba(0, 0, 0, 0.33) 100%)',
        vignette: 'radial-gradient(ellipse at center, rgba(0, 0, 0, 0) 50%, rgba(0, 0, 0, 0.25) 100%)',
      },
      backgroud: {
        noise: 'repeating-radial-gradient(#000 0 0.001%,#fff 0 0.002%) 60% 60%/1000px 1000px,repeating-conic-gradient(#000 0 0.001%,#fff 0 0.002%) 40% 40%/1000px 1000px'
      }
    },
    fontFamily: {
      'death': ['Perfect\\ dos']
    }
  },
  plugins: [],
}
