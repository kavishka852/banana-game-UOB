import React from "react";
import { Link } from "react-router-dom";
import "./css/FirstPage.css";
import { useNavigate } from "react-router-dom"; 

function FirstPage() {
  const title = "MuStY  BaNaNa";
  const navigate = useNavigate();

  const handleQuestionMarkClick = () => {
    navigate("/instructions");
  };

  return (
    <div className="game-container1">
      <h1 className="game-title">
        {title.split("").map((char, index) => (
          <span key={index} style={{ transform: `rotate(${index * 5 - 25}deg)` }}>
            {char}
          </span>
        ))}
      </h1>
      <Link to="/login" className="play-button">PLAY GAME</Link>

      <div 
        className="question-mark" 
        onClick={handleQuestionMarkClick} 
        title="How To Play!" 
      >
        ❓
      </div>
    </div>
  );
}

export default FirstPage;
