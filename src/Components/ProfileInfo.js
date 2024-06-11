import "./ProfileInfo.css";
import profilePic from "../Images/anime-woman.png";
import React, { useState, useEffect } from "react";
import axios from "axios";

function ProfileInfo() {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const uid = sessionStorage.getItem('uid');
        const response = await axios.get(`http://localhost:3100/api/register/${uid}`); // Assuming your API endpoint is /api/users/:uid
        setProfile(response.data);
        console.log("Registered users data: ", response.data);
      } catch (error) {
        console.error("Error occurred while fetching profile:", error.message);
      }
    };

    fetchProfile();
  }, []);

  if (!profile) {
    return <div>Loading...</div>;
  }

  return (
    <div className="ProfilePage">
      <div id="profileBox">
        <div id="user-details">
          <div id="user-info">
            <img src={profile.displayPicture} alt="profile pic"></img>
            <section>
              <p>
                <strong>{profile.name}</strong>
              </p>
              <p style={{ color: "#9e9d9d" }}>@{profile.username}</p>
            </section>
          </div>
          <div id="stats">
            <p>
              <strong>Badges:</strong> {profile.badges}
            </p>
            <p>
              <strong>Wins: </strong> {profile.win}
            </p>
            <p>
              <strong>Losses:</strong> {profile.lose}
            </p>
          </div>
        </div>
        <div id="bio">
          <p>
            <strong>Bio</strong>
          </p>
          <p>{profile.bio}</p>
        </div>
      </div>
    </div>
  );
}

export default ProfileInfo;
