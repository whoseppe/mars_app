import { createTheme, ThemeProvider } from "@mui/material/styles";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Home from "./Pages/home";
import RoverDetails from "./Pages/roverDetails";
import { Route } from "wouter";
import CssBaseline from "@mui/material/CssBaseline";

function App() {
  const theme = createTheme({
    typography: {
      fontFamily: "Bruno Ace",
      body: {
        fontFamily: "Roboto Mono",
      },
      body2: {
        fontFamily: "Roboto Mono",
      },
      button: {
        textTransform: "none",
      },
    },
    palette: {
      primary: {
        main: "#131313",
      },
      secondary: {
        main: "#C2B1A9",
      },
    },
    colors: {
      white: "#C2B1A9",
    },
  });

  theme.typography.h1 = {
    fontFamily: "Bruno Ace",
    fontSize: "3.8rem",
    [theme.breakpoints.up("sm")]: {
      fontSize: "6rem",
    },
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Route path="/" component={Home} />
        <Route path="/details/:name">
          {(params) => <RoverDetails name={params.name} />}
        </Route>
      </LocalizationProvider>
    </ThemeProvider>
  );
}

export default App;
