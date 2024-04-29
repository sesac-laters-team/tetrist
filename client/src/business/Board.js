import { defaultCell } from "./Cell";

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

// 다음 보드 생성함수
// export const nextBoard = ({ board, player, resetPlayer, addLinesCleared }) => {
//     const { tetromino, position } = player;

//     let rows = board.rows.map((row) =>
//         row.map((cell) => (cell.occupied ? cell : { ...defaultCell }))
//     );

//     // 도착지점 위치 변수 선언
//     const dropPosition = findDropPosition({
//       board,
//       position,
//       shape: tetromino.shape,
//     });

//     // 도착지점 클래스명
//     const className = `${tetromino.className} ${
//       player.isFastDropping ? "" : "ghost"
//     }`;

//     // 빠른 드롭 기능일 경우 미표시
//     rows = transferToBoard({
//       className,
//       isOccupied: player.isFastDropping,
//       position: dropPosition,
//       rows,
//       shape: tetromino.shape,
//     });

//     // 빠른 드롭 기능(스페이스) 아닐 경우 도착 지점 표시, 클래스명 추가
//     if (!player.isFastDropping) {
//       rows = transferToBoard({
//         className: tetromino.className,
//         isOccupied: player.collided,
//         position,
//         rows,
//         shape: tetromino.shape,
//       });
//     }

//     // row 초기화 체크
//     const blankRow = rows[0].map((_) => ({ ...defaultCell }));
//     let linesCleared = 0;
//     rows = rows.reduce((acc, row) => {
//       if (row.every((column) => column.occupied)) {
//         linesCleared++;
//         acc.unshift([...blankRow]);
//       } else {
//         acc.push(row);
//       }

//       return acc;
//     }, []);

//     if (linesCleared > 0) {
//       addLinesCleared(linesCleared);
//     }

//     // 블록이 충돌했거나 스페이스바 눌렀을 때 블록 초기화
//     if (player.collided || player.isFastDropping) {
//       resetPlayer();
//     }

//     return {
//         rows,
//         size: { ...board.size },
//     };
// };
