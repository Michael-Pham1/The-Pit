import React, { useState, useEffect } from 'react';
import axios from 'axios';
import exampleImage from '../Images/Header.jpeg';
import '../Home.css'; // Import CSS file

function Home() {
  const [matchups, setMatchups] = useState([]);
  const [anime1, setAnime1] = useState('');
  const [anime2, setAnime2] = useState('');
  const [result, setResult] = useState('');
  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);

  useEffect(() => {
    const fetchMatchups = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/matchups');
        setMatchups(response.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchMatchups();
  }, []);

  const handleImageUpload = async (image) => {
    const formData = new FormData();
    formData.append('image', image);
    try {
      const response = await axios.post('http://localhost:5000/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      return response.data.imageUrl;
    } catch (err) {
      console.error(err);
      return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const imageUrl1 = await handleImageUpload(image1);
    const imageUrl2 = await handleImageUpload(image2);
    if (imageUrl1 && imageUrl2) {
      try {
        const response = await axios.post('http://localhost:5000/api/matchups', {
          anime1,
          anime2,
          result,
          image1: imageUrl1,
          image2: imageUrl2
        });
        setMatchups([...matchups, response.data]);
        setAnime1('');
        setAnime2('');
        setResult('');
        setImage1(null);
        setImage2(null);
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <div className='homepage'>
      <header>
        <img src={exampleImage} alt="Header" className="header-image" />
        <div className="overlay"></div>
      </header>
      <div id='home-body'>
        <div id='search-create-container'>
          <button>Create Match</button>
          <input type="text" id="searchBar" placeholder="Search Active Matches..." />
        </div>
        <div id='dedicated-matches-container'>
          <hr className="bold-line" />
          <h1 id="dedicated-matches">DEDICATED MATCHES</h1>
          <hr className="bold-line" />
          <div className="matchups-container">
            {matchups.length > 0 ? (
              matchups.map(matchup => (
                <div key={matchup._id} className="matchup">
                  <div className="image-container">
                    <img src={matchup.image1} alt={matchup.anime1} />
                    <img src={matchup.image2} alt={matchup.anime2} />
                  </div>
                  <p>{matchup.anime1} vs {matchup.anime2}</p>
                  <p>Result: {matchup.result}</p>
                </div>
              ))
            ) : (
              <p>No matchups available</p>
            )}
          </div>
        </div>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={anime1}
            onChange={(e) => setAnime1(e.target.value)}
            placeholder="Anime 1"
            required
          />
          <input
            type="text"
            value={anime2}
            onChange={(e) => setAnime2(e.target.value)}
            placeholder="Anime 2"
            required
          />
          <input
            type="text"
            value={result}
            onChange={(e) => setResult(e.target.value)}
            placeholder="Result"
            required
          />
          <input
            type="file"
            onChange={(e) => setImage1(e.target.files[0])}
            required
          />
          <input
            type="file"
            onChange={(e) => setImage2(e.target.files[0])}
            required
          />
          <button type="submit">Add Matchup</button>
        </form>
      </div>
    </div>
  );
}

export default Home;
