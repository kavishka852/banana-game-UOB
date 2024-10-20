import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import "./css/LeaderBoard.css";

function LeaderBoard() {
  const navigate = useNavigate(); // Initialize the navigate function

  const goBackToHome = () => {
    navigate("/home"); // Navigate to the home page
  };

  const players = [
    { rank: 1, name: "John Doe", score: 500 },
    { rank: 2, name: "Jane Smith", score: 450 },
    { rank: 3, name: "Mike Johnson", score: 400 },
    { rank: 4, name: "Chris Lee", score: 350 },
    { rank: 5, name: "Kate Brown", score: 300 },
  ];

  return (
    <div className="leaderboard-container">
      <div className="back-button" onClick={goBackToHome}>
        ←
      </div>
      <div className="overlay"></div>
      <div className="instruction-box">
        <h1 className="leaderboard-title">🏆 Leaderboard</h1>

        <div className="leaderboard-card">
          {players.map((player, index) => (
            <div className="player-card" key={index}>
              <div className="player-rank">#{player.rank}</div>
              <div className="player-info">
                <span className="player-name">{player.name}</span>
                <span className="player-score">{player.score} pts</span>
              </div>
              <div className="rank-badge-container">
                {player.rank === 1 && (
                  <span className="rank-badge gold">🥇</span>
                )}
                {player.rank === 2 && (
                  <span className="rank-badge silver">🥈</span>
                )}
                {player.rank === 3 && (
                  <span className="rank-badge bronze">🥉</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default LeaderBoard;
