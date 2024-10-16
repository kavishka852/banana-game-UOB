import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { useLocation } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import './css/NewGame.css'; 

function NewGame() {
  const [questionImage, setQuestionImage] = useState('');
  const [solution, setSolution] = useState(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [timeLeft, setTimeLeft] = useState(0);

  const location = useLocation();
  
  // Extract difficulty from query parameter
  const queryParams = new URLSearchParams(location.search);
  const difficulty = queryParams.get('difficulty') || 'easy'; // default to 'easy'

  // Set timer based on difficulty
  useEffect(() => {
    if (difficulty === 'easy') {
      setTimeLeft(50);
    } else if (difficulty === 'medium') {
      setTimeLeft(20);
    } else if (difficulty === 'hard') {
      setTimeLeft(10);
    }
  }, [difficulty]);

  // Countdown timer logic
  useEffect(() => {
    if (timeLeft === 0) {
      toast.error("Time's up!");
      return;
    }

    const timerId = setInterval(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    return () => clearInterval(timerId);
  }, [timeLeft]);

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

  useEffect(() => {
    fetchQuestion();
  }, []);

  const handleInputChange = (e) => {
    setUserAnswer(e.target.value);
  };

  const checkAnswer = () => {
    if (parseInt(userAnswer) === solution) {
      toast.success('Correct answer!');
    } else {
      toast.error('Wrong answer. Try again!');
    }
  };

  return (
    <div className="new-game-page container text-center mt-5">
      <h2>New Game - {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)} Level</h2>

      {/* Timer Display */}
      <div className="timer-display">
        <p>Time Left: <span>{timeLeft} seconds</span></p>
      </div>

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

            <button className="btn btn-primary" onClick={checkAnswer}>
              Submit Answer
            </button>
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
