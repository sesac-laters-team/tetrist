import React, { useState, useEffect } from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from "react-router-dom";
import GameContainer from "./inGame/GameContainer";
import WaitingRoomPage from "./page/WaitingRoomPage";
import "../styles/CreateRoommodal.scss";
import "../styles/WaitingRoom.scss";
import "../styles/menu-button.scss";
import "../styles/mypagemodal.scss";
import "../styles/rankingmodal.scss";
import "../styles/ShopModal.scss";
import GamePage from "./page/GamePage";
import LoginPage from "./page/LoginPage";
import "../styles/pagination.scss";
import "../styles/font.scss";

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // 로컬 스토리지에서 로그인 상태를 확인하여 상태 초기화
    useEffect(() => {
        const storedLoggedIn = localStorage.getItem("isLoggedIn") === "true";
        setIsLoggedIn(storedLoggedIn);
    }, []);

    // 로그인 상태가 변경될 때 로컬 스토리지에 반영
    useEffect(() => {
        localStorage.setItem("isLoggedIn", isLoggedIn);
    }, [isLoggedIn]);

    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route
                        path="/"
                        element={<Navigate replace to="/login" />}
                    />
                    <Route
                        path="/login"
                        element={<LoginPage setIsLoggedIn={setIsLoggedIn} />}
                    />
                    <Route path="/waiting" element={<WaitingRoomPage />} />
                    <Route path="/game" element={<GameContainer />} />
                    <Route
                        path="/tetris"
                        element={<GamePage owner={"nick1"} guest={"nick2"} />}
                    />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
