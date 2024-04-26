import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import RoomList from "./waitingRoom/RoomList";
import GameContainer from "./inGame/GameContainer";

import "../styles/WaitingRoom.scss";

function App() {
    return (
        <Router>
            <div className="App">
                <h2>laters</h2>
                <nav>
                    <Link to="/">Home</Link>
                    <Link to="/game">Game</Link>
                </nav>
                <Routes>
                    <Route path="/" element={<RoomList />} />
                    <Route path="/game" element={<GameContainer />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
