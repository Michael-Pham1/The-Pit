import React from "react";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import NavBar from "./Components/NavBar";
import Home from "./Pages/Home";
import Catalog from "./Pages/Catalog";
import Profile from "./Pages/Profile";
import Login from "./Components/Login";
import Register from "./Components/Register";
import Reset from "./Components/Reset";

const App = () => {
  const location = useLocation();
  const hideNavBarPaths = ["/", "/register", "/reset"];

  return (
    //NAV BAR
    <div>
      {!hideNavBarPaths.includes(location.pathname) && <NavBar />}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/reset" element={<Reset />} />
        <Route path="/home" element={<Home />} />
        <Route path="/catalog" element={<Catalog />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </div>
  );
};

const AppWrapper = () => (
  <Router>
    <App />
  </Router>
);

export default AppWrapper;
