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
import { socket } from "./Game";

const Tetris = ({ rows, columns, setGameOver }) => {
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

    // 상대와 나의 종료 조건 비교를 위한 상태
    // const [over, setOver] = useState(false);

    // 내 게임 상태 변경시 서버에 상태 전달
    useEffect(() => {
        socket.emit("send_states_to_server", {
            gameStats,
            player,
            board,
        });
    }, [player, board, gameStats]);

    socket.on("send_states_to_client", (object) => {
        setBoardOther(object.board);
        setPlayerOther(object.player);
    });

    // useEffect(() => {
    //     // 게임 종료시 guest 닉네임 전달, 게임종료 이벤트(패배시)
    //     if (over) {
    //         socket.emit("game_over_to_server", guest);
    //         setTimeout(() => {
    //             socket.disconnect();
    //         }, 500);
    //     }
    // }, [over]);

    // 게임 종료(승리시)
    // socket.on("game_over_to_client", () => {
    //     setGameOver(true);
    //     socket.disconnect();
    // });

    // 소켓 연결 해제시(강제종료)
    // socket.on("player_disconnect", () => {
    //     // console.log("승자는 ?? ::", owner);
    //     setMsg(`승리 ::: ${owner}`);

    //     setTimeout(() => {
    //         setGameOver(true);
    //         socket.disconnect();
    //     }, 2000);
    // });

    return (
        <div className="Tetris">
            <h2 className="me"></h2>
            <h2 className="other"></h2>
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
