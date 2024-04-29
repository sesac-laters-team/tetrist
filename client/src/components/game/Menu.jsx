import React from "react";
import "../../styles/game/Menu.css";
const Menu = ({ onClick }) => {
    return (
        <div className="Menu">
            <button className="Button" onClick={onClick}>
                Play Game
            </button>
        </div>
    );
};
export default Menu;
