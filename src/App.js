import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import NavBar from "./Components/NavBar";
import Home from "./Pages/Home";
import Catalog from "./Pages/Catalog";
import Profile from "./Pages/Profile";
import Login from "./Components/Login";
import Register from "./Components/Register";
import Reset from "./Components/Reset";

function App() {
  return (
    <Router>
      <div>
        <NavBar />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/reset" element={<Reset />} />
          {sessionStorage.getItem("uid") !== null ? (
            <>
              <Route path="/home" element={<Home />} />
              <Route path="/catalog" element={<Catalog />} />
              <Route path="/profile" element={<Profile />} />
            </>
          ) : (
            <Navigate to="/" replace />
          )}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
