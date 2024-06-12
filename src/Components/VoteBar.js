import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './VoteBar.css';

function VoteBar({ matchupId, initialVote1, initialVote2 }) {
  const [votes1, setVotes1] = useState(initialVote1);
  const [votes2, setVotes2] = useState(initialVote2);

  const handleVote = async (character) => {
    try {
      const response = await axios.post(`http://localhost:3100/api/matchups/vote`, {
        matchupId,
        character,
      });
      if (character === 1) {
        setVotes1(response.data.vote1);
      } else {
        setVotes2(response.data.vote2);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const totalVotes = votes1 + votes2;
  const vote1Percentage = totalVotes > 0 ? (votes1 / totalVotes) * 100 : 50;
  const vote2Percentage = totalVotes > 0 ? (votes2 / totalVotes) * 100 : 50;

  return (
    <div className="vote-bar-container">
      <div className="vote-buttons">
        <button onClick={() => handleVote(1)}>Vote for Character 1</button>
        <button onClick={() => handleVote(2)}>Vote for Character 2</button>
      </div>
      <div className="vote-bar">
        <div className="vote-bar-left" style={{ width: `${vote1Percentage}%` }}></div>
        <div className="vote-bar-right" style={{ width: `${vote2Percentage}%` }}></div>
      </div>
    </div>
  );
}

export default VoteBar;
