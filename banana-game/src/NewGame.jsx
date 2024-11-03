// import React, { useState, useEffect } from 'react';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { useSearchParams } from 'react-router-dom';
// import { FaRedo } from 'react-icons/fa';
// import './css/NewGame.css';

// function NewGame() {
//   const [questionImage, setQuestionImage] = useState('');
//   const [solution, setSolution] = useState(null);
//   const [userAnswer, setUserAnswer] = useState('');
//   const [timeLeft, setTimeLeft] = useState(0);
//   const [isTimeUp, setIsTimeUp] = useState(false); // Track if time is up
//   const [blink, setBlink] = useState(false); // Track blinking effect
//   const [searchParams] = useSearchParams();

//   // Fetch the question when the component mounts
//   useEffect(() => {
//     fetchQuestion();
//   }, []);

//   // Set timer based on the difficulty level
//   useEffect(() => {
//     const difficulty = searchParams.get('difficulty');
//     let initialTime;

//     if (difficulty === 'easy') {
//       initialTime = 50;
//     } else if (difficulty === 'medium') {
//       initialTime = 20;
//     } else if (difficulty === 'hard') {
//       initialTime = 10;
//     }

//     startTimer(initialTime);
//   }, [searchParams]);

//   const startTimer = (initialTime) => {
//     setTimeLeft(initialTime);
//     setIsTimeUp(false);
//     setBlink(false);
//     setUserAnswer(''); // Clear user answer

//     // Start countdown timer
//     const timer = setInterval(() => {
//       setTimeLeft((prevTime) => {
//         if (prevTime > 0) {
//           return prevTime - 1;
//         } else {
//           setIsTimeUp(true);
//           setBlink(true); // Enable blinking when time is up
//           clearInterval(timer);
//           return 0;
//         }
//       });
//     }, 1000);

//     // Clear the interval when the component unmounts
//     return () => clearInterval(timer);
//   };

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

//   const checkAnswer = () => {
//     if (isTimeUp) {
//       toast.error('Time is up! Cannot submit answer.');
//       return;
//     }

//     if (parseInt(userAnswer) === solution) {
//       toast.success('Correct answer!');
//     } else {
//       toast.error('Wrong answer. Try again!');
//     }
//   };

//   const restartGame = () => {
//     setUserAnswer('');
//     fetchQuestion(); // Fetch a new question
//     const difficulty = searchParams.get('difficulty');
//     let initialTime;

//     if (difficulty === 'easy') {
//       initialTime = 50;
//     } else if (difficulty === 'medium') {
//       initialTime = 20;
//     } else if (difficulty === 'hard') {
//       initialTime = 10;
//     }

//     startTimer(initialTime); // Restart the timer
//   };

//   return (
//     <div className="new-game-page container text-center mt-5">
//       <h2>New Game</h2>

//       {questionImage ? (
//         <div className="question-section">
//           <img src={questionImage} alt="Question" className="img-fluid mb-4" />

//           {/* Timer Display */}
//           <div className={`timer ${isTimeUp ? 'time-up' : ''} ${blink ? 'blink' : ''}`}>
//             <h4>Time Left: <span>{isTimeUp ? "Time is up!" : `${timeLeft} seconds`}</span></h4>
//           </div>

//           <div className="answer-section">
//             <input
//               type="text"
//               className="form-control mb-3"
//               placeholder="Enter your answer"
//               value={userAnswer}
//               onChange={handleInputChange}
//               disabled={isTimeUp} // Disable input if time is up
//             />

//             <button className="btn btn-primary" onClick={checkAnswer} disabled={isTimeUp}>
//               Submit Answer
//             </button>

//             {isTimeUp && (
//               <button className="replay-button" onClick={restartGame}>
//                 <FaRedo /> {/* Using the imported icon */}
//                 Replay
//               </button>
//             )}
//           </div>
//         </div>
//       ) : (
//         <p>Loading question...</p>
//       )}

//       <ToastContainer />
//     </div>
//   );
// }

// export default NewGame;
import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSearchParams } from 'react-router-dom';
import { FaRedo } from 'react-icons/fa';
import './css/NewGame.css';

function NewGame() {
  const [questionImage, setQuestionImage] = useState('');
  const [solution, setSolution] = useState(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [timeLeft, setTimeLeft] = useState(0);
  const [isTimeUp, setIsTimeUp] = useState(false);
  const [blink, setBlink] = useState(false);
  const [searchParams] = useSearchParams();
  const [difficultyTimes, setDifficultyTimes] = useState({});
  const userEmail = localStorage.getItem("userEmail");

  useEffect(() => {
    fetchLevels(); // Fetch difficulty levels from the server
    fetchQuestion();
  }, []);

  const fetchLevels = async () => {
    try {
      const response = await fetch("http://localhost:3001/levels");
      const data = await response.json();
      const times = data.reduce((acc, level) => {
        acc[level.difficulty] = level.leveltime;
        return acc;
      }, {});
      setDifficultyTimes(times);
      const difficulty = searchParams.get("difficulty");
      startTimer(times[difficulty]);
    } catch (error) {
      toast.error("Failed to load difficulty levels. Please try again.");
    }
  };

  const startTimer = (initialTime) => {
    setTimeLeft(initialTime);
    setIsTimeUp(false);
    setBlink(false);
    setUserAnswer('');

    // Clear any existing interval
    if (window.timerInterval) clearInterval(window.timerInterval);

    // Start a new countdown interval
    window.timerInterval = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime > 0) {
          return prevTime - 1;
        } else {
          setIsTimeUp(true);
          setBlink(true);
          clearInterval(window.timerInterval); // Clear interval when time is up
          return 0;
        }
      });
    }, 1000);
  };

  useEffect(() => {
    // Cleanup interval on component unmount
    return () => clearInterval(window.timerInterval);
  }, []);

  const fetchQuestion = async () => {
    try {
      const response = await fetch('/api/uob/banana/api.php');
      const data = await response.json();
      setQuestionImage(data.question);
      setSolution(data.solution);
    } catch (error) {
      toast.error("Failed to load question. Please try again.");
    }
  };

  const handleInputChange = (e) => {
    setUserAnswer(e.target.value);
  };

  const checkAnswer = async () => {
    if (isTimeUp) {
        toast.error('Time is up! Cannot submit answer.');
        return;
    }

    const isWin = parseInt(userAnswer) === solution;
    if (isWin) {
        toast.success('Correct answer!');
        clearInterval(window.timerInterval); // Stop the timer
        setTimeout(restartGame, 2000); // Load a new game after 2 seconds
    } else {
        toast.error('Wrong answer. Try again!');
    }

    try {
        await fetch("http://localhost:3001/updateStats", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                email: userEmail, // Pass the email directly as a string
                isWin: isWin,
                timeTaken: isWin ? timeLeft : null, // Only send timeLeft if the answer is correct
            }),
        });
    } catch (error) {
        toast.error("Failed to update game stats. Please try again.");
    }
  };

  const restartGame = () => {
    setUserAnswer('');
    fetchQuestion();
    const difficulty = searchParams.get("difficulty");
    startTimer(difficultyTimes[difficulty]);
  };


  return (
    <div className="new-game-page container text-center mt-5">
      <h2>New Game</h2>
      {questionImage ? (
        <div className="question-section">
          <img src={questionImage} alt="Question" className="img-fluid mb-4" />
          <div className={`timer ${isTimeUp ? 'time-up' : ''} ${blink ? 'blink' : ''}`}>
            <h4>Time Left: <span>{isTimeUp ? "Time is up!" : `${timeLeft} seconds`}</span></h4>
          </div>
          <div className="answer-section">
            <input
              type="text"
              className="form-control mb-3"
              placeholder="Enter your answer"
              value={userAnswer}
              onChange={handleInputChange}
              disabled={isTimeUp}
            />
            <button className="btn btn-primary" onClick={checkAnswer} disabled={isTimeUp}>
              Submit Answer
            </button>
            {isTimeUp && (
              <button className="replay-button" onClick={restartGame}>
                <FaRedo /> Replay
              </button>
            )}
          </div>
        </div>
      ) : (
        <p>Loading question...</p>
      )}
      <ToastContainer />
    </div>
  );
}

export default NewGame;
