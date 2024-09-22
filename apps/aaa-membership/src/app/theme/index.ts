// @mui material components
import { createTheme } from '@mui/material/styles';
// import Fade from "@mui/material/Fade";

import { typography } from './base/typography';
import { globals } from './base/globals';

import './base/global.css';

export const aaaColors = {
  primary: {
    main: '#013C88',
    light: '#eef2f6',
  },

  secondary: {
    main: 'rgb(103, 58, 183)',
    light: '',
    lighter: '#CFFFFF',
  },

  info: {
    main: '#96CAEB',
  },

  success: {
    main: '#4CAF50',
  },

  warning: {
    dark: '#CC3300', //make sure pass WCAG AA when put warning message with light background
    main: '#fb8c00',
    light: '#FEF3E5',
    // main: '#574200',
    // light: '#FFF8E1',
    // contrastText: '#574200',
  },

  error: {
    main: '#C72436', // '#ff0000', //'#e13022', // F44335 contrast is not enough
  },
};

export const aaaTheme = createTheme({
  palette: {
    ...aaaColors,
  },

  typography: { ...typography },

  components: {
    MuiCssBaseline: {
      styleOverrides: {
        ...globals,
      },
    },
    MuiCheckbox: {
      styleOverrides: {
        // colorPrimary: {
        //   '&.focused': {
        //     backgroundColor: colors.secondary.main,
        //   },
        // },
      },
    },
    MuiAutocomplete: {
      styleOverrides: {},
    },
    MuiFormLabel: {
      styleOverrides: {
        root: {
          color: 'inherit',
        },
      },
    },
    MuiAccordion: {
      styleOverrides: {
        root: {
          '&:before': {
            display: 'none',
          },
          boxShadow: 'none',
          padding: 0,
        },
      },
    },
    MuiAccordionSummary: {
      styleOverrides: {
        root: {
          padding: 0,
        },
        content: {
          margin: 0,
        },
      },
    },
    MuiAccordionDetails: {
      styleOverrides: {
        root: {
          padding: 0,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          '&.Mui-disabled': {
            color: 'black',
          },
        },
      },
    },

    MuiTableHead: {
      styleOverrides: {
        root: {
          backgroundColor: 'lightgrey',
        },
      },
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          // '&:nth-of-type(odd)': {
          //   backgroundColor: 'white',
          // },
          backgroundColor: 'white',
        },
      },
    },
  },
});

export const dashboardTheme = createTheme({
  cssVariables: {
    colorSchemeSelector: 'data-toolpad-color-scheme',
  },
  colorSchemes: {
    light: {
      palette: {
        background: {
          default: '#eef2f6',
          paper: '#EEEEF9',
        },
      },
    },
    // dark: {
    //   palette: {
    //     background: {
    //       default: '#013C88',
    //       paper: '#112E4D',
    //     },
    //   },
    // },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 600,
      lg: 1200,
      xl: 1536,
    },
  },
});
