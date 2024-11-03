import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./css/LeaderBoard.css";

function LeaderBoard() {
  const navigate = useNavigate();
  const [players, setPlayers] = useState([]);

  const goBackToHome = () => {
    navigate("/home");
  };

  // Fetch leaderboard data from the server
  useEffect(() => {
    fetch("http://localhost:3001/leaderboard")
      .then(response => response.json())
      .then(data => {
        // Map data to include ranks
        const rankedPlayers = data.map((player, index) => ({
          rank: index + 1,
          name: player.email, // Assuming name is stored as email; replace if there's a `name` field
          score: player.gamesWon,
        }));
        setPlayers(rankedPlayers);
      })
      .catch(err => console.error("Error fetching leaderboard data:", err));
  }, []);

  return (
    <div className="leaderboard-container">
      <div className="back-button" onClick={goBackToHome}>
        ←
      </div>
      <div className="overlay"></div>
      <div className="instruction-box">
        <h1 className="leaderboard-title">🏆 Leaderboard</h1>

        <div className="leaderboard-card">
          {players.map((player) => (
            <div className="player-card" key={player.rank}>
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
