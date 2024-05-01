import React from "react";
import Menu from "./Menu";
import { useGameOver } from "../../hooks/useGameOver";
import Tetris from "./Tetris";

import io from "socket.io-client";

// const socket = io.connect("http://localhost:8082", {
//     autoConnect: false,
// });

const Game = ({ rows, columns }) => {
    // 게임상태 관리 커스텀 훅
    // gameOver state를 useGameOver(); 훅으로 관리
    const [gameOver, setGameOver, resetGameOver] = useGameOver();

    // const initSocketConnect = () => {
    //     if (!socket.connected) socket.connect();
    // };

    const start = () => {
        resetGameOver();
        // initSocketConnect();
        // socket.emit("enter", "입장");
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
