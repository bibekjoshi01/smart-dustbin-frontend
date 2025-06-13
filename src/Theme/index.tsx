import {
  createTheme,
  ThemeProvider,
  type PaletteColorOptions,
} from "@mui/material/styles";

const palleteColor = {
  primary: {
    main: "#008B8B",
  },
  secondary: {
    main: "#000080",
  },
} satisfies Record<string, PaletteColorOptions>;

const theme = createTheme({
  palette: {
    ...palleteColor,
  },
});

export default function ThemeProviderComponent({ children }: any) {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
