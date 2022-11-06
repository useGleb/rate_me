import { createTheme } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface Palette {
    neutral: Palette["primary"];
  }
  interface PaletteOptions {
    neutral: PaletteOptions["primary"];
  }
}

const theme = createTheme({
  palette: {
    neutral: {
      main: "rgba(0,0,0,0.5)",
    },
    primary: {
      main: "#ee0000",
    },
    secondary: {
      main: "#fff",
    },
  },
});

export default theme;
