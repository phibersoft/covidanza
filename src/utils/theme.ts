import { createTheme } from "@material-ui/core";
import { red } from "@material-ui/core/colors";

/**
 * @description Material UI için varsayılan temamız.
 */
export const theme = createTheme({
  palette: {
    primary: {
      main: "#000a21",
    },
    secondary: {
      main: "#043ada",
    },
    error: {
      main: red.A400,
    },
    background: {
      default: "#fff",
    },
  },
  overrides: {
    MuiSwitch: {
      track: {
        backgroundColor: 'white'
      },
    }
  }
});
