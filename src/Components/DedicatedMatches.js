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
              anime1Image={matchup.anime1Image}
              anime2Image={matchup.anime2Image}
              anime1Name={matchup.anime1}
              anime2Name={matchup.anime2}
              result={matchup.result}
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
