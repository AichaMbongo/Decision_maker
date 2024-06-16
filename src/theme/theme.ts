import { createTheme } from '@mui/material/styles';
import { ThemeOptions } from '@mui/material/styles';

const themeOptions: ThemeOptions = {
  palette: {
    primary: {
      main: '#337357',
    },
    secondary: {
      main: '#071e22',
    },
    background: {
      default: '#fff',
    },
  },
  typography: {
    fontFamily: 'Roboto, sans-serif', // Set the desired font family here
    h1: {
      fontSize: 12,
      color: '#071e22',
      fontWeight: 'bold',
    },
    h2: {
      fontSize: 10,
      color: '#337357',
      fontWeight: 200,
    },
    h3: {
      fontSize: 35,
      color: '#071e22',
      fontWeight: 300,
    },
    subtitle1: {
      fontSize: 18,
      color: '#071e22',
      fontWeight: 500,
      fontStyle: 'italic',
    },
    button: {
      // fontStyle: 'italic',
    },
  },
};

const theme = createTheme(themeOptions as ThemeOptions & { overrides?: any });

export default theme;
