// import React, { useState, useEffect } from 'react';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { useNavigate } from 'react-router-dom';
// import './css/NewGame.css';

// function DailyChallenge() {
//   const [questionImage, setQuestionImage] = useState('');
//   const [solution, setSolution] = useState(null);
//   const [userAnswer, setUserAnswer] = useState('');
//   const navigate = useNavigate();
//   const userEmail = localStorage.getItem("userEmail");

//   useEffect(() => {
//     fetchQuestion();
//   }, []);

//   const fetchQuestion = async () => {
//     try {
//       const response = await fetch('/api/uob/banana/api.php');
//       const data = await response.json();
//       setQuestionImage(data.question);
//       setSolution(data.solution);
//     } catch (error) {
//       toast.error("Failed to load question. Please try again.");
//     }
//   };

//   const handleInputChange = (e) => {
//     setUserAnswer(e.target.value);
//   };

//   const checkAnswer = async () => {
//     const isWin = parseInt(userAnswer) === solution;
//     if (isWin) {
//       toast.success('Correct answer!');
//     } else {
//       toast.error('Wrong answer!');
//     }

//     try {
//       await fetch("http://localhost:3001/user/updateStats", {
//         method: "PUT",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           email: userEmail,
//           isWin,
//         }),
//       });
//     } catch (error) {
//       toast.error("Failed to update stats.");
//     }

//     // Mark the daily challenge as played for the specific user
//     setTimeout(() => {
//       localStorage.setItem(`${userEmail}_dailyChallengePlayed`, 'true');
//       navigate("/home");
//     }, 2000);
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
//             <button className="btn btn-primary" onClick={checkAnswer}>
//               Submit Answer
//             </button>
//           </div>
//         </div>
//       ) : (
//         <p>Loading question...</p>
//       )}
//       <ToastContainer />
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
  const [fortuneData, setFortuneData] = useState([]);

  useEffect(() => {
    fetchQuestion();
    fetchFortuneData();
  }, []);

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

  const fetchFortuneData = async () => {
    try {
      const response = await fetch('https://67387cd04eb22e24fca81339.mockapi.io/Fortune');
      const data = await response.json();
      setFortuneData(data);
    } catch (error) {
      setResultMessage("Failed to load fortune data.");
    }
  };

  const handleInputChange = (e) => {
    setUserAnswer(e.target.value);
  };

  const checkAnswer = async () => {
    setIsButtonDisabled(true);

    const isWin = parseInt(userAnswer) === solution;
    if (isWin) {
      setResultMessage('Correct answer! 🎉');
    } else {
      setResultMessage('Wrong answer! 😢');
    }

    const randomFortune = fortuneData[Math.floor(Math.random() * fortuneData.length)];
    setFortuneMessage(randomFortune.message);


    setTimeout(() => {
      localStorage.setItem(`${userEmail}_dailyChallengePlayed`, 'true');
      navigate("/home");
    }, 10000);
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
        <div className="result-card-popup mt-5">
          <div className="card text-center result-card">
            <div className="card-body">
              <h5 className="card-title">Result</h5>
              <p className={`card-text ${resultMessage.includes('Correct') ? 'text-success' : 'text-danger'}`}>
                {resultMessage}
              </p>
              <div className="coin-emoji">
                {resultMessage.includes('Correct') ? '💰 You earned a coin!' : 'Better luck next time!'}
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


