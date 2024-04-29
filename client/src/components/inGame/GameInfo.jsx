import React from 'react';

function GameInfo({ turn, winner, startGame, resetGame }) {
  return (
    <div>
      <h3>Game Info</h3>
      {winner ? (
        <p>Winner: {winner}</p>
      ) : (
        <p>Current Turn: {turn}</p>
      )}
      <button onClick={startGame}>Start Game</button>
    
    </div>
  );
}

export default GameInfo;
