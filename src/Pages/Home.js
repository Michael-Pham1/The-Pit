import React from 'react';
import exampleImage from '../Images/Header.jpeg';
import '../Home.css'; // Import CSS file


function Home() {
  return (
    <div>
      <header>
        <img src={exampleImage} alt="Header" className="header-image" />
      </header>
      <h1>HomePage</h1>
    </div>

  );
}

export default Home;
