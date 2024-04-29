import React from "react";
import Menu from "./Menu";
import { useGameOver } from "../hooks/useGameOver";
import Tetris from "./Tetris";

const Game = ({ rows, columns }) => {
    // 게임상태 관리 커스텀 훅
    // gameOver state를 useGameOver(); 훅으로 관리
    const [gameOver, setGameOver, resetGameOver] = useGameOver();

    const start = () => {
        resetGameOver();
    };

    return (
        <div className="Game">
            {gameOver ? (
                <Menu onClick={start} />
            ) : (
                <Tetris
                    rows={rows}
                    columns={columns}
                    setGameOver={setGameOver}
                />
            )}
        </div>
    );
};
export default Game;
