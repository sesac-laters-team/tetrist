import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import Board from './Board';
import GameInfo from './GameInfo';
import History from './History';
import ChatBox from './ChatBox';
import Timer from './Timer';

const socket = io('http://localhost:3000'); // 서버 주소에 맞게 조정

function GameContainer() {
  const [board, setBoard] = useState(Array(19).fill(Array(19).fill(null)));
  const [turn, setTurn] = useState('black');
  const [history, setHistory] = useState([Array(19).fill(Array(19).fill(null))]);
  const [winner, setWinner] = useState(null);
  const [myColor, setMyColor] = useState('black');
  const [roomId, setRoomId] = useState(null); // roomId 상태 추가

  useEffect(() => {
    socket.on('game update', ({ board, turn }) => {
      setBoard(board);
      setTurn(turn);
    });

    socket.on('roomCreated', (room) => {
      setRoomId(room.id); // roomId 설정
      setMyColor('black'); // 방을 만든 사람은 'black'
    });

    socket.on('joinedRoom', (room) => {
      setRoomId(room.id); // roomId 설정
      setMyColor('white'); // 방에 참여한 사람은 'white'
    });

    socket.on('history update', (newHistory) => {
      setHistory(newHistory);
    });

    socket.on('winner update', (newWinner) => {
      setWinner(newWinner);
    });

    return () => {
      socket.off('game update');
      socket.off('roomCreated');
      socket.off('joinedRoom');
      socket.off('history update');
      socket.off('winner update');
    };
  }, []);

  const handleCellClick = (x, y) => {
    if (board[x][y] === null && winner === null && turn === myColor) {
      socket.emit('move', { x, y, player: myColor, roomId });
    }
  };

  const restartGame = () => {
    const initialBoard = Array(19).fill(Array(19).fill(null));
    setBoard(initialBoard);
    setHistory([initialBoard]);
    setWinner(null);
    socket.emit('restart', { roomId }); // restart에도 roomId를 포함시키기
  };

  return (
    <div>
      <Board board={board} onCellClick={handleCellClick} />
      <GameInfo turn={turn} winner={winner} startGame={restartGame} resetGame={restartGame} />
      <History history={history} moveTo={(moveIndex) => setBoard(history[moveIndex])} />
      <ChatBox socket={socket} />
      <Timer turn={turn} onTimeOut={() => setTurn(turn === 'black' ? 'white' : 'black')} />
    </div>
  );
}

export default GameContainer;
