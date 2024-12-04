import React from 'react';

// The Scoreboard component displays the current round and score of the game. It receives the round, totalRounds, and score as props and displays them in a simple format. The Scoreboard component is used in the BookGame component to show the current game status.

const Scoreboard = ({ round, totalRounds, score }) => {
  return (
    <div className="d-flex justify-content-between align-items-center mb-4">
      <h2>Round {round} / {totalRounds}</h2>
      <h3>Score: {score}</h3>
    </div>
  );
};

export default Scoreboard;
