import {
  createTheme,
  ThemeProvider,
} from "@mui/material/styles";


// customize theme
const theme = createTheme({
  palette: {
    primary: {
      main: "#1b8e6c",
    },
    secondary: {
      main: '#8C8C8C',
    },
    success: {
      main: '#52C41A',
    },
    info: {
      main: '#13C2C2',
    },
    error: {
      main: '#F5222D',
    },
    warning: {
      main: '#FAAD14',
    },
    action: {
      hover: '#0000000a'
    },
    background: {
      paper: '#FFFFFF',
      default: '#fafafb',
    }
  },
  typography: {
    htmlFontSize: 16,
    fontFamily: 'Public Sans, sans-serif',
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 600,
    h1: {
      fontWeight: 600,
      fontSize: '2.375rem',
      lineHeight: 1.21
    },
    h2: {
      fontWeight: 600,
      fontSize: '1.875rem',
      lineHeight: 1.27
    },
    h3: {
      fontWeight: 600,
      fontSize: '1.5rem',
      lineHeight: 1.33
    },
    h4: {
      fontWeight: 600,
      fontSize: '1.25rem',
      lineHeight: 1.4
    },
    h5: {
      fontWeight: 600,
      fontSize: '1rem',
      lineHeight: 1.5
    },
    h6: {
      fontWeight: 400,
      fontSize: '0.875rem',
      lineHeight: 1.57
    },
    caption: {
      fontWeight: 400,
      fontSize: '0.75rem',
      lineHeight: 1.66
    },
    body1: {
      fontSize: '0.875rem',
      lineHeight: 1.57
    },
    body2: {
      fontSize: '0.75rem',
      lineHeight: 1.66
    },
    subtitle1: {
      fontSize: '0.875rem',
      fontWeight: 600,
      lineHeight: 1.57
    },
    subtitle2: {
      fontSize: '0.75rem',
      fontWeight: 500,
      lineHeight: 1.66
    },
    overline: {
      lineHeight: 1.66
    },
    button: {
      textTransform: 'capitalize'
    }
  }
});

export default function ThemeProviderComponent({ children }: { children: React.ReactNode }) {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}