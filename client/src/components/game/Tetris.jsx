import "../../styles/game/Tetris.css";
import React, { useEffect } from "react";

import Board from "./Board";
import BoardOther from "./BoardOther";
import GameStats from "./GameStats";
import GameStatsOther from "./GameStatsOther";
import Previews from "./Previews";
import PreviewsOther from "./PreviewsOther";
import GameController from "./GameController";
import GameControllerOther from "./GameControllerOther";

import { useBoard } from "../../hooks/useBoard";
import { useBoardOther } from "../../hooks/useBoardOther";
import { useGameStats } from "../../hooks/useGameStats";
import { useGameStatsOther } from "../../hooks/useGameStatsOther";
import { usePlayer } from "../../hooks/usePlayer";
import { usePlayerOther } from "../../hooks/usePlayerOther";

import io from "socket.io-client";

const socket = io.connect("http://localhost:8082", {
    autoConnect: false,
});

const Tetris = ({ rows, columns, setGameOver }) => {
    const initSocketConnect = () => {
        if (!socket.connected) socket.connect();
    };
    // 테트리스 컴포넌트
    // 관리하는 스테이트 : 보드, 게임상태, 플레이어(나), 플레이어(상대)

    // useGameStats hook
    // 게임 상태판 관리 훅
    const [gameStats, addLinesCleared] = useGameStats();
    const [gameStatsOther, addLinesClearedOther] = useGameStatsOther();

    // usePlayer hook
    const [player, setPlayer, resetPlayer] = usePlayer();
    const [playerOther, setPlayerOther, resetPlayerOther] = usePlayerOther();

    // useBoard hook
    // 보드 상태를 생성 및 관리하는 훅
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

    useEffect(() => {
        initSocketConnect();
        socket.emit("test", "접속했다");
    }, []);

    return (
        <div className="Tetris">
            <Board board={board} />
            <GameStats gameStats={gameStats} />
            <Previews tetrominoes={player.tetrominoes} />
            <GameController
                board={board}
                gameStats={gameStats}
                player={player}
                setPlayer={setPlayer}
                setGameOver={setGameOver}
            />
            <BoardOther board={boardOther} />
            <GameStatsOther gameStats={gameStatsOther} />
            <PreviewsOther tetrominoes={playerOther.tetrominoes} />
            {/* <GameControllerOther
                board={boardOther}
                gameStats={gameStatsOther}
                player={playerOther}
                setPlayer={setPlayerOther}
                setGameOver={setGameOver}
            /> */}
        </div>
    );
};

export default Tetris;
