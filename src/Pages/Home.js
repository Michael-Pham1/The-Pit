import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import exampleImage from '../Images/Header.jpeg';
import '../Home.css';
import DedicatedMatches from '../Components/DedicatedMatches';

function Home() {
  const [matchups, setMatchups] = useState([]);
  const [character1, setCharacter1] = useState('');
  const [character2, setCharacter2] = useState('');
  const [imageCharacter1, setImageCharacter1] = useState(null);
  const [imageCharacter2, setImageCharacter2] = useState(null);
  const [vote1, setVote1] = useState(0);
  const [vote2, setVote2] = useState(0);
  const [result, setResult] = useState(false);
  const [creatorId, setcreatorId] = useState('creatorId123');
  const [currentPage, setCurrentPage] = useState(1);
  const [matchesPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState('');
  const [isFormVisible, setIsFormVisible] = useState(false);

  useEffect(() => {
    const fetchMatchups = async () => {
      try {
        const response = await axios.get('http://localhost:3100/api/matchups');
        setMatchups(response.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchMatchups();
  }, []);

  const handleImageChange = (e, setImage) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('character1', character1);
    formData.append('character2', character2);
    formData.append('result', result);
    formData.append('vote1', vote1);
    formData.append('vote2', vote2);
    formData.append('creatorId', creatorId);
    if (imageCharacter1) formData.append('imageCharacter1', imageCharacter1);
    if (imageCharacter2) formData.append('imageCharacter2', imageCharacter2);
    console.log('Form Data before Post request:');
    formData.forEach((value, key) => console.log(key, value));

    try {
      const response = await axios.post('http://localhost:3100/api/matchups', formData, {
        headers: {
          'accept': 'application/json',
          'Accept-Language': 'en-US,en;q=0.8',
          'Content-Type': `multipart/form-data; `,
        }
      });
      setMatchups([...matchups, response.data]);
    } catch (err) {
      console.error(err);
    }
  };

  const resetForm = () => {
    setCharacter1('');
    setCharacter2('');
    setImageCharacter1(null);
    setImageCharacter2(null);
    setVote1(0);
    setVote2(0);
    setResult(false);
    setcreatorId('creatorId123');
    setIsFormVisible(false);
  };

  const toggleFormVisibility = () => setIsFormVisible(!isFormVisible);

  const filteredMatches = matchups.filter(matchup =>
    (typeof matchup.character1 === 'string' && matchup.character1.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (typeof matchup.character2 === 'string' && matchup.character2.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const indexOfLastMatch = currentPage * matchesPerPage;
  const indexOfFirstMatch = indexOfLastMatch - matchesPerPage;
  const currentMatches = filteredMatches.slice(indexOfFirstMatch, indexOfLastMatch);

  const nextPage = () => setCurrentPage(prev => (prev * matchesPerPage >= filteredMatches.length) ? prev : prev + 1);
  const prevPage = () => setCurrentPage(prev => (prev > 1) ? prev - 1 : prev);

  return (
    <div className='homepage'>
      <header className="header">
        <img src={exampleImage} alt="Header" className="header-image" />
        <div className="overlay"></div>
        <div className="header-title">The Pit</div>
      </header>
      <div id='home-body'>
        <div id='search-create-container'>
          <button id="create-match-button" onClick={toggleFormVisibility}>Create Match</button>
          <input
            type="text"
            id="searchBar"
            placeholder="Search Active Matches..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <DedicatedMatches currentMatches={currentMatches} nextPage={nextPage} prevPage={prevPage} />
        {isFormVisible && (
          <div className='form-container'>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
              <div className='close-button-container'>
                <button className="close-form-button" onClick={() => setIsFormVisible(false)}>X</button>
              </div>
              <div className='input-container-wrapper'>
                <div className='input-container' id='character-entry-1'>
                  <input className='character-name-input'
                    type="text"
                    value={character1}
                    onChange={(e) => setCharacter1(e.target.value)}
                    placeholder="Character 1"
                    required
                  />
                  <input className='character-image-input'
                    type="file"
                    onChange={(e) => handleImageChange(e, setImageCharacter1)}
                    accept="image/*"
                  />
                </div>
                <div className='input-container' id='character-entry-2'>
                  <input className='character-name-input'
                    type="text"
                    value={character2}
                    onChange={(e) => setCharacter2(e.target.value)}
                    placeholder="Character 2"
                    required
                  />
                  <input className='character-image-input'
                    type="file"
                    onChange={(e) => handleImageChange(e, setImageCharacter2)}
                    accept="image/*"
                  />
                </div>
              </div>
              <div className='submit-button-container'>
                <button type="submit">Add Matchup</button>
              </div>
            </form>
          </div>
        )}
        <div id="matchup-list">
          {currentMatches.map((matchup) => (
            <div key={matchup._id} className="matchup-item">
              <Link to={`/matchup/${matchup._id}`}>
                {matchup.character1} vs {matchup.character2}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
