import BoardCell from "./BoardCell";
import "../../styles/game/Board.css";

const BoardOther = ({ board }) => {
    const boardStyles = {
        gridTemplateRows: `repeat(${board.size.rows}, 1fr)`,
        gridTemplateColumns: `repeat(${board.size.columns}, 1fr)`,
    };

    return (
        <div className="Board-Other" style={boardStyles}>
            {board.rows.map((row, y) =>
                row.map((cell, x) => (
                    <BoardCell key={x * board.size.columns + x} cell={cell} />
                ))
            )}
        </div>
    );
};

export default BoardOther;
