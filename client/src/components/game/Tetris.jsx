import "../../styles/game/Tetris.css";
import React, { useEffect, useState } from "react";

import Board from "./Board";
import BoardOther from "./BoardOther";
import GameStats from "./GameStats";
import GameStatsOther from "./GameStatsOther";
import Previews from "./Previews";
import PreviewsOther from "./PreviewsOther";
import GameController from "./GameController";

import { useBoard } from "../../hooks/useBoard";
import { useBoardOther } from "../../hooks/useBoardOther";
import { useGameStats } from "../../hooks/useGameStats";
import { useGameStatsOther } from "../../hooks/useGameStatsOther";
import { usePlayer } from "../../hooks/usePlayer";
import { usePlayerOther } from "../../hooks/usePlayerOther";
import { useOver } from "../../hooks/useOver";

import io from "socket.io-client";

const socket = io.connect(`${process.env.REACT_APP_GAME_SERVER}`, {
    autoConnect: false,
});

const Tetris = ({ rows, columns, setGameOver, owner, guest }) => {
    const initSocketConnect = () => {
        if (!socket.connected) socket.connect();
    };

    const [over, setOver] = useOver();
    const [gameStats, addLinesCleared] = useGameStats();
    const [gameStatsOther, addLinesClearedOther] = useGameStatsOther();
    const [player, setPlayer, resetPlayer] = usePlayer();
    const [playerOther, setPlayerOther, resetPlayerOther] = usePlayerOther();
    const [board, setBoard] = useBoard({
        rows,
        columns,
        player,
        resetPlayer,
        addLinesCleared,
    });
    const [boardOther, setBoardOther] = useBoardOther({
        rows,
        columns,
        playerOther,
        resetPlayerOther,
        addLinesClearedOther,
    });
    const [isSmallScreen, setIsSmallScreen] = useState(
        window.innerWidth <= 1024
    );

    const [resultMessage, setResultMessage] = useState(null); // 게임 결과 메시지 상태

    useEffect(() => {
        const handleResize = () => setIsSmallScreen(window.innerWidth <= 1024);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        initSocketConnect();
        socket.emit("enter");
    }, []);

    useEffect(() => {
        socket.emit("send_states_to_server", { gameStats, player, board });
    }, [player, board, gameStats]);

    socket.on("send_states_to_client", (object) => {
        setBoardOther(object.board);
        setPlayerOther(object.player);
    });

    useEffect(() => {
        if (over) {
            socket.emit("game_over_to_server", owner); // 승자 정보 전송
            setTimeout(() => socket.disconnect(), 500);
        }
    }, [over]);

    socket.on("game_over_to_client", ({ winner }) => {
        setResultMessage(winner === owner ? "You win!" : "You lose!"); // 승자에 따라 메시지 표시
        setGameOver(true);
        socket.disconnect();
    });

    return (
        <div className="Tetris">
            <h2 className="me">{owner}</h2>
            {!isSmallScreen && <h2 className="other">{guest}</h2>}
            <Board board={board} />
            <GameStats gameStats={gameStats} />
            <GameController
                board={board}
                gameStats={gameStats}
                player={player}
                setPlayer={setPlayer}
                setGameOver={setGameOver}
                setOver={setOver}
            />
            <BoardOther board={boardOther} />
            <Previews tetrominoes={player.tetrominoes} />
            {!isSmallScreen && (
                <>
                    <GameStatsOther gameStats={gameStatsOther} />
                    <PreviewsOther tetrominoes={playerOther.tetrominoes} />
                </>
            )}
            {resultMessage && <Modal>{resultMessage}</Modal>}{" "}
            {/* 결과 모달 표시 */}
        </div>
    );
};

export default Tetris;

// 모달 컴포넌트
const Modal = ({ children }) => (
    <div className="modal">
        <div className="modal-content">
            <h2>{children}</h2>
            <button onClick={() => window.location.reload()}>OK</button>
        </div>
    </div>
);
