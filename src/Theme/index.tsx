import {
  createTheme,
  ThemeProvider,
} from "@mui/material/styles";


const theme = createTheme({
  palette: {
    primary: {
      main: "#1b8e6c",
    }
  }
});

export default function ThemeProviderComponent({ children }: { children: React.ReactNode }) {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
