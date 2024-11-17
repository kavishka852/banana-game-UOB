import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";  
import "react-toastify/dist/ReactToastify.css";
import "./css/Home.css";
import GameLevels from "./GameLevels";

function Home() {
  const navigate = useNavigate();
  const userEmail = localStorage.getItem("userEmail");
  const [showModal, setShowModal] = useState(false);
  const [isFortuneDisabled, setIsFortuneDisabled] = useState(false);

  useEffect(() => {
    const played = localStorage.getItem(`${userEmail}_dailyChallengePlayed`);
    if (played === 'true') {
      setIsFortuneDisabled(true);
    }
  }, [userEmail]);

  const handleLogout = () => {
    localStorage.removeItem("userEmail");
    localStorage.removeItem(`${userEmail}_dailyChallengePlayed`);
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");
    navigate("/login");
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const handleFortuneClick = () => {
    const played = localStorage.getItem(`${userEmail}_dailyChallengePlayed`);
    if (played === 'true') {
      toast.info("You Already Played the Daily Challenge!");  
      console.log("Plyed");
    } else {
      navigate("/dailychallenge");
    }
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
                <GameLevels />
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

      <div className="fortune-box">
        <button
          className="fortune-btn"
          onClick={handleFortuneClick} 
          // disabled={isFortuneDisabled}
        >
          🎰
        </button>
      </div>

      <ToastContainer /> 
    </div>
  );
}

export default Home;
