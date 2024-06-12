import "./ProfileInfo.css";
import React, { useState, useEffect } from "react";
import axios from "axios";

function ProfileInfo() {
  const [profile, setProfile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    bio: "",
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const uid = sessionStorage.getItem('uid');
        const response = await axios.get(`http://localhost:3100/api/register/${uid}`);
        setProfile(response.data);
        setFormData({
          username: response.data.username,
          bio: response.data.bio,
        });
        console.log("Registered users data: ", response.data);
      } catch (error) {
        console.error("Error occurred while fetching profile:", error.message);
      }
    };

    fetchProfile();
  }, []);

  const handleEditButtonClick = () => {
    setIsEditing(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const uid = sessionStorage.getItem('uid');
      await axios.post(`http://localhost:3100/api/register/${uid}`, {
        username: formData.username,
        bio: formData.bio,
      });
      setProfile((prevProfile) => ({
        ...prevProfile,
        username: formData.username,
        bio: formData.bio,
      }));
      setIsEditing(false);
    } catch (error) {
      console.error("Error occurred while updating profile:", error.message);
    }
  };

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
        <button className="edit-button" onClick={handleEditButtonClick}>Edit Profile</button>
      </div>

      {isEditing && (
        <div className="modal">
          <div className="modal-content">
            <span className="close-button" onClick={() => setIsEditing(false)}>&times;</span>
            <form onSubmit={handleFormSubmit}>
              <label>
                Username:
                <input type="text" name="username" value={formData.username} onChange={handleInputChange} />
              </label>
              <label>
                Bio:
                <textarea name="bio" value={formData.bio} onChange={handleInputChange} />
              </label>
              <button type="submit">Save</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProfileInfo;
