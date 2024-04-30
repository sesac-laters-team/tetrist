import { defaultCell, lockedCell } from "./Cell";
import { movePlayer } from "../business/PlayerController";
import { transferToBoard } from "./Tetrominoes";

/* 보드 객체 구조
  2차원 배열값과 보드의 사이즈를 객체로 반환
  {
    rows: [
      [ { value: null }, { value: null }, { value: null } ],
      [ { value: null }, { value: null }, { value: null } ],
      [ { value: null }, { value: null }, { value: null } ]
    ],
    size: { rows: 3, columns: 3 }
  } 
*/

// 보드 생성 함수
export const buildBoard = ({ rows, columns }) => {
    const builtRows = Array.from({ length: rows }, () =>
        Array.from({ length: columns }, () => ({ ...defaultCell }))
    );

    return {
        rows: builtRows,
        size: { rows, columns },
    };
};

// 회전 후 보드범위를 넘어가지는지 판별 함수
export const isWithinBoard = ({ board, position, shape }) => {
    for (let y = 0; y < shape.length; y++) {
        const row = y + position.row;

        for (let x = 0; x < shape[y].length; x++) {
            if (shape[y][x]) {
                const column = x + position.column;
                const isValidPosition =
                    board.rows[row] && board.rows[row][column];

                if (!isValidPosition) return false;
            }
        }
    }

    return true;
};

// 충돌 여부 판별 함수
export const hasCollision = ({ board, position, shape }) => {
    for (let y = 0; y < shape.length; y++) {
        const row = y + position.row;

        for (let x = 0; x < shape[y].length; x++) {
            if (shape[y][x]) {
                const column = x + position.column;

                if (
                    board.rows[row] &&
                    board.rows[row][column] &&
                    board.rows[row][column].occupied
                ) {
                    return true;
                }
            }
        }
    }

    return false;
};

// 드랍위치 계산 함수
const findDropPosition = ({ board, position, shape }) => {
    let max = board.size.rows - position.row + 1;
    let row = 0;

    for (let i = 0; i < max; i++) {
        const delta = { row: i, column: 0 };
        const result = movePlayer({ delta, position, shape, board });
        const { collided } = result;

        if (collided) {
            break;
        }

        row = position.row + i;
    }

    return { ...position, row };
};

// 다음 보드 생성함수
export const nextBoard = ({
    board,
    player,
    resetPlayer,
    addLinesCleared,
    attack,
}) => {
    const { tetromino, position } = player;

    let rows = board.rows.map((row) =>
        row.map((cell) => (cell.occupied ? cell : { ...defaultCell }))
    );

    // 도착지점 위치 변수 선언
    const dropPosition = findDropPosition({
        board,
        position,
        shape: tetromino.shape,
    });

    // 도착지점 클래스명
    const className = `${tetromino.className} ${
        player.isFastDropping ? "" : "ghost"
    }`;

    // 빠른 드롭 기능일 경우 미표시
    rows = transferToBoard({
        className,
        isOccupied: player.isFastDropping,
        position: dropPosition,
        rows,
        shape: tetromino.shape,
    });

    // 빠른 드롭 기능(스페이스) 아닐 경우 도착 지점 표시, 클래스명 추가
    if (!player.isFastDropping) {
        rows = transferToBoard({
            className: tetromino.className,
            isOccupied: player.collided,
            position,
            rows,
            shape: tetromino.shape,
        });
    }

    // row 초기화 체크
    const blankRow = rows[0].map((_) => ({ ...defaultCell }));
    let linesCleared = 0;
    rows = rows.reduce((acc, row) => {
        if (row.every((column) => column.occupied)) {
            linesCleared++;
            acc.unshift([...blankRow]);
        } else {
            acc.push(row);
        }

        return acc;
    }, []);

    if (linesCleared > 0) {
        addLinesCleared(linesCleared);
    }

    // 블록이 충돌했거나 스페이스바 눌렀을 때 블록 초기화
    if (player.collided || player.isFastDropping) {
        resetPlayer();
    }

    return {
        rows,
        size: { ...board.size },
    };
};

//
export const addUnremovableLineToMyBoard = ({ board }) => {
    const blankRow = Array(board.size.columns).fill({ ...lockedCell });
    const newRows = Array.from({ length: 1 }, () => [...blankRow]);

    const updatedRows = [
        ...board.rows.slice(0, board.size.rows - 1),
        ...newRows,
    ];

    return {
        rows: updatedRows,
        size: { ...board.size },
    };
};
