import React, { useState, useEffect } from 'react';

function Timer({ duration, onTimeUp }) {
  const [timeLeft, setTimeLeft] = useState(duration);

  useEffect(() => {
    if (timeLeft <= 0) {
      onTimeUp();
      return;
    }
    const intervalId = setInterval(() => {
      setTimeLeft(prevTime => prevTime - 1);
    }, 1000);
    return () => clearInterval(intervalId);
  }, [timeLeft, onTimeUp]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div style={{ textAlign: 'center', marginBottom: '20px' }}>
      <h2 style={{ color: timeLeft < 60 ? 'red' : 'inherit' }}>
        Time Left: {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
      </h2>
    </div>
  );
}

export default Timer;