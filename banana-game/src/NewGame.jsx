import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './css/NewGame.css'; // Add your styling here

function NewGame() {
  const [questionImage, setQuestionImage] = useState('');
  const [solution, setSolution] = useState(null);
  const [userAnswer, setUserAnswer] = useState('');

  // Fetch the question when the component mounts
  useEffect(() => {
    fetchQuestion();
  }, []);

  const fetchQuestion = async () => {
    try {
      // Use the proxy URL with "/api" as configured in vite.config.js
      const response = await fetch('/api/uob/banana/api.php');
      const data = await response.json();
      setQuestionImage(data.question);
      setSolution(data.solution);
    } catch (error) {
      toast.error("Failed to load question. Please try again.");
    }
  };

  // Handle user input change
  const handleInputChange = (e) => {
    setUserAnswer(e.target.value);
  };

  // Check the user's answer
  const checkAnswer = () => {
    if (parseInt(userAnswer) === solution) {
      toast.success('Correct answer!');
    } else {
      toast.error('Wrong answer. Try again!');
    }
  };

  return (
    <div className="new-game-page container text-center mt-5">
      <h2>New Game</h2>

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
