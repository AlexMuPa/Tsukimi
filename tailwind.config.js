module.exports = {
  content: ['./src/**/*.{html,ts}', './projects/**/*.{html,ts}'],
  theme: {
    extend: {},
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      'black': '#2B2D42',
      'black-2': '#8D99AE',
      'gray': '#EDF2F4',
      'orange': '#F36F53',
      'orange-2': '#FA8F78',
      'green': '#07A753',
      'red': '#D80032',
      'red-2': '#EF233C'
    },
    fontFamily: {
      'sans': ['Roboto', 'Helvetica', 'Arial', 'sans-serif']
    },
    animation:{
      ping: 'ping 0.4s cubic-bezier(0, 0, 0.2, 1) 1',
      spin: 'spin 1s linear infinite'
    },
    keyframes: {
      ping: {
        '75%, 100%': {
          transform: 'scale(1.2)',
          opacity: '0',
        }
      },
      spin: {
        'from': {
          transform: 'rotate(0deg)'
        },
        'to': {
          transform: 'rotate(360deg)'
        }
      }
    }
  },
  plugins: [],
 };
