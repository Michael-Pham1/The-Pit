import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './Components/NavBar';
import Home from './Pages/Home';
import Catalog from './Pages/Catalog';
import Profile from './Pages/Profile';

function App() {
  return (
    //NAV BAR
    <Router>
      <div>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Catalog />} />
          <Route path="/contact" element={<Profile />} />
        </Routes>
      </div>
    </Router>

    //Landing Page image

    //Buttons

    //Display the matchups
  );
}

export default App;
