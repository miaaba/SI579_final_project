import React from 'react';

const Scoreboard = ({ round, totalRounds, score }) => {
  return (
    <div className="d-flex justify-content-between align-items-center mb-4">
      <h2>Round {round} / {totalRounds}</h2>
      <h3>Score: {score}</h3>
    </div>
  );
};

export default Scoreboard;