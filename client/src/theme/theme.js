import { createTheme } from "@mui/material/styles";
import { green, red, grey } from "@mui/material/colors";

// Fonts
import VarelaRoundRegularTtf from "assets/fonts/VarelaRound-Regular.ttf";

const ecoScraperTheme = createTheme({
  typography: {
    fontFamily: '"Varela Round"',
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
      @font-face {
        font-family: 'Varela Round';
        font-style: normal;
        font-display: swap;
        font-weight: 400;
        src: local('Varela Round'), local('VarelaRound-Regular'), url(${VarelaRoundRegularTtf}) format('truetype');
        unicodeRange: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF;
      }
    `,
    },
    MuiPaper: {
      styleOverrides: {
        elevation1: {
          boxShadow: "rgb(211 214 216 / 60%) 0px 4px 20px",
        },
      },
    },
  },
  palette: {
    custom: {
      black: "#000000",
      white: "#ffffff",
      greenMain: green[500],
      greenSecondary: green[300],
      greenLight: green[100],
      redMain: red[500],
      redSecondary: red[300],
      redLight: red[100],
      greyMain: grey[600],
      shadow: "rgb(211 214 216 / 60%) 0px 4px 20px",
      overlay: "rgba(0, 0, 0, 0.23)",
    },
  },
});

export default ecoScraperTheme;
