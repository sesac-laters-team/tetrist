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
    // const { winner, owner } = location.state; // 이전 페이지에서 전달된 데이터에서 승자 정보와 소유자 정보 수신
    const winnerImage = "/tetris_winner.png";
    const loserImage = "/tetris_looser.png";
    useEffect(() => {
        const createFallingBlock = () => {
            const block = document.createElement("div");
            block.className = "falling-block";
            block.style.left = `${Math.random() * 100}vw`; // 최대 75% 범위로 줄임
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
    }, []);
    const getResultMessage = () => {
        if (winner === owner) {
            return "You win!";
        } else {
            return "You lose!";
        }
    };

    const getResultImage = () => {
        if (winner === owner) {
            return winnerImage;
        } else {
            return loserImage;
        }
    };

    // 패자를 확인하는 함수
    const getLoser = () => {
        if (winner === owner) {
            return guest; // guest가 패자
        } else {
            return owner; // owner가 패자
        }
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
            {winner !== owner && <div className="rain-container"></div>}
        </div>
    );
};

export default GameResult;
