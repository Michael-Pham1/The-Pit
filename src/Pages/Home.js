import React, { useState, useEffect } from 'react';
import axios from 'axios';
import exampleImage from '../Images/Header.jpeg';
import '../Home.css';
import DedicatedMatches from '../Components/DedicatedMatches';

function Home() {
  const [matchups, setMatchups] = useState([]);
  const [anime1, setAnime1] = useState('');
  const [anime2, setAnime2] = useState('');
  const [result, setResult] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [matchesPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState('');
  const [isFormVisible, setIsFormVisible] = useState(false); // State to control form visibility

  useEffect(() => {
    const fetchMatchups = async () => {
      try {
        const response = await axios.get('https://the-pit-backend.vercel.app/api/matchups');
        setMatchups(response.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchMatchups();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://the-pit-backend.vercel.app/api/matchups', {
        anime1,
        anime2,
        result
      });
      setMatchups([...matchups, response.data]);
      setAnime1('');
      setAnime2('');
      setResult(null);
      setIsFormVisible(false);
    } catch (err) {
      console.error(err);
    }
  };

  const toggleFormVisibility = () => setIsFormVisible(!isFormVisible); 

  // Filter matches based on search term before slicing for pagination
  const filteredMatches = matchups.filter(matchup =>
    matchup.anime1.toLowerCase().includes(searchTerm.toLowerCase()) ||
    matchup.anime2.toLowerCase().includes(searchTerm.toLowerCase())
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
            onChange={(e) => setSearchTerm(e.target.value)} // Update search term
          />
        </div>
        <DedicatedMatches currentMatches={currentMatches} nextPage={nextPage} prevPage={prevPage} />
        {isFormVisible && (
          <div className='form-container'>
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
                <button type="submit">Add Matchup</button>
                <button className="close-form-button" onClick={() => setIsFormVisible(false)}>X</button>

              </form>
          </div>
      )}
      </div>
    </div>
  );
}

export default Home;