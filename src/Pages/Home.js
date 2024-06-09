// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import exampleImage from '../Images/Header.jpeg';
// import '../Home.css'; // Import CSS file

// function Home() {
//   const [matchups, setMatchups] = useState([]);
//   const [anime1, setAnime1] = useState('');
//   const [anime2, setAnime2] = useState('');
//   const [result, setResult] = useState('');
//   const [currentPage, setCurrentPage] = useState(1);
//   const [matchesPerPage] = useState(6);

//   useEffect(() => {
//     const fetchMatchups = async () => {
//       try {
//         const response = await axios.get('http://localhost:5001/api/matchups');
//         setMatchups(response.data);
//       } catch (err) {
//         console.error(err);
//       }
//     };
//     fetchMatchups();
//   }, []);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post('http://localhost:5001/api/matchups', {
//         anime1,
//         anime2,
//         result
//       });
//       setMatchups([...matchups, response.data]);
//       setAnime1('');
//       setAnime2('');
//       setResult('');
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   // Calculate the current matches to display
//   const indexOfLastMatch = currentPage * matchesPerPage;
//   const indexOfFirstMatch = indexOfLastMatch - matchesPerPage;
//   const currentMatches = matchups.slice(indexOfFirstMatch, indexOfLastMatch);

//   // Change page
//   const paginate = (pageNumber) => setCurrentPage(pageNumber);

//   // Navigate to the next page
//   const nextPage = () => setCurrentPage(prev => (prev * matchesPerPage >= matchups.length) ? prev : prev + 1);

//   // Navigate to the previous page
//   const prevPage = () => setCurrentPage(prev => (prev > 1) ? prev - 1 : prev);

//   return (
//     <div className='homepage'>
//       <header>
//         <img src={exampleImage} alt="Header" className="header-image" />
//         <div className="overlay"></div>
//       </header>
//       <div id='home-body'>
//         <div id='search-create-container'>
//           <button>Create Match</button>
//           <input type="text" id="searchBar" placeholder="Search Active Matches..." />
//         </div>
//         <div id='dedicated-matches-container'>
//           <hr className="bold-line" />
//           <h1 id="dedicated-matches">DEDICATED MATCHES</h1>
//           <hr className="bold-line" />
//           <div id="dedicated-matches-list">
//             <button className='prev-button' onClick={prevPage}></button>
//             {currentMatches.length > 0 ? (
//               currentMatches.map(matchup => (
//                 <div key={matchup._id} className="matchup">
//                   <p>{matchup.anime1} vs {matchup.anime2}</p>
//                   <p>Result: {matchup.result}</p>
//                 </div>
                
//               ))
//             ) : (
              
//               <p>No matchups available</p>
//             )}
//             <button className="next-button" onClick={nextPage}></button>

//           </div>
//         </div>
//         <form onSubmit={handleSubmit}>
//           <input
//             type="text"
//             value={anime1}
//             onChange={(e) => setAnime1(e.target.value)}
//             placeholder="Anime 1"
//             required
//           />
//           <input
//             type="text"
//             value={anime2}
//             onChange={(e) => setAnime2(e.target.value)}
//             placeholder="Anime 2"
//             required
//           />
//           <input
//             type="text"
//             value={result}
//             onChange={(e) => setResult(e.target.value)}
//             placeholder="Result"
//             required
//           />
//           <button type="submit">Add Matchup</button>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default Home;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import exampleImage from '../Images/Header.jpeg';
import '../Home.css';
import DedicatedMatches from '../Components/DedicatedMatches'; // Import the new component

function Home() {
  const [matchups, setMatchups] = useState([]);
  const [anime1, setAnime1] = useState('');
  const [anime2, setAnime2] = useState('');
  const [result, setResult] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [matchesPerPage] = useState(6);

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
    try {
      const response = await axios.post('http://localhost:3100/api/matchups', {
        anime1,
        anime2,
        result
      });
      setMatchups([...matchups, response.data]);
      setAnime1('');
      setAnime2('');
      setResult('');
    } catch (err) {
      console.error(err);
    }
  };

  const indexOfLastMatch = currentPage * matchesPerPage;
  const indexOfFirstMatch = indexOfLastMatch - matchesPerPage;
  const currentMatches = matchups.slice(indexOfFirstMatch, indexOfLastMatch);

  const nextPage = () => setCurrentPage(prev => (prev * matchesPerPage >= matchups.length) ? prev : prev + 1);
  const prevPage = () => setCurrentPage(prev => (prev > 1) ? prev - 1 : prev);

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
        <DedicatedMatches currentMatches={currentMatches} nextPage={nextPage} prevPage={prevPage} />
        <form onSubmit={handleSubmit}>
        </form>
      </div>
    </div>
  );
}

export default Home;