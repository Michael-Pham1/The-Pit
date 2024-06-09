import "./Matchup.css";
import React from "react";
import photo1 from "../Images/anime-woman.png";
import photo2 from "../Images/gogue.jpg";
import vs from "../Images/vs-image.jpg";

function Matchup() {
  return (
    <>
      <div className="matchup">
        <div className="character-1">
          <img src={photo1} alt="Anime" />
        </div>
        <div className="character-2">
          <img src={photo2} alt="Anime" />
        </div>
        <div className="vs">
          <img src={vs} alt="VS" />
        </div>
      </div>
      <div className="vs-text">
        <div className="text-1">Gorl</div>
        <div className="text-2">Gogue</div>
      </div>
    </>
  );
}

export default Matchup;
