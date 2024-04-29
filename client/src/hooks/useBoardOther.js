import { useEffect, useState } from "react";
import { buildBoard, nextBoard } from "../business/Board";

export const useBoardOther = ({
    rows,
    columns,
    playerOther,
    resetPlayerOther,
    addLinesClearedOther,
}) => {
    const [boardOther, setBoardOther] = useState(buildBoard({ rows, columns }));

    useEffect(() => {
        // setBoardOther((previousBoard) =>
        //     nextBoard({
        //         board: previousBoard,
        //         playerOther,
        //         resetPlayerOther,
        //         addLinesClearedOther,
        //     })
        // );
    }, [playerOther, resetPlayerOther, addLinesClearedOther]);

    return [boardOther];
};
