import { ThemeProvider, CssBaseline } from "@mui/material";
import { useMemo, useState } from "react";

import MainLayout from "./layouts/MainLayout";
import Dashboard from "./pages/Dashboard";

import { darkTheme } from "./theme/darkTheme";
import { lightTheme } from "./theme/lightTheme";

function App() {
  const [darkMode, setDarkMode] = useState(true);

  const theme = useMemo(
    () => (darkMode ? darkTheme : lightTheme),
    [darkMode]
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <MainLayout darkMode={darkMode} setDarkMode={setDarkMode}>
        <Dashboard />
      </MainLayout>
    </ThemeProvider>
  );
}

export default App;

