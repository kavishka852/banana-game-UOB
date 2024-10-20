import React from "react";
import { Link } from "react-router-dom";
import "./css/FirstPage.css";

function FirstPage() {
  const title = "MuStY  BaNaNa"; 

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
    </div>
  );
}

export default FirstPage;
