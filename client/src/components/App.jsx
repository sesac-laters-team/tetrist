import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import GameContainer from "./inGame/GameContainer";

import "../styles/WaitingRoom.scss";
import "../styles/menu-button.scss";
import WaitingRoomPage from "./page/WaitingRoomPage";
import "../styles/rankingmodal.scss";
import "../styles/mypagemodal.scss";
import GamePage from "./page/GamePage";
import "../styles/CreateRoommodal.scss"
import "../styles/ShopModal.scss"

function App() {
    return (
        <Router>
            <div className="App">
                <nav>
                    {/* <Link to="/">Home</Link>
                    <Link to="/game">Play Gomoku</Link>
                    <Link to="/waiting">Waiting Room</Link> */}
                </nav>
                {/* 들어갈때 http://localhost:3000/waiting 치고 들어가세요 */}
                <Routes>
                    <Route path="/waiting" element={<WaitingRoomPage />} />
                    <Route path="/game" element={<GameContainer />} />
                    <Route path="/tetris" element={<GamePage />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
