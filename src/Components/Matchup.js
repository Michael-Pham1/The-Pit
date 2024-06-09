import React from 'react';
import "./Matchup.css";
import vs from '../Images/vs-image.jpg';

// Dynamic props for displaying matchup information
function Matchup({ anime1Image, anime2Image, anime1Name, anime2Name, result }) {
  return (
    <>
      <div className='matchup-container'>
        <div className="matchup">
          <div className="character-1">
            <img src={anime1Image} alt={anime1Name} />
          </div>
          <div className="character-2">
            <img src={anime2Image} alt={anime2Name} />
            <div className="character-name">{anime2Name}</div>
          </div>
          <div className="vs">
            <img src={vs} alt="VS" /> {/* Update with your VS image path */}
          </div>
          
        </div>
        <div className="vs-text">
          <div className="text-1">{anime1Name}</div>
          <div className="text-2">{anime2Name}</div>
        {/* <div className="vs-text-3">{result}</div> */}
        </div>
      </div>
    
    </>
    
  );
}

export default Matchup;
