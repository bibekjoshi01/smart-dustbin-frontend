import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { SnackbarProvider } from "notistack";
import "./index.css";
import App from "./App.tsx";
import ThemeProviderComponent from "./Theme/index.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProviderComponent>
      <SnackbarProvider
        maxSnack={3}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        autoHideDuration={3000}
      >
        <App />
      </SnackbarProvider>
    </ThemeProviderComponent>
  </StrictMode>
);
