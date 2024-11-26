// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import './css/NewGame.css';

// function DailyChallenge() {
//   const [questionImage, setQuestionImage] = useState('');
//   const [solution, setSolution] = useState(null);
//   const [userAnswer, setUserAnswer] = useState('');
//   const [resultMessage, setResultMessage] = useState('');
//   const [fortuneMessage, setFortuneMessage] = useState('');
//   const [isButtonDisabled, setIsButtonDisabled] = useState(false);
//   const navigate = useNavigate();
//   const userEmail = localStorage.getItem("userEmail");
//   const [fortuneData, setFortuneData] = useState([]);

//   useEffect(() => {
//     fetchQuestion();
//     fetchFortuneData();
//   }, []);

//   const fetchQuestion = async () => {
//     try {
//       const response = await fetch('/api/uob/banana/api.php');
//       const data = await response.json();
//       setQuestionImage(data.question);
//       setSolution(data.solution);
//     } catch (error) {
//       setResultMessage("Failed to load question. Please try again.");
//     }
//   };

//   //Outsorce Api for daily challenge rewards
//   const fetchFortuneData = async () => {
//     try {
//       const response = await fetch('https://67387cd04eb22e24fca81339.mockapi.io/Fortune'); 
//       const data = await response.json();
//       setFortuneData(data);
//     } catch (error) {
//       setResultMessage("Failed to load fortune data.");
//     }
//   };

//   const handleInputChange = (e) => {
//     setUserAnswer(e.target.value);
//   };

//   const checkAnswer = async () => {
//     setIsButtonDisabled(true);

//     const isWin = parseInt(userAnswer) === solution;
//     if (isWin) {
//       setResultMessage('Correct answer! 🎉');
//     } else {
//       setResultMessage('Wrong answer! 😢');
//     }

//     const randomFortune = fortuneData[Math.floor(Math.random() * fortuneData.length)];
//     setFortuneMessage(randomFortune.message);


//     setTimeout(() => {
//       localStorage.setItem(`${userEmail}_dailyChallengePlayed`, 'true');
//       navigate("/home");
//     }, 10000);
//   };

//   return (
//     <div className="new-game-page container text-center mt-5">
//       <h2>Daily Challenge</h2>
//       {questionImage ? (
//         <div className="question-section">
//           <img src={questionImage} alt="Question" className="img-fluid mb-4" />
//           <div className="answer-section">
//             <input
//               type="text"
//               className="form-control mb-3"
//               placeholder="Enter your answer"
//               value={userAnswer}
//               onChange={handleInputChange}
//             />
//             <button
//               className="btn btn-primary"
//               onClick={checkAnswer}
//               disabled={isButtonDisabled}
//             >
//               Submit Answer
//             </button>
//           </div>
//         </div>
//       ) : (
//         <p>Loading question...</p>
//       )}

//       {/* Result Card */}
//       {resultMessage && (
//         <div className="result-card-popup mt-5">
//           <div className="card text-center result-card">
//             <div className="card-body">
//               <h5 className="card-title">Result</h5>
//               <p className={`card-text ${resultMessage.includes('Correct') ? 'text-success' : 'text-danger'}`}>
//                 {resultMessage}
//               </p>
//               <div className="coin-emoji">
//                 {resultMessage.includes('Correct') ? '💰 You earned a coin!' : 'Better luck next time!'}
//               </div>
//               <p className="card-text">{fortuneMessage}</p>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default DailyChallenge;

// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import './css/NewGame.css';

// function DailyChallenge() {
//   const [questionImage, setQuestionImage] = useState('');
//   const [solution, setSolution] = useState(null);
//   const [userAnswer, setUserAnswer] = useState('');
//   const [resultMessage, setResultMessage] = useState('');
//   const [fortuneMessage, setFortuneMessage] = useState('');
//   const [isButtonDisabled, setIsButtonDisabled] = useState(false);
//   const navigate = useNavigate();
//   const userEmail = localStorage.getItem("userEmail");
//   const [fortuneData, setFortuneData] = useState({ success: [], failure: [] });

//   useEffect(() => {
//     fetchQuestion();
//     fetchFortuneData();
//   }, []);

//   // Fetch the daily challenge question
//   const fetchQuestion = async () => {
//     try {
//       const response = await fetch('/api/uob/banana/api.php');
//       const data = await response.json();
//       setQuestionImage(data.question);
//       setSolution(data.solution);
//     } catch (error) {
//       setResultMessage("Failed to load question. Please try again.");
//     }
//   };

//   // Fetch fortune data from the API and categorize it into success and failure
//   const fetchFortuneData = async () => {
//     try {
//       const response = await fetch('https://67387cd04eb22e24fca81339.mockapi.io/Fortune');
//       const data = await response.json();

//       const successfulFortunes = data.filter((fortune) => fortune.success);
//       const failureFortunes = data.filter((fortune) => !fortune.success);

//       setFortuneData({ success: successfulFortunes, failure: failureFortunes });
//     } catch (error) {
//       setResultMessage("Failed to load fortune data.");
//     }
//   };

//   const handleInputChange = (e) => {
//     setUserAnswer(e.target.value);
//   };

//   const checkAnswer = async () => {
//     setIsButtonDisabled(true);

//     const isWin = parseInt(userAnswer) === solution;
//     setResultMessage(isWin ? 'Correct answer! 🎉' : 'Wrong answer! 😢');

//     // Select a fortune message based on the result
//     if (fortuneData.success.length > 0 && fortuneData.failure.length > 0) {
//       const randomFortune = isWin
//         ? fortuneData.success[Math.floor(Math.random() * fortuneData.success.length)]
//         : fortuneData.failure[Math.floor(Math.random() * fortuneData.failure.length)];

//       setFortuneMessage(randomFortune.message);
//     } else {
//       setFortuneMessage('Fortune data is not available at the moment.');
//     }

//     // Redirect to home after a delay
//     setTimeout(() => {
//       localStorage.setItem(`${userEmail}_dailyChallengePlayed`, 'true');
//       navigate("/home");
//     }, 10000);
//   };

//   return (
//     <div className="new-game-page container text-center mt-5">
//       <h2>Daily Challenge</h2>
//       {questionImage ? (
//         <div className="question-section">
//           <img src={questionImage} alt="Question" className="img-fluid mb-4" />
//           <div className="answer-section">
//             <input
//               type="text"
//               className="form-control mb-3"
//               placeholder="Enter your answer"
//               value={userAnswer}
//               onChange={handleInputChange}
//             />
//             <button
//               className="btn btn-primary"
//               onClick={checkAnswer}
//               disabled={isButtonDisabled}
//             >
//               Submit Answer
//             </button>
//           </div>
//         </div>
//       ) : (
//         <p>Loading question...</p>
//       )}

//       {/* Result Card */}
//       {resultMessage && (
//   <div className="result-card-popup">
//     <div className="result-card">
//       <div className="card-body">
//         {/* Confetti Animation */}
//         <div className="confetti-container">
//           {Array.from({ length: 20 }).map((_, index) => (
//             <div
//               key={index}
//               className="confetti"
//               style={{
//                 left: `${Math.random() * 100}%`,
//                 backgroundColor: `hsl(${Math.random() * 360}, 100%, 70%)`,
//                 animationDelay: `${Math.random() * 3}s`,
//               }}
//             ></div>
//           ))}
//         </div>

//         <h5 className="card-title">Result</h5>
//         <p
//           className={`card-text ${
//             resultMessage.includes("Correct") ? "text-success" : "text-danger"
//           }`}
//         >
//           {resultMessage}
//         </p>
//         <div className="coin-animation">
//           {resultMessage.includes("Correct") ? "💰  You earned a coins!" : "😢 Better luck next time!"}
//         </div>
//         <p className="card-text">{fortuneMessage}</p>
//       </div>
//     </div>
//   </div>
// )}
//     </div>
//   );
// }

// export default DailyChallenge;
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './css/NewGame.css';

function DailyChallenge() {
  const [questionImage, setQuestionImage] = useState('');
  const [solution, setSolution] = useState(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [resultMessage, setResultMessage] = useState('');
  const [fortuneMessage, setFortuneMessage] = useState('');
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const navigate = useNavigate();
  const userEmail = localStorage.getItem("userEmail");
  const [fortuneData, setFortuneData] = useState({ success: [], failure: [] });

  useEffect(() => {
    fetchQuestion();
    fetchFortuneData();
  }, []);

  // Fetch the daily challenge question
  const fetchQuestion = async () => {
    try {
      const response = await fetch('/api/uob/banana/api.php');
      const data = await response.json();
      setQuestionImage(data.question);
      setSolution(data.solution);
    } catch (error) {
      setResultMessage("Failed to load question. Please try again.");
    }
  };

  // Fetch fortune data from the API
  const fetchFortuneData = async () => {
    try {
      const response = await fetch('https://67387cd04eb22e24fca81339.mockapi.io/Fortune');
      const data = await response.json();

      const successfulFortunes = data.filter((fortune) => fortune.success);
      const failureFortunes = data.filter((fortune) => !fortune.success);

      setFortuneData({ success: successfulFortunes, failure: failureFortunes });
    } catch (error) {
      setResultMessage("Failed to load fortune data.");
    }
  };

  // Function to update coins in the backend
  const updateCoinsForUser = async (email, coins) => {
    try {
      const token = localStorage.getItem("authToken");
    
      const response = await fetch("http://localhost:3001/user/updateCoins", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ email, coinsEarned: coins }),
      });
      const data = await response.json();
      if (response.ok) {
        console.log("Coins updated:", data.totalCoins);
      } else {
        console.error("Failed to update coins:", data.message);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  

  // Check the user's answer and update the coins
  const checkAnswer = async () => {
    setIsButtonDisabled(true);

    const isWin = parseInt(userAnswer) === solution;
    setResultMessage(isWin ? 'Correct answer! 🎉' : 'Wrong answer! 😢');

    // Select a fortune message based on the result
    if (fortuneData.success.length > 0 && fortuneData.failure.length > 0) {
      const randomFortune = isWin
        ? fortuneData.success[Math.floor(Math.random() * fortuneData.success.length)]
        : fortuneData.failure[Math.floor(Math.random() * fortuneData.failure.length)];

      setFortuneMessage(randomFortune.message);

      // If the outcome is successful, update the user's coins
      if (randomFortune.success) {
        await updateCoinsForUser(userEmail, randomFortune.outcome); // Update database with coins
      }
    } else {
      setFortuneMessage('Fortune data is not available at the moment.');
    }

    // Redirect to home after a delay
    setTimeout(() => {
      localStorage.setItem(`${userEmail}_dailyChallengePlayed`, 'true');
      navigate("/home");
    }, 10000);
  };

  const handleInputChange = (e) => {
    setUserAnswer(e.target.value);
  };

  return (
    <div className="new-game-page container text-center mt-5">
      <h2>Daily Challenge</h2>
      {questionImage ? (
        <div className="question-section">
          <img src={questionImage} alt="Question" className="img-fluid mb-4" />
          <div className="answer-section">
            <input
              type="text"
              className="form-control mb-3"
              placeholder="Enter your answer"
              value={userAnswer}
              onChange={handleInputChange}
            />
            <button
              className="btn btn-primary"
              onClick={checkAnswer}
              disabled={isButtonDisabled}
            >
              Submit Answer
            </button>
          </div>
        </div>
      ) : (
        <p>Loading question...</p>
      )}

      {/* Result Card */}
      {resultMessage && (
        <div className="result-card-popup">
          <div className="result-card">
            <div className="card-body">
              {/* Confetti Animation */}
              <div className="confetti-container">
                {Array.from({ length: 20 }).map((_, index) => (
                  <div
                    key={index}
                    className="confetti"
                    style={{
                      left: `${Math.random() * 100}%`,
                      backgroundColor: `hsl(${Math.random() * 360}, 100%, 70%)`,
                      animationDelay: `${Math.random() * 3}s`,
                    }}
                  ></div>
                ))}
              </div>

              <h5 className="card-title">Result</h5>
              <p
                className={`card-text ${
                  resultMessage.includes("Correct") ? "text-success" : "text-danger"
                }`}
              >
                {resultMessage}
              </p>
              <div className="coin-animation">
                {resultMessage.includes("Correct")
                  ? "💰 You earned coins!"
                  : "😢 Better luck next time!"}
              </div>
              <p className="card-text">{fortuneMessage}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default DailyChallenge;
