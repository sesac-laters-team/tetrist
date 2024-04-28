import React, { useState } from "react";

const Menubar = ({ socket }) => {
  const [isOpen, setOpen] = useState(false);

  const toggleMenu = () => {
    setOpen(!isOpen);
  };

  return (
    <div className="menubar">
      <button onClick={toggleMenu} className="menubar-toggle">
        Menubar
      </button>
      {isOpen && (
        <div className="menubar-menu">
            <div className="dropdown-item">닉네임:</div>
          <div className="dropdown-item">전적</div>
          <div className="dropdown-item">Shop</div>
          <div className="dropdown-item">Rank</div>
        </div>
      )}
    </div>
  );
};

export default Menubar;
