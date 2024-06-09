import React from "react";
import ProfileInfo from "../Components/ProfileInfo";
import Matchup from '../Components/Matchup';
function Profile() {
  return (
    <div style={{padding: '4rem'}}>
      <ProfileInfo />
      <Matchup />
    </div>
  );
  
}

export default Profile;
