import "../../styles/game/GameController.css";

import { Action, actionForKey, actionIsDrop } from "../../business/Input";
import { playerController } from "../../business/PlayerController";

import { useInterval } from "../../hooks/useInterval";
import { useDropTime } from "../../hooks/useDropTime";

// 게임 컨트롤러 컴포넌트
// props : board, gameStats, player, setGameOver, setPlayer
const GameController = ({
    board,
    gameStats,
    player,
    setGameOver,
    setPlayer,
    setOver,
}) => {
    // useDropTime hook
    // 라운드면 드롭시간을 조정하기 위한 훅
    const [dropTime, pauseDropTime, resumeDropTime] = useDropTime({
        gameStats,
    });

    // 자동 블록 내림 인터벌 설정(setTimeOut)
    useInterval(() => {
        handleInput({ action: Action.SlowDrop });
    }, dropTime);

    // 게임 종료 액션
    const onKeyUp = ({ code }) => {
        const action = actionForKey(code);
        // 게임 종료 키 입력 판별
        if (actionIsDrop(action)) resumeDropTime();
    };
    // 나머지 액션들
    const onKeyDown = ({ code }) => {
        const action = actionForKey(code);

        // 일시 정지 키 판별
        if (action === Action.Pause) {
            if (dropTime) {
                pauseDropTime();
            } else {
                resumeDropTime();
            }
        } else if (action === Action.Quit) {
            setGameOver(true);
        } else {
            if (actionIsDrop(action)) pauseDropTime();
            if (!dropTime) {
                return;
            }
            handleInput({ action });
        }
    };

    const handleInput = ({ action }) => {
        playerController({
            action,
            board,
            player,
            setPlayer,
            setGameOver,
            setOver,
        });
    };

    return (
        <input
            className="GameController"
            type="text"
            onKeyUp={onKeyUp}
            onKeyDown={onKeyDown}
            autoFocus
        />
    );
};

export default GameController;
