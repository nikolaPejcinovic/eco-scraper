import React from "react";
import PropTypes from "prop-types";

// Components
import { ThemeProvider as MUIThemeProvider } from "@mui/material/styles";
import { ThemeProvider as StyledThemeProvider } from "styled-components";
import { CssBaseline } from "@mui/material";

// Themes
import theme from "./theme";

function EcoScraperThemeProvider({ theme, children }) {
  return (
    <MUIThemeProvider theme={theme}>
      <StyledThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </StyledThemeProvider>
    </MUIThemeProvider>
  );
}

EcoScraperThemeProvider.propTypes = {
  children: PropTypes.object.isRequired,
  theme: PropTypes.object
};

EcoScraperThemeProvider.defaultProps = {
  theme: theme
};

export default EcoScraperThemeProvider;
