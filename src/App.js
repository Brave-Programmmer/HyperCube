import logo from "./logo.svg";
import "./App.css";
import Nav from "./components/Nav";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Home from "./pages/Home";
import Admin from "./pages/Admin";

import Subscriptions from "./pages/Subscriptions";
import Videos from "./pages/Videos";

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const theme = createTheme({
    palette: {
      mode: darkMode === true ? "dark" : "light",
    },
  });
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Nav settheme={setDarkMode} darkmode={darkMode} theme={theme} />
          <Routes>
            <Route path="/signup" exact element={<SignUp />}></Route>
            <Route path="/" exact element={<Home />}></Route>
            <Route path="/login" exact element={<SignIn />}></Route>
            <Route
              path="/Subscriptions"
              exact
              element={<Subscriptions />}
            ></Route>
            <Route path="/admin" exact element={<Admin />}></Route>
            <Route path="/Video/:id" exact element={<Videos />}></Route>
          </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
