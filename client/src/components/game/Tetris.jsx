import "../../styles/game/Tetris.css";
import React from "react";

import Board from "./Board";
import BoardOther from "./BoardOther";
import GameStats from "./GameStats";
import GameStatsOther from "./GameStatsOther";
import Previews from "./Previews";
import GameController from "./GameController";

import { useBoard } from "../../hooks/useBoard";
import { useBoardOther } from "../../hooks/useBoardOther";
import { useGameStats } from "../../hooks/useGameStats";
import { useGameStatsOther } from "../../hooks/useGameStatsOther";
import { usePlayer } from "../../hooks/usePlayer";
import { usePlayerOther } from "../../hooks/usePlayerOther";

const Tetris = ({ rows, columns, setGameOver }) => {
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
        </div>
    );
};

export default Tetris;
