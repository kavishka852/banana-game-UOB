import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./css/Home.css";
import GameLevels from "./GameLevels"; // Import GameLevels component

function Home() {
  const navigate = useNavigate();
  const userEmail = localStorage.getItem("userEmail");

  // Modal state
  const [showModal, setShowModal] = useState(false);

  // Function to handle logout
  const handleLogout = () => {
    localStorage.removeItem("userEmail");
    navigate("/login");
  };

  // Function to toggle modal visibility
  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <div className="game-container">
      <div className="overlay"></div>

      <div className="login-box">
        <div className="game-title">MuStY BaNaNa</div>
        <div className="game-input">Welcome, {userEmail}</div>

        <div className="menu-container">
          <button className="game-btn" onClick={toggleModal}>
            New Game
          </button>
          <button className="game-btn" onClick={() => navigate("/profile")}>
            Profile
          </button>
          <button className="game-btn" onClick={() => navigate("/instructions")}>
            How To Play
          </button>
          <button className="game-btn" onClick={() => navigate("/leaderboard")}>
            LeaderBoard
          </button>
        </div>

        <button className="game-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>

      {showModal && (
        <div className="modal d-block" tabIndex="-1" role="dialog">
          <div className="modal-dialog modal-lg" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <button
                  type="button"
                  className="btn-close"
                  aria-label="Close"
                  onClick={toggleModal}
                ></button>
              </div>
              <div className="modal-body">
                <GameLevels />{" "}
                {/* Load the GameLevels component inside the modal */}
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={toggleModal}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
