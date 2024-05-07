import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/game/GameResult.scss";
import { socket } from "../game/Game";
import { useDispatch, useSelector } from "react-redux";
import { del } from "../../redux/store/module/waiting";

const GameResult = ({ result }) => {
    console.log("프롭스로 넘어온", result);
    const navigate = useNavigate();
    const winnerImage = "/tetris_winner.png";
    const loserImage = "/tetris_looser.png";
    const dispatch = useDispatch();
    const realUserId = useSelector((state) => state.auth.userData);

    useEffect(() => {
        if (!result) {
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
    }, [result]);

    const getResultMessage = () => (result ? "You win!" : "You lose!");
    const getResultImage = () => (result ? winnerImage : loserImage);

    const handleConfirm = () => {
        navigate("/waiting");

        //redux
        dispatch(
            del({
                user_id: realUserId.userId,
            })
        );
        socket.disconnect();
    };

    return (
        <div className={`GameResult ${!result ? "rain-effect" : ""}`}>
            <h1>
                <span>G</span>
                <span>a</span>
                <span>m </span>
                <span>e</span>
                &nbsp;
                <span>O</span>
                <span>v</span>
                <span>e</span>
                <span>r</span>
                <span>😊</span>
            </h1>

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
