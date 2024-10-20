import React from "react";
import { useNavigate } from "react-router-dom";
import "./css/Profile.css";
import profilePic from "./img/image (5).png"; 

function Profile() {
  const navigate = useNavigate();
  const userEmail = localStorage.getItem("userEmail");

  const goBackToHome = () => {
    navigate("/home");
  };

  return (
    <div className="profile-container">
      <div className="overlay"></div>
      
      <div className="back-button" onClick={goBackToHome}>
        ← 
      </div>

      <div className="profile-box">
        <div className="game-title">MuStY BaNaNa Profile</div>
        <div className="menu-container">
          <div className="profile-image-container">
            <img
              alt="Profile"
              className="profile-image"
              src={profilePic} // Using the imported image
            />
          </div>
          <div className="email-det">{userEmail}</div>
          <div className="profile-info">
            <button className="profile-details">👤 Name: John Doe</button>
            <button className="profile-details">🎮 Games Played: 50</button>
            <button className="profile-details">🏆 Games Won: 30</button>
            <button className="profile-details">🔥 Best Streak: 10</button>
            <button className="profile-details">⏱️ Best Time: 2m 30s</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
