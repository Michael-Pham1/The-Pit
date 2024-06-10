import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavBar from "./Components/NavBar";
import Home from "./Pages/Home";
import Catalog from "./Pages/Catalog";
import Profile from "./Pages/Profile";
import Login from "./Components/Login";
import Register from "./Components/Register";
import Reset from "./Components/Reset";


function App() {
  return (
    //NAV BAR
    <Router>
      <div>
        <Routes>
          <Route path="/" Component={Login} />
          <Route path="/register" Component={Register} />
          <Route path="/reset" Component={Reset} />
          <Route path="/Home" element={<Home />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
        <NavBar />
      </div>
    </Router>

    //Landing Page image

    //Buttons

    //Display the matchups
  );
}

export default App;
