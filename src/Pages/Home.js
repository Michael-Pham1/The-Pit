import React, { useState, useEffect } from 'react';
import axios from 'axios';
import exampleImage from '../Images/Header.jpeg';
import '../Home.css';
import DedicatedMatches from '../Components/DedicatedMatches';

function Home() {
  const [matchups, setMatchups] = useState([]);
  const [character1, setCharacter1] = useState('');
  const [character2, setCharacter2] = useState('');
  const [imageCharacter1, setImageCharacter1] = useState(null); // Store File object directly
  const [imageCharacter2, setImageCharacter2] = useState(null); // Store File object directly
  const [vote1, setVote1] = useState(0);
  const [vote2, setVote2] = useState(0);
  const [result, setResult] = useState(false); // Assuming a boolean for the result
  const [creatorId] = useState('creatorId123'); // Assuming a constant creatorId
  const [currentPage, setCurrentPage] = useState(1);
  const [matchesPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState('');
  const [isFormVisible, setIsFormVisible] = useState(false);

  useEffect(() => {
    axios.get('https://the-pit-backend.vercel.app/api/matchups')
      .then(response => setMatchups(response.data))
      .catch(err => console.error(err));
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
    formData.append('createrId', creatorId);
    if (imageCharacter1) formData.append('imageCharacter1', imageCharacter1);
    if (imageCharacter2) formData.append('imageCharacter2', imageCharacter2);

    try {
      const response = await axios.post('https://the-pit-backend.vercel.app/api/matchups', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setMatchups([...matchups, response.data]);
      resetForm();
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
    setIsFormVisible(false);
  };

  const toggleFormVisibility = () => setIsFormVisible(!isFormVisible);

  const filteredMatches = matchups.filter(matchup =>
    matchup.character1.toLowerCase().includes(searchTerm.toLowerCase()) ||
    matchup.character2.toLowerCase().includes(searchTerm.toLowerCase())
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
      </div>
    </div>
  );
}

export default Home;
