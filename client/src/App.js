// Routes
import AppRoutes from "routes/AppRoutes";

// Theme provider
import EcoScraperThemeProvider from "theme";

function App() {
  return (
    <EcoScraperThemeProvider>
      <AppRoutes />
    </EcoScraperThemeProvider>
  );
}

export default App;
