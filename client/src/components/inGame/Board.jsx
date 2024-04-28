import React, { useState } from 'react';
import Cell from './Cell';

function Board() {
    const size = 19; // 오목판은 일반적으로 19x19입니다.
    const [board, setBoard] = useState(Array(size).fill().map(() => Array(size).fill(null)));
    const [winner, setWinner] = useState(null); // 승자 상태 추가

    const checkWinner = (newBoard, row, col) => {
        // 여기에 승리 조건을 검사하는 로직을 추가하세요.
        // 예시로, 단순히 가로줄 검사 로직만 포함:
        const symbol = newBoard[row][col];
        let count = 0;
        for (let i = 0; i < size; i++) {
            if (newBoard[row][i] === symbol) {
                count++;
                if (count === 5) return symbol; // 5개 연속 돌을 찾으면 해당 심볼을 승자로 설정
            } else {
                count = 0;
            }
        }
        return null;
    };

    const handleClick = (row, col) => {
        if (board[row][col] || winner) return; // 이미 돌이 있는 위치거나 게임이 끝났다면 클릭 무시
        const newBoard = board.map((rowArr, rowIndex) => (
            rowArr.map((cell, colIndex) => {
                if (rowIndex === row && colIndex === col) return 'X'; // 현재 차례의 플레이어 심볼
                else return cell;
            })
        ));
        setBoard(newBoard);

        const win = checkWinner(newBoard, row, col);
        if (win) {
            setWinner(win); // 승자 상태 업데이트
            console.log(`${win} wins!`); // 승자 출력
        }
    };

    return (
        <div style={{ display: 'grid', gridTemplateColumns: `repeat(${size}, 30px)` }}>
            {board.map((row, rowIndex) => 
                row.map((cell, colIndex) => (
                    <Cell key={`${rowIndex}-${colIndex}`} value={cell} onClick={() => handleClick(rowIndex, colIndex)} />
                ))
            )}
        </div>
    );
}

export default Board;
