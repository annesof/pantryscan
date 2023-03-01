import { ThemeOptions } from '@mui/material/styles';
import { deepmerge } from '@mui/utils';

import { Themes } from './types';

const sharedTheme = {
  typography: {
    fontFamily: ['Poppins', 'sans-serif', 'Roboto'].join(','),
  },
  palette: {
    background: {
      default: '#fafafa',
      paper: '#fff',
    },
  },
  components: {
    MuiButtonBase: {
      defaultProps: {
        disableRipple: true,
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '5px',
          //padding: 3,
        },
      },
    },
    MuiButtonIcon: {
      styleOverrides: {
        root: {
          color: '#08b7c4',
          //padding: 3,
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        vertical: {
          marginRight: 10,
          marginLeft: 10,
        },
        // TODO: open issue for missing "horizontal" CSS rule
        // in Divider API - https://mui.com/material-ui/api/divider/#css
        middle: {
          marginTop: 10,
          marginBottom: 10,
          width: '80%',
        },
      },
    },
  },
} as ThemeOptions; // the reason for this casting is deepmerge return type
// TODO (Suren): replace mui-utils-deepmerge with lodash or ramda deepmerge

const themes: Record<Themes, ThemeOptions> = {
  light: deepmerge(sharedTheme, {
    palette: {
      mode: 'light',
      background: {
        default: 'pink',
        paper: '#fff',
      },
      secondary: {
        main: '#08B7C4',
      },
      primary: {
        main: '#F44336',
      },
      color: '#111',
    },
  }),

  dark: deepmerge(sharedTheme, {
    palette: {
      mode: 'dark',
      background: {
        default: '#fafafa',
        paper: '#171717',
      },
      secondary: {
        main: '#08B7C4',
      },
      primary: {
        main: '#F44336',
      },
    },
  }),
};

export default themes;
