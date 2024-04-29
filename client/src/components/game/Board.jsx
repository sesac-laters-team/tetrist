// import BoardCell from "../components/BoardCell";
import "../../styles/game/Board.css";

const Board = ({ board }) => {
    const boardStyles = {
        gridTemplateRows: `repeat(${board.size.rows}, 1fr)`,
        gridTemplateColumns: `repeat(${board.size.columns}, 1fr)`,
    };

    return (
        <div className="Board" style={boardStyles}>
            <h2>보드 컴포넌트</h2>
            {/* {board.rows.map((row, y) =>
                row.map((cell, x) => (
                    <BoardCell key={x * board.size.columns + x} cell={cell} />
                ))
            )} */}
        </div>
    );
};

export default Board;
