import React from "react";
import PreviewOther from "./PreviewOther";

const PreviewsOther = ({ tetrominoes }) => {
    const previewTetrominoes = tetrominoes
        .slice(1 - tetrominoes.length)
        .reverse();
    return (
        <>
            {previewTetrominoes.map((tetromino, index) => (
                <PreviewOther tetromino={tetromino} index={index} key={index} />
            ))}
        </>
    );
};

export default React.memo(PreviewsOther);
