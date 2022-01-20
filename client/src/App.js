// Routes
import AppRoutes from "routes/AppRoutes";

// Providers
import EcoScraperThemeProvider from "theme";
import { DrawerProvider, LinearProgressProvider } from "contexts";
import { ToastProvider } from "contexts/ToastContext/ToastContext";

function App() {
  return (
    <EcoScraperThemeProvider>
      <ToastProvider>
        <LinearProgressProvider>
          <DrawerProvider>
            <AppRoutes />
          </DrawerProvider>
        </LinearProgressProvider>
      </ToastProvider>
    </EcoScraperThemeProvider>
  );
}

export default App;
