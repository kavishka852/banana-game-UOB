// import React from "react";
// import { Link } from "react-router-dom";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "./Home.css";

// function Home() {
//   const userEmail = localStorage.getItem("userEmail"); // Get email from local storage
//   return (
//     <div className="home-page">
//       <nav className="navbar navbar-expand-lg navbar-custom">
//         <div className="container-fluid">
//           <Link className="navbar-brand" to="/home">
//             BANANA GAME
//           </Link>
//           <button
//             className="navbar-toggler"
//             type="button"
//             data-bs-toggle="collapse"
//             data-bs-target="#navbarNav"
//             aria-controls="navbarNav"
//             aria-expanded="false"
//             aria-label="Toggle navigation"
//           >
//             <span className="navbar-toggler-icon"></span>
//           </button>
//           <div className="collapse navbar-collapse" id="navbarNav">
//             <ul className="navbar-nav ms-auto">
//               <li className="nav-item">
//                 <Link
//                   className="nav-link active"
//                   aria-current="page"
//                   to="/home"
//                 >
//                   Home
//                 </Link>
//               </li>
//               <li className="nav-item">
//                 <Link className="nav-link" to="/newgame">
//                   New Game
//                 </Link>
//               </li>
//               <li className="nav-item">
//                 <Link className="nav-link" to="/profile">
//                   Profile
//                 </Link>
//               </li>
//               <li className="nav-item">
//                 <Link className="nav-link" to="/settings">
//                   Settings
//                 </Link>
//               </li>
//             </ul>
//           </div>
//         </div>
//       </nav>

//       <header className="header">
//         <div className="container text-center">
//           <h1>
//             Welcome, {userEmail ? userEmail : "Guest"} to Banana Game Dashboard!
//           </h1>
//           <p>Manage your games, check your stats, and enjoy new features.</p>
//         </div>
//       </header>

//       <main className="container mt-5">
//         <div className="row">
//           <div className="col-md-4 mb-4">
//             <div className="card card-stats text-white">
//               <div className="card-body text-center">
//                 <h4 className="card-title">Game Stats</h4>
//                 <p className="card-text">
//                   Track your performance and analyze your progress.
//                 </p>
//                 <Link to="/stats" className="btn btn-light">
//                   View Stats
//                 </Link>
//               </div>
//             </div>
//           </div>
//           <div className="col-md-4 mb-4">
//             <div className="card card-new-game text-white">
//               <div className="card-body text-center">
//                 <h4 className="card-title">New Games</h4>
//                 <p className="card-text">
//                   Explore new challenges and stay ahead in the game.
//                 </p>
//                 <Link to="/newgame" className="btn btn-light">
//                   Start Game
//                 </Link>
//               </div>
//             </div>
//           </div>
//           <div className="col-md-4 mb-4">
//             <div className="card card-leaderboard text-white">
//               <div className="card-body text-center">
//                 <h4 className="card-title">Leaderboard</h4>
//                 <p className="card-text">
//                   See how you rank among the top players.
//                 </p>
//                 <Link to="/leaderboard" className="btn btn-light">
//                   Check Leaderboard
//                 </Link>
//               </div>
//             </div>
//           </div>
//         </div>
//       </main>

//       <footer className="bg-dark text-white mt-5 pt-4 pb-4">
//         <div className="container">
//           <div className="row">
//             <div className="col-md-3">
//               <h5>About Banana Game</h5>
//               <p>
//                 Banana Game is the most exciting platform to challenge yourself
//                 in fun games. Stay ahead of the curve with our latest games and
//                 features.
//               </p>
//             </div>
//             <div className="col-md-3">
//               <h5>Quick Links</h5>
//               <ul className="list-unstyled">
//                 <li>
//                   <Link to="/home" className="text-white">
//                     Home
//                   </Link>
//                 </li>
//                 <li>
//                   <Link to="/newgame" className="text-white">
//                     New Game
//                   </Link>
//                 </li>
//                 <li>
//                   <Link to="/profile" className="text-white">
//                     Profile
//                   </Link>
//                 </li>
//                 <li>
//                   <Link to="/settings" className="text-white">
//                     Settings
//                   </Link>
//                 </li>
//               </ul>
//             </div>
//             <div className="col-md-3">
//               <h5>Connect with Us</h5>
//               <ul className="list-unstyled">
//                 <li>
//                   <a
//                     href="https://facebook.com"
//                     className="text-white"
//                     target="_blank"
//                     rel="noopener noreferrer"
//                   >
//                     Facebook
//                   </a>
//                 </li>
//                 <li>
//                   <a
//                     href="https://twitter.com"
//                     className="text-white"
//                     target="_blank"
//                     rel="noopener noreferrer"
//                   >
//                     Twitter
//                   </a>
//                 </li>
//                 <li>
//                   <a
//                     href="https://instagram.com"
//                     className="text-white"
//                     target="_blank"
//                     rel="noopener noreferrer"
//                   >
//                     Instagram
//                   </a>
//                 </li>
//                 <li>
//                   <a
//                     href="https://linkedin.com"
//                     className="text-white"
//                     target="_blank"
//                     rel="noopener noreferrer"
//                   >
//                     LinkedIn
//                   </a>
//                 </li>
//               </ul>
//             </div>
//             <div className="col-md-3">
//               <h5>Contact Us</h5>
//               <p>Email: support@bananagame.com</p>
//               <p>Phone: +1 234 567 890</p>
//               <p>Address: 123 Banana St, Game City, GC 10101</p>
//             </div>
//           </div>
//           <hr />
//           <div className="row">
//             <div className="col-md-12 text-center">
//               <p className="mb-0">
//                 &copy; 2024 Banana Game. All Rights Reserved.
//               </p>
//             </div>
//           </div>
//         </div>
//       </footer>
//     </div>
//   );
// }

// export default Home;
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/Home.css";
import GameLevels from "./GameLevels"; // Import GameLevels component

function Home() {
  const [showModal, setShowModal] = useState(false); // Modal state
  const navigate = useNavigate(); // Hook for navigation

  // Function to toggle modal visibility
  const toggleModal = () => {
    setShowModal(!showModal);
  };

  // Get user email from localStorage
  const userEmail = localStorage.getItem("userEmail");

  // Function to handle logout
  const handleLogout = () => {
    localStorage.removeItem("userEmail"); // Clear user email from localStorage
    navigate("/login"); // Redirect to login page
  };

  // Optional: Redirect to login if not authenticated
  useEffect(() => {
    if (!userEmail) {
      navigate("/login");
    }
  }, [userEmail, navigate]);

  return (
    <div className="home-page">
      <nav className="navbar navbar-expand-lg navbar-custom">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/home">
            🍌 BANANA GAME
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link className="nav-link active" to="/home">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <button className="nav-link btn btn-link" onClick={toggleModal}>
                  New Game
                </button>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/profile">
                  Profile
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/settings">
                  Settings
                </Link>
              </li>
              {/* Logout button */}
              <li className="nav-item">
                <button className="nav-link btn btn-link" onClick={handleLogout}>
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <header className="header text-center">
        <h1>🍌 Welcome, {userEmail ? userEmail : "Player"} to Banana Game!</h1>
        <p>Let the fun begin! Track your games, stats, and enjoy new challenges.</p>
      </header>

      <main className="container mt-5">
        <div className="row">
          <div className="col-md-4 mb-4">
            <div className="card card-stats text-white">
              <div className="card-body text-center">
                <h4 className="card-title">Game Stats</h4>
                <p className="card-text">Track your performance and progress.</p>
                <Link to="/stats" className="btn btn-light btn-banana">
                  View Stats
                </Link>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div className="card card-new-game text-white">
              <div className="card-body text-center">
                <h4 className="card-title">New Games</h4>
                <p className="card-text">Discover new challenges and games.</p>
                <button className="btn btn-light btn-banana" onClick={toggleModal}>
                  Start Game
                </button>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div className="card card-leaderboard text-white">
              <div className="card-body text-center">
                <h4 className="card-title">Leaderboard</h4>
                <p className="card-text">Check out the top players.</p>
                <Link to="/leaderboard" className="btn btn-light btn-banana">
                  Check Leaderboard
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Modal for Game Levels */}
      {showModal && (
        <div className="modal d-block" tabIndex="-1" role="dialog">
          <div className="modal-dialog modal-lg" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Choose Your Game Level</h5>
                <button
                  type="button"
                  className="btn-close"
                  aria-label="Close"
                  onClick={toggleModal}
                ></button>
              </div>
              <div className="modal-body">
                <GameLevels /> {/* Load the GameLevels component inside the modal */}
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={toggleModal}>
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <footer className="bg-dark text-white mt-5 pt-4 pb-4">
        <div className="container">
          <div className="row">
            <div className="col-md-3">
              <h5>About Banana Game</h5>
              <p>
                Banana Game is the best place to enjoy mini-games. Challenge
                yourself and friends!
              </p>
            </div>
            <div className="col-md-3">
              <h5>Quick Links</h5>
              <ul className="list-unstyled">
                <li>
                  <Link to="/home" className="text-white">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/levels" className="text-white">
                    New Game
                  </Link>
                </li>
                <li>
                  <Link to="/profile" className="text-white">
                    Profile
                  </Link>
                </li>
                <li>
                  <Link to="/settings" className="text-white">
                    Settings
                  </Link>
                </li>
              </ul>
            </div>
            <div className="col-md-3">
              <h5>Connect with Us</h5>
              <ul className="list-unstyled">
                <li>
                  <a
                    href="https://facebook.com"
                    className="text-white"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Facebook
                  </a>
                </li>
                <li>
                  <a
                    href="https://twitter.com"
                    className="text-white"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Twitter
                  </a>
                </li>
                <li>
                  <a
                    href="https://instagram.com"
                    className="text-white"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Instagram
                  </a>
                </li>
              </ul>
            </div>
            <div className="col-md-3">
              <h5>Contact Us</h5>
              <p>Email: support@bananagame.com</p>
              <p>Phone: +94 719064726</p>
              <p>Address: 123 Banana St, Colombo</p>
            </div>
          </div>
          <hr />
          <div className="row">
            <div className="col-md-12 text-center">
              <p className="mb-0">&copy; 2024 Banana Game. All Rights Reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Home;
