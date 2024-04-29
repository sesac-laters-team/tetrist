import "../../styles/game/Tetris.css";
import React from "react";

import Board from "./Board";

import GameStats from "./GameStats";
import Previews from "./Previews";
import PreviewsOther from "./PreviewsOther";
// import GameController from "./GameController";

import { useBoard } from "../../hooks/useBoard";
import { useBoardOther } from "../../hooks/useBoardOther";
import BoardOther from "./BoardOther";
import { useGameStats } from "../../hooks/useGameStats";
import GameStatsOther from "./GameStatsOther";
import { usePlayer } from "../../hooks/usePlayer";

const Tetris = ({ rows, columns, setGameOver }) => {
    // 테트리스 컴포넌트
    // 관리하는 스테이트 : 보드, 게임상태, 플레이어(나), 플레이어(상대)

    // useGameStats hook
    // 게임 상태판 관리 훅
    const [gameStats, addLinesCleared] = useGameStats();

    // usePlayer hook
    const [player, setPlayer, resetPlayer] = usePlayer();

    // useBoard hook
    // 보드 상태를 생성 및 관리하는 훅
    const [board, setBoard] = useBoard({
        rows,
        columns,
        // player,
        // resetPlayer,
        // addLinesCleared,
    });

    // useBoardOther hook
    // 상대 보드 상태 관리 훅
    const [boardOther, setBoardOther] = useBoardOther({
        rows,
        columns,
        // player,
        // resetPlayer,
        // addLinesCleared,
    });

    return (
        <div className="Tetris">
            <Board board={board} />
            <GameStats gameStats={gameStats} />
            <Previews tetrominoes={player.tetrominoes} />
            {/* <GameController
                board={board}
                gameStats={gameStats}
                player={player}
                setPlayer={setPlayer}
                setGameOver={setGameOver}
            /> */}
            <BoardOther board={board} />
            <GameStatsOther gameStats={gameStats} />
            <PreviewsOther tetrominoes={player.tetrominoes} />
        </div>
    );
};

export default Tetris;