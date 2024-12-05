import React from 'react';

/**
 * The Scoreboard component displays the current round and score of the game.
 * It receives the round, totalRounds, and score as props and displays them.
 * The component is used in the BookGame component to show the game status.
 *
 * @param {Object} props - The component props.
 * @param {number} props.round - The current round number.
 * @param {number} props.totalRounds - The total number of rounds in the game.
 * @param {number} props.score - The current score of the player.
 *
 * @returns {JSX.Element} A scoreboard displaying the current round and score.
 */

const Scoreboard = ({ round, totalRounds, score }) => {
  return (
    <div className="d-flex justify-content-between align-items-center mb-4">
      <h2>Round {round} / {totalRounds}</h2>
      <h3>Score: {score}</h3>
    </div>
  );
};

export default Scoreboard;
