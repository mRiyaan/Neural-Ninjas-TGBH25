import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

function Resume() {
  const history = useHistory();
  const [countdown, setCountdown] = useState(240); // 4 minutes

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    if (countdown <= 0) {
      clearInterval(timer);
      history.push('/');
    }

    return () => clearInterval(timer);
  }, [countdown, history]);

  const handleResume = async () => {
    try {
      const sessionId = localStorage.getItem('sessionId');
      await axios.post('http://localhost:3001/auth/resume', { sessionId });
      history.push('/assessment');
    } catch (error) {
      console.error('Resume failed', error);
      history.push('/');
    }
  };

  return (
    <div className="resume-container">
      <h2>Resume Assessment</h2>
      <p>Time remaining: {countdown} seconds</p>
      <button onClick={handleResume}>Resume</button>
    </div>
  );
}

export default Resume;