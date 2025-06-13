import Routes from "./routes";
import { useEffect } from "react";
import ThemeProviderComponent from "./Theme";
import { setSnackbar } from "./utils/notifier";
import StoreProvider from "./libs/StoreProvider";
import { BrowserRouter, } from "react-router-dom";
import { SnackbarProvider, useSnackbar } from "notistack";

function SnackbarInitializer() {
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    setSnackbar(enqueueSnackbar);
  }, [enqueueSnackbar]);

  return null;
}

function App() {
  return (
    <BrowserRouter>
      <StoreProvider>
        <ThemeProviderComponent>
          <SnackbarProvider
            maxSnack={3}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            autoHideDuration={3000}
          >
            <SnackbarInitializer />
            <Routes />
          </SnackbarProvider>
        </ThemeProviderComponent>
      </StoreProvider>
    </BrowserRouter>
  );
}

export default App;
