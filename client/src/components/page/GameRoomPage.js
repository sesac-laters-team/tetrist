import React, { useState, useEffect } from 'react';
import OmokBoard from './OmokBoard';
import GamePanel from './GamePanel';

const GameRoomPage = ({ socket }) => {
  const [takes, setTakes] = useState([]);
  const [currentPlayer, setCurrentPlayer] = useState('black'); // 흑돌이 먼저 시작
  const [isGameEnd, setGameEnd] = useState(false);
  const [winner, setWinner] = useState('');

  // 소켓 이벤트를 수신
  useEffect(() => {
    socket.on('player_selected', (coord) => {
      setTakes((prev) => [...prev, coord]);
      setCurrentPlayer((prev) => (prev === 'black' ? 'white' : 'black')); // 턴 전환
    });

    socket.on('game_end', (winner) => {
      setWinner(winner);
      setGameEnd(true);
    });

    return () => {
      socket.off('player_selected');
      socket.off('game_end');
    };
  }, [socket]);

  const handleStonePlacement = (x, y) => {
    if (!isGameEnd) {
      const coord = { x, y };
      socket.emit('player_selected', coord); // 선택한 돌의 위치를 서버에 알림
    }
  };

  return (
    <div className="game-room">
      <OmokBoard takes={takes} onStonePlaced={handleStonePlacement} currentPlayer={currentPlayer} />
      <GamePanel currentPlayer={currentPlayer} />
      {isGameEnd && <div>{`Winner: ${winner}`}</div>}
    </div>
  );
};

export default GameRoomPage;
