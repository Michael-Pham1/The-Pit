import React from "react";
import "./ProfileInfo.css";
import profilePic from "../Images/anime-woman.png";

function ProfileInfo(profile) {
  //Frpm the profile object, we can extract all the profile info we need
  return (
    <div id="profile-info">
      <div id="user-details">
        <div id="user-info">
          <img src={profilePic} alt="profile pic"></img>
          <section>
            <p>
              <strong>Anime Lover</strong>
            </p>
            <p style={{ color: "#9e9d9d" }}>@ILoveAnime</p>
          </section>
        </div>
        <div id="stats">
          <p>
            <strong>Wins:</strong> 9001
          </p>
          <p>
            <strong>Losses:</strong> 378
          </p>
        </div>
      </div>
      <div id="bio">
        <p>
          <strong>Bio</strong>
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec lobortis sagittis ante vel pretium.
          Pellentesque leo odio, dignissim eu magna quis, facilisis ultricies lorem. Fusce tellus metus, aliquet eget
          odio ac, posuere cursus diam. Pellentesque non risus ipsum. Vestibulum viverra malesuada purus nec molestie.
          Nam finibus rutrum eros nec dictum. Sed id sodales ex, vel volutpat arcu.
        </p>
      </div>
      
     
    </div>
  );
}

export default ProfileInfo;
