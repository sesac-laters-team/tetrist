import React from 'react';

function History({ history, moveTo }) {
  return (
    <div>
      <ul>
        {history.map((step, move) => {
          const desc = move ?
            `무르기 #${move}` :
            '무르기'; // "Go to game start"를 "무르기"로 변경
          return (
            <li key={move}>
              <button onClick={() => moveTo(move)}>{desc}</button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default History;
