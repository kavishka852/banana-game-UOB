import React from "react";
import "./css/GameLevels.css"; 
import { Link } from "react-router-dom";

const GameLevels = () => {
  return (
      <div className="container">
        <h2 id="level-title" className="text-center">Select Game Level</h2>
        <div className="row">
          <div className="col-md-4 mb-4">
            <div className="card level-card text-white easy-card">
              <div className="card-body text-center">
                <h4 className="card-title">Easy</h4>
                <p className="card-text">
                  A relaxed gameplay experience for beginners.
                </p>
                <Link to="/newgame?difficulty=easy" className="btn btn-light">
                   Play Easy
                </Link>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div className="card level-card text-white medium-card">
              <div className="card-body text-center">
                <h4 className="card-title">Medium</h4>
                <p className="card-text">
                  A balanced challenge for intermediate players.
                </p>
                <Link to="/newgame?difficulty=medium" className="btn btn-light">
                   Play Medium
                </Link>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div className="card level-card text-white hard-card">
              <div className="card-body text-center">
                <h4 className="card-title">Hard</h4>
                <p className="card-text">
                  A tough challenge for experienced players.
                </p>
                <Link to="/newgame?difficulty=hard" className="btn btn-light">
                   Play Hard
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};

export default GameLevels;
