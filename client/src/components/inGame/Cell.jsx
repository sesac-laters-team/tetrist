// Cell.jsx
import React from 'react';

function Cell({ onClick, value }) {
    return (
        <button className="cell" onClick={onClick} style={{ width: '30px', height: '30px', border: '1px solid black' }}>
            {value}
        </button>
    );
}

export default Cell;
