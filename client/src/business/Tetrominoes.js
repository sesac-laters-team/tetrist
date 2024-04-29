const className = "tetromino";

// 블록 모양
export const TETROMINOES = {
    I: {
        shape: [
            [0, 1, 0, 0],
            [0, 1, 0, 0],
            [0, 1, 0, 0],
            [0, 1, 0, 0],
        ],
        className: `${className} ${className}__i`,
    },
    J: {
        shape: [
            [0, 1, 0],
            [0, 1, 0],
            [1, 1, 0],
        ],
        className: `${className} ${className}__j`,
    },
    L: {
        shape: [
            [0, 1, 0],
            [0, 1, 0],
            [0, 1, 1],
        ],
        className: `${className} ${className}__l`,
    },
    O: {
        shape: [
            [1, 1],
            [1, 1],
        ],
        className: `${className} ${className}__o`,
    },
    S: {
        shape: [
            [0, 1, 1],
            [1, 1, 0],
            [0, 0, 0],
        ],
        className: `${className} ${className}__s`,
    },
    T: {
        shape: [
            [1, 1, 1],
            [0, 1, 0],
            [0, 0, 0],
        ],
        className: `${className} ${className}__t`,
    },
    Z: {
        shape: [
            [1, 1, 0],
            [0, 1, 1],
            [0, 0, 0],
        ],
        className: `${className} ${className}__z`,
    },
};

// 랜덤 테트리스 블록 생성 함수
export const randomTetromino = () => {
    const keys = Object.keys(TETROMINOES);
    const index = Math.floor(Math.random() * keys.length);
    const key = keys[index];
    return TETROMINOES[key];
};

// 블록 회전 함수
export const rotate = ({ piece, direction }) => {
    const newPiece = piece.map((_, index) =>
        piece.map((column) => column[index])
    );

    if (direction > 0) return newPiece.map((row) => row.reverse());

    return newPiece.reverse();
};

// 보드 객체에에 특정 블록 좌표값???
export const transferToBoard = ({
    className,
    isOccupied,
    position,
    rows,
    shape,
}) => {
    shape.forEach((row, y) => {
        row.forEach((cell, x) => {
            if (cell) {
                const occupied = isOccupied;
                const _y = y + position.row;
                const _x = x + position.column;
                rows[_y][_x] = { occupied, className };
            }
        });
    });

    return rows;
};
