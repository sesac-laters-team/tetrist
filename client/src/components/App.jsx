import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import GameContainer from "./inGame/GameContainer";

import "../styles/WaitingRoom.scss";
import WaitingRoomPage from "./page/WaitingRoomPage";

function App() {
    return (
        <Router>
            <div className="App">
                <h2>omokshiroi</h2>
                <nav>
                    <Link to="/">Home</Link>
                    <Link to="/game">Play Gomoku</Link>
                    <Link to="/waiting">Waiting Room</Link>
                </nav>
                <Routes>
                    <Route path="/waiting" element={<WaitingRoomPage />} />
                    <Route path="/game" element={<GameContainer />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
