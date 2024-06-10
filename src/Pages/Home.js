import React, { useState, useEffect } from 'react';
import axios from 'axios';
import exampleImage from '../Images/Header.jpeg';
import '../Home.css';
import DedicatedMatches from '../Components/DedicatedMatches';

function Home() {
  const [matchups, setMatchups] = useState([]);
  const [anime1, setAnime1] = useState('');
  const [anime2, setAnime2] = useState('');
  const [anime1Image, setAnime1Image] = useState(null); // Updated to handle file
  const [anime2Image, setAnime2Image] = useState(null); // Updated to handle file
  const [result, setResult] = useState(null);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('anime1', anime1);
    formData.append('anime2', anime2);
    formData.append('result', result);
    if (anime1Image) formData.append('anime1Image', anime1Image);
    if (anime2Image) formData.append('anime2Image', anime2Image);

    try {
      const response = await axios.post('http://localhost:3100/api/matchups', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setMatchups([...matchups, response.data]);
      setAnime1('');
      setAnime2('');
      setAnime1Image(null);
      setAnime2Image(null);
      setResult(null);
      setIsFormVisible(false);
    } catch (err) {
      console.error(err);
    }
  };

  const toggleFormVisibility = () => setIsFormVisible(!isFormVisible);

  const filteredMatches = matchups.filter(matchup =>
  matchup.anime1?.toLowerCase().includes(searchTerm.toLowerCase()) ||
  matchup.anime2?.toLowerCase().includes(searchTerm.toLowerCase())
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
              <form onSubmit={handleSubmit}>
                  <div className='close-button-container'>
                    <button className="close-form-button" onClick={() => setIsFormVisible(false)}>X</button>
                  </div>
                  <div className='input-container-wrapper'>
                    <div className='input-container' id='character-entry-1'>
                      <input className='character-name-input'
                        type="text"
                        value={anime1}
                        onChange={(e) => setAnime1(e.target.value)}
                        placeholder="Character 1"
                        required
                      />
                      <input className='character-image-input'
                        type="file"
                        onChange={(e) => setAnime1Image(e.target.files[0])}
                        accept="image/*"
                      />
                    </div>
                    <div className='input-container' id='character-entry-2'>
                      <input className='character-name-input'
                        type="text"
                        value={anime2}
                        onChange={(e) => setAnime2(e.target.value)}
                        placeholder="Character 2"
                        required
                      />
                      <input className='character-image-input'
                        type="file"
                        onChange={(e) => setAnime2Image(e.target.files[0])}
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
      </div>
    </div>
  );
}

export default Home;