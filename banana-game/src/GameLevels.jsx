import React from "react";
import "./GameLevels.css"; // Add your styles here

const GameLevels = () => {
  return (
    <div className="game-levels">
      <div className="container">
        <h2 className="text-center">Select Game Level</h2>
        <div className="row">
          <div className="col-md-4 mb-4">
            <div className="card level-card text-white easy-card">
              <div className="card-body text-center">
                <h4 className="card-title">Easy</h4>
                <p className="card-text">
                  A relaxed gameplay experience for beginners.
                </p>
                <button className="btn btn-light">Play Easy</button>
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
                <button className="btn btn-light">Play Medium</button>
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
                <button className="btn btn-light">Play Hard</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameLevels;
