import "../../styles/game/Game.css";
import React, { useEffect, useState } from "react";
import { useGameOver } from "../../hooks/useGameOver";
import Tetris from "./Tetris";

const Game = ({ rows, columns, owner, guest }) => {
    const [gameOver, setGameOver, resetGameOver] = useGameOver();

    const [guestState] = useState(guest);

    useEffect(() => {
        resetGameOver();
    }, [guestState, resetGameOver]);

    return (
        <div className="Game">
            {guest === null || gameOver ? (
                <div className="Waiting">
                    <h2>Waiting for players...</h2>
                    <div
                        className="loader"
                        style={{
                            border: "4px solid #f3f3f3",
                            borderTop: "4px solid #3498db",
                            borderRadius: "50%",
                            width: "30px",
                            height: "30px",
                            animation: "spin 2s linear infinite",
                            margin: "20px auto",
                        }}
                    ></div>
                </div>
            ) : (
                <Tetris
                    rows={rows}
                    columns={columns}
                    setGameOver={setGameOver}
                    owner={owner}
                    guest={guest}
                />
            )}
        </div>
    );
};
export default Game;
