import { createTheme } from '@mui/material'

export default createTheme({
  palette: {
    background: {
      default: '#F1F3F4',
    },
    primary: {
      main: '#111',
    },
  },

  typography: {
    fontFamily: 'Mulish, sans-serif',
    h3: {
      fontWeight: '800',
    },
    h5: {
      fontWeight: '400',
      fontSize: '1rem',
    },
    h6: {
      fontWeight: '800',
    },
    subtitle1: {
      fontWeight: '800',
      textTransform: 'capitalize',
    },
  },

  mixins: {
    centerContent: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
    },
    centerContent1: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      height: '100vh',
    },
  },
})
