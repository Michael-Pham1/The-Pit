

import React from 'react';
import "./Matchup.css";
import vs from '../Images/vs-image.jpg';

// Dynamic props for displaying matchup information, now including createDate
function Matchup({ anime1Image, anime2Image, anime1Name, anime2Name, createDate, result }) {
  // Format date if createDate is a Date object, otherwise leave as is

  return (
    <>
      <div className='matchup-container'>
        <div className="matchup">
          <div className="character-1">
            <img src={anime1Image} alt={anime1Name} />
          </div>
          <div className="character-2">
            <img src={anime2Image} alt={anime2Name} />
          </div>
          <div className="vs">
            <img src={vs} alt="VS" />
          </div>
        </div>
        <div className="vs-text">
          <div className="text-1">{anime1Name}</div>
          <div className="text-2">{anime2Name}</div>
        </div>
        <div><strong>Result:</strong> {result ? result : "Ongoing"}</div>
        <div className="create-date">Created on: {createDate}</div>
      </div>
    </>
  );
}

export default Matchup;


// import React from 'react';

// function Matchup({ anime1Image, anime2Image, anime1Name, anime2Name, result, createDate }) {
//   return (
//     <div className="matchup">
//       <div className="character-1">
//         <img src={anime1Image} alt={`Image of ${anime1Name}`} />
//         <h3>{anime1Name}</h3>
//       </div>
//       <div className="vs">vs</div>
//       <div className="character-2">
//         <img src={anime2Image} alt={`Image of ${anime2Name}`} />
//         <h3>{anime2Name}</h3>
//       </div>
//       <p>Result: {result ? 'Won' : 'Lost'}</p>
//       <p>Create Date: {new Date(createDate).toLocaleDateString()}</p>
//     </div>
//   );
// }

// export default Matchup;
