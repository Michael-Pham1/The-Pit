import React from 'react';
import Matchup from './Matchup';

function DedicatedMatches({ currentMatches, nextPage, prevPage }) {
  return (
    <div id='dedicated-matches-container'>
      <hr className="bold-line" />
      <h1 id="dedicated-matches">DEDICATED MATCHES</h1>
      <hr className="bold-line" />
      <div id="dedicated-matches-list">
        <button className='prev-button' onClick={prevPage}></button>
        {currentMatches.length > 0 ? (
          currentMatches.map(matchup => (
            <Matchup
              key={matchup._id}
              anime1Image={`http://localhost:3100/api/matchups/image/${matchup._id}/1`} 
              anime2Image={`http://localhost:3100/api/matchups/image/${matchup._id}/2`} 
              anime1Name={matchup.character1}
              anime2Name={matchup.character2}
              result={matchup.result}
              createDate={matchup.createDate}
            />
          ))
        ) : (
          <p>No matchups available</p>
        )}
        <button className="next-button" onClick={nextPage}></button>
      </div>
    </div>
  );
}

export default DedicatedMatches;
