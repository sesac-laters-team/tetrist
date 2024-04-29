import { useState, useCallback } from "react";

import { randomTetromino } from "../business/Tetrominoes";

const buildPlayer = (previous) => {
    let tetrominoes;

    if (previous) {
        tetrominoes = [...previous.tetrominoes];
        tetrominoes.unshift(randomTetromino());
    } else {
        tetrominoes = Array(5)
            .fill(0)
            .map((_) => randomTetromino());
    }

    return {
        collided: false,
        isFastDropping: false,
        position: { row: 0, column: 4 },
        tetrominoes,
        tetromino: tetrominoes.pop(),
    };
};

export const usePlayerOther = () => {
    const [playerOther, setPlayerOther] = useState(buildPlayer());

    const resetPlayerOther = useCallback(() => {
        setPlayerOther((prev) => buildPlayer(prev));
    }, []);

    return [playerOther, setPlayerOther, resetPlayerOther];
};
