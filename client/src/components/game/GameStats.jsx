import React from "react";
import "../../styles/game/GameStats.css";

const GameStats = ({ gameStats }) => {
    const { level, points, linesCompleted, linesPerLevel } = gameStats;
    const linesToLevel = linesPerLevel - linesCompleted;

    return (
        <ul className="GameStats GameStats__me">
            <li>Level</li>
            <li className="value">{level}</li>
            <li>Lines to level</li>
            <li className="value">{linesToLevel}</li>
            <li>Points</li>
            <li className="value">{points}</li>
        </ul>
    );
};

export default React.memo(GameStats);
