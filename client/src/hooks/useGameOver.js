import { useCallback, useState } from "react";

export const useGameOver = () => {
    const [gameOver, setGameOver] = useState(true);
    // 반복 사용 함수 콜백으로 분리
    const resetGameOver = useCallback(() => {
        setGameOver(false);
    }, []);
    return [gameOver, setGameOver, resetGameOver];
};
