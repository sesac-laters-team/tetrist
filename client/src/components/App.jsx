import React, { useEffect } from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import GameContainer from "./inGame/GameContainer";
import WaitingRoomPage from "./page/WaitingRoomPage";
import LoginPage from "./page/LoginPage";
import { logoutUser } from "../redux/store/module/authModule";
import "../styles/CreateRoommodal.scss";
import "../styles/WaitingRoom.scss";
import "../styles/menu-button.scss";
import "../styles/mypagemodal.scss";
import "../styles/rankingmodal.scss";
import "../styles/ShopModal.scss";
import "../styles/pagination.scss";
import GamePage from "./page/GamePage";

function App() {
    const isLoggedIn = useSelector((state) => state.auth.userData !== null);
    const dispatch = useDispatch();

    useEffect(() => {
        const storedLoggedIn = localStorage.getItem("isLoggedIn") === "true";
        if (!storedLoggedIn) {
            dispatch(logoutUser());
        }
    }, [dispatch]);

    return (
        <Router>
            <div className="App">
                <Routes>
                    {/* 기본 페이지를 /login으로 설정 */}
                    <Route
                        path="/"
                        element={<Navigate replace to="/login" />}
                    />
                    <Route path="/login" element={<LoginPage />} />
                    <Route
                        path="/waiting"
                        element={
                            isLoggedIn ? (
                                <WaitingRoomPage />
                            ) : (
                                <Navigate replace to="/login" />
                            )
                        }
                    />
                    <Route path="/game" element={<GameContainer />} />
                    <Route path="/tetris" element={<GamePage />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
