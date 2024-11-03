import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./css/Profile.css";
import profilePic from "./img/image (5).png";

function Profile() {
  const navigate = useNavigate();
  const userEmail = localStorage.getItem("userEmail");
  const [userData, setUserData] = useState(null);

  const goBackToHome = () => {
    navigate("/home");
  };

  useEffect(() => {
    // Fetch user data from the backend
    const fetchUserData = async () => {
      try {
        const response = await fetch(`http://localhost:3001/user/profile/${userEmail}`);
        const data = await response.json();
        setUserData(data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [userEmail]);

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
            <img alt="Profile" className="profile-image" src={profilePic} />
          </div>
          <div className="email-det">{userEmail}</div>
          <div className="profile-info">
            {userData ? (
              <>
                <button className="profile-details">👤 Name: {userData.name || "N/A"}</button>
                <button className="profile-details">🎮 Games Played: {userData.gameplayed}</button>
                <button className="profile-details">🏆 Games Won: {userData.gamesWon}</button>
                <button className="profile-details">🔥 Best Streak: {userData.beststreak}</button>
                <button className="profile-details">⏱️ Best Time: {userData.besttime || "N/A"} seconds</button>
              </>
            ) : (
              <p>Loading profile data...</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
