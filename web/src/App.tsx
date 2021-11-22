import React from 'react';
import { Routes, Route, Link } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material";
import { red } from "@mui/material/colors";
import Dashboard from './views/Dashboard';
import Home from './views/Home';

const style = createTheme({
  palette: {
    primary: {
      main: red[900]
    },
    secondary: {
      main: red[50]
    }
  },
  components: {
    MuiTypography: {
      defaultProps: {
        variantMapping: {
          h2: 'h1'
        }
      }
    }
  }
})

const App = (props: {}) => {
  return (
    <ThemeProvider theme={style}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </ThemeProvider>
  )
}

export default App;