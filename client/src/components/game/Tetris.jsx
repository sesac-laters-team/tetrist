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

import io from "socket.io-client";
import { addUnremovableLineToMyBoard } from "../../business/Board";

const socket = io.connect("http://localhost:8082", {
    autoConnect: false,
});

const Tetris = ({ rows, columns, setGameOver }) => {
    const initSocketConnect = () => {
        if (!socket.connected) socket.connect();
    };

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

    const [attackFlag, setAttackFlag] = useState(false);

    useEffect(() => {
        initSocketConnect();
        socket.emit("enter");
    }, []);

    useEffect(() => {
        socket.emit("send_states_to_server", { gameStats, player, board });
    }, [gameStats, player, board]);

    useEffect(() => {
        socket.on("send_states_to_client", (object) => {
            setBoardOther(object.board);
            setPlayerOther(object.player);
        });
    }, []);

    // useEffect(() => {
    //     setBoard((prevBoard) =>
    //         addUnremovableLineToMyBoard({ board: prevBoard })
    //     );
    // }, [gameStatsOther.linesCompleted]);

    return (
        <div className="Tetris">
            <h2 className="me">ME</h2>
            <h2 className="other">Other</h2>
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
        </div>
    );
};

export default Tetris;
