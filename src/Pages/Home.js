import React from 'react';
import exampleImage from '../Images/Header.jpeg';
import '../Home.css'; // Import CSS file


function Home() {
  return (
    <div className='homepage'>
      <header>
        <img src={exampleImage} alt="Header" className="header-image" />
        <div class="overlay"></div>
      </header>
      <body id='home-body'>
        <div id='search-create-container'>
          <button>Create Match</button>
          <input type="text" id="searchBar" placeholder="Search Active Matches..."></input>
        </div>
        <div id='dedicated-matches-container'>
          <hr class="bold-line"></hr>
          <h1 id="dedicated-matches">DEDICATED MATCHES</h1>
          <hr class="bold-line"></hr>
        </div>
      </body>
    </div >

  );
}

export default Home;
