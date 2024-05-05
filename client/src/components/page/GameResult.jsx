import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../../styles/game/GameResult.scss";

const GameResult = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const {
        winner = "unknown",
        owner = "unknown",
        guest = "unknown",
    } = location.state || {};
    const winnerImage = "/tetris_winner.png";
    const loserImage = "/tetris_looser.png";

    useEffect(() => {
        if (winner !== owner) {
            const createRainDrop = () => {
                const rainDrop = document.createElement("div");
                rainDrop.className = "rain-drop";
                rainDrop.style.left = `${Math.random() * 100}vw`;
                rainDrop.style.animationDuration = `${Math.random() * 3 + 2}s`;

                document.querySelector(".GameResult").appendChild(rainDrop);

                setTimeout(() => rainDrop.remove(), 5000);
            };

            const interval = setInterval(createRainDrop, 30);

            return () => clearInterval(interval);
        } else {
            const createFallingBlock = () => {
                const block = document.createElement("div");
                block.className = "falling-block";
                block.style.left = `${Math.random() * 100}vw`;
                block.style.width = `${Math.random() * 20 + 10}px`;
                block.style.height = block.style.width;
                block.style.backgroundColor = `hsl(${
                    Math.random() * 360
                }, 100%, 50%)`;

                document.querySelector(".GameResult").appendChild(block);

                setTimeout(() => block.remove(), 3000);
            };

            const interval = setInterval(createFallingBlock, 30);

            return () => clearInterval(interval);
        }
    }, [owner, winner]);

    const getResultMessage = () => {
        return winner === owner ? "You win!" : "You lose!";
    };

    const getResultImage = () => {
        return winner === owner ? winnerImage : loserImage;
    };

    const handleConfirm = () => {
        navigate("/waiting");
    };

    return (
        <div className={`GameResult ${winner !== owner ? "rain-effect" : ""}`}>
            <h1>Game Over</h1>
            <p>{getResultMessage()}</p>
            <img
                src={getResultImage()}
                alt={getResultMessage()}
                style={{ width: "400px", height: "400px" }}
            />

            <button onClick={handleConfirm}>확인</button>
        </div>
    );
};

export default GameResult;
