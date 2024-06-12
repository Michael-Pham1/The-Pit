import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Layout from "./Layout";
import Home from "./Pages/Home";
import Catalog from "./Pages/Catalog";
import Profile from "./Pages/Profile";
import Login from "./Components/Login";
import Register from "./Components/Register";
import Reset from "./Components/Reset";
import MatchupPage from "./Components/MatchupPage"; 

const App = () => (
  <Routes>
    <Route path="/" element={<Login />} />
    <Route path="/register" element={<Register />} />
    <Route path="/reset" element={<Reset />} />
    <Route
      path="/home"
      element={
        <Layout>
          <Home />
        </Layout>
      }
    />
    <Route
      path="/catalog"
      element={
        <Layout>
          <Catalog />
        </Layout>
      }
    />
    <Route
      path="/profile"
      element={
        <Layout>
          <Profile />
        </Layout>
      }
    />
    <Route
      path="/matchup/:id"
      element={ <Layout><MatchupPage /></Layout>
}
    />
  </Routes>
);

const AppWrapper = () => (
  <Router>
    <App />
  </Router>
);

export default AppWrapper;
