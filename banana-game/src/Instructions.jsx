import React from "react";
import { useNavigate } from "react-router-dom";
import "./css/Instructions.css";
import profilePic from "./img/image (5).png"; 

function Instructions() {
    const navigate = useNavigate();
  
    const goBackToHome = () => {
      navigate("/home");
    };

  return (
    <div className="profile-container">
      <div className="overlay"></div>
      
      <div className="back-button" onClick={goBackToHome}>
        ← 
      </div>
      
      <div className="instruction-box">
        <div className="gameins-title">How to Play!</div>
        
        <div className="instruction-content">
          <ol className="instruction-list">
            <li>📝 Firstly, Sign up for the game.</li>
            <li>🔐 Login using your credentials.</li>
            <li>🎮 Select a game mode from the available options.</li>
            <li>🕹️ Follow the on-screen instructions to start playing.</li>
            <li>💡 Tip: Keep an eye on your timer to improve your streaks!</li>
            <li>🏆 Try to beat your best time and streak record.</li>
          </ol>
        </div>

        <div className="profile-image-container">
          <img alt="Profile" className="profile-image" src={profilePic} />
        </div>
      </div>
    </div>
  );
}

export default Instructions;
