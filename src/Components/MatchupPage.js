import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Matchup from './Matchup';
import VoteBar from './VoteBar';
import './MatchupPage.css';

function MatchupPage() {
  const { id } = useParams();
  const [matchup, setMatchup] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    const fetchMatchup = async () => {
      try {
        const response = await axios.get(`http://localhost:3100/api/matchups/${id}`);
        setMatchup(response.data);
      } catch (err) {
        console.error(err);
      }
    };

    const fetchComments = async () => {
      try {
        const response = await axios.get(`http://localhost:3100/api/messages/${id}`);
        setComments(response.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchMatchup();
    fetchComments();
  }, [id]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`http://localhost:3100/api/messages`, {
        text: newComment,
        matchupId: id,
        user: "someUserId" 
      });
      setComments([...comments, response.data]);
      setNewComment('');
    } catch (err) {
      console.error(err);
    }
  };

  if (!matchup) return <div>Loading...</div>;

  return (
    <div className="matchup-page">
      <h1 className="matchup-title">{matchup.character1} vs {matchup.character2}</h1>
      <div className="matchup-display">
        <Matchup
          anime1Image={`http://localhost:3100/api/matchups/image/${id}/1`} 
          anime2Image={`http://localhost:3100/api/matchups/image/${id}/2`} 
          anime1Name={matchup.character1}
          anime2Name={matchup.character2}
          result={matchup.result}
          createDate={matchup.createDate}
        />
      </div>
      <VoteBar matchupId={id} initialVote1={matchup.vote1} initialVote2={matchup.vote2} />
      <div className="comments-section">
        <h2>Comments</h2>
        <form onSubmit={handleCommentSubmit}>
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Write your comment..."
            required
            rows="4"
          />
          <button type="submit">Submit</button>
        </form>
        <div className="comments-list">
          {comments.map((comment) => (
            <div key={comment._id} className="comment-item">
              <p>{comment.text}</p>
              <small>{comment.creatorId}</small>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MatchupPage;
