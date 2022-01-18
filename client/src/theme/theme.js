import { createTheme } from "@mui/material/styles";
import { green, purple } from "@mui/material/colors";

const ecoScraperTheme = createTheme({
  palette: {
    primary: {
      main: purple[500]
    },
    secondary: {
      main: green[500]
    }
  }
});

export default ecoScraperTheme;
