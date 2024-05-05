import { isWithinBoard, hasCollision } from "./Board";
import { rotate } from "./Tetrominoes";
import { Action } from "./Input";
import { socket } from "../components/game/Game";

// 블록 회전 시도 함수
// 내부 유효성 검사 후 player 객체 or false 반환
const attemptRotation = ({ board, player, setPlayer }) => {
    const shape = rotate({
        piece: player.tetromino.shape,
        direction: 1,
    });

    const position = player.position;
    const isValidRotation =
        // 회전시 유효성 검사 변수
        // 회전후 보드내에 테트리스 블록이 포함되어 있는지 확인하는 함수
        isWithinBoard({ board, position, shape }) &&
        // 충돌여부 검사
        !hasCollision({ board, position, shape });

    // 유효성 검사 만족시 player 상태 설정
    if (isValidRotation) {
        setPlayer({
            ...player,
            tetromino: {
                ...player.tetromino,
                shape,
            },
        });
    } else {
        // 아닐시 false 반환
        return false;
    }
};

// 블록 이동 함수
export const movePlayer = ({ delta, position, shape, board }) => {
    const desiredNextPosition = {
        row: position.row + delta.row,
        column: position.column + delta.column,
    };

    const collided = hasCollision({
        board,
        position: desiredNextPosition,
        shape,
    });

    const isOnBoard = isWithinBoard({
        board,
        position: desiredNextPosition,
        shape,
    });

    const preventMove = !isOnBoard || (isOnBoard && collided);
    const nextPosition = preventMove ? position : desiredNextPosition;

    const isMovingDown = delta.row > 0;
    const isHit = isMovingDown && (collided || !isOnBoard);

    return { collided: isHit, nextPosition };
};

// 블록 이동 시도 함수
const attemptMovement = ({
    board,
    action,
    player,
    setPlayer,
    setOver,
    setGameOver,
}) => {
    const delta = { row: 0, column: 0 };
    let isFastDropping = false;

    if (action === Action.FastDrop) {
        isFastDropping = true;
    } else if (action === Action.SlowDrop) {
        delta.row += 1;
    } else if (action === Action.Left) {
        delta.column -= 1;
    } else if (action === Action.Right) {
        delta.column += 1;
    }

    const { collided, nextPosition } = movePlayer({
        delta,
        position: player.position,
        shape: player.tetromino.shape,
        board,
    });

    // 게임 즉시 종료 여부 판별
    const isGameOver = collided && player.position.row === 0;

    if (isGameOver) {
        socket.emit("game_over_to_server");
        setGameOver(isGameOver);
    }

    setPlayer({
        ...player,
        collided,
        isFastDropping,
        position: nextPosition,
    });
};

export const playerController = ({
    action,
    board,
    player,
    setPlayer,
    setGameOver,
    setOver,
}) => {
    if (!action) return;
    if (action === Action.Rotate) {
        attemptRotation({ board, player, setPlayer });
    } else {
        attemptMovement({
            board,
            action,
            player,
            setPlayer,
            setGameOver,
            setOver,
        });
    }
};
