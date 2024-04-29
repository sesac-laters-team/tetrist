import { useEffect, useState } from "react";
import { buildBoard, nextBoard } from "../business/Board";

export const useBoardOther = ({
    rows,
    columns,
    player,
    resetPlayer,
    addLinesCleared,
}) => {
    const [boardOther, setBoardOther] = useState(buildBoard({ rows, columns }));

    // useEffect(() => {
    //     setBoard((previousBoard) =>
    //         nextBoard({
    //             board: previousBoard,
    //             player,
    //             resetPlayer,
    //             addLinesCleared,
    //         })
    //     );
    // }, [player, resetPlayer, addLinesCleared]);

    return [boardOther];
};
