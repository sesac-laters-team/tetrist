import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import GameContainer from "./inGame/GameContainer";
import WaitingRoomPage from "./page/WaitingRoomPage";
import MainPage from "./page/MainPage";
import GamePage from "./page/GamePage";
import LoginPage from "./page/LoginPage";

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false); // 로그인 상태를 관리하는 상태
    // const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/login" element={<LoginPage setIsLoggedIn={setIsLoggedIn} />} />
                    {/* 로그인되어 있지 않은 경우에는 WaitingRoomPage로의 라우팅을 막음 */}
                    <Route path="/waiting" element={isLoggedIn ? <WaitingRoomPage /> : <Navigate to="/login" />} />
                    <Route path="/game" element={<GameContainer />} />
                    <Route path="/main" element={<MainPage />} />
                    <Route path="/tetris" element={<GamePage />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
