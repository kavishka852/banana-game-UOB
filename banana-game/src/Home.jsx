import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import './Home.css'; // Include your CSS file

function Home() {
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    // Fetch user email after successful login
    const fetchUserData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/getUserEmail', {
          withCredentials: true, // Include cookies for session
        });
        setUserEmail(response.data.email);
      } catch (error) {
        console.error('Error fetching user email:', error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h2>Welcome, {userEmail}</h2>
      </header>
      <main className="dashboard-content">
        <h1>Main Menu For Play!</h1>
        <div className="menu-options">
          <div className="menu-item">NEW GAME</div>
          <div className="menu-item">QUICK START</div>
          <div className="menu-item">PROFILE</div>
          <div className="menu-item">LEADERBOARD</div>
          <div className="menu-item">HINT TO PLAY</div>
        </div>
      </main>
    </div>
  );
}

export default Home;
