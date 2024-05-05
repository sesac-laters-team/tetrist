import React, { useEffect, useState } from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
    loginUserFromLocalStorage,
    logoutUser,
} from "../redux/store/module/authModule";
import LoginPage from "./page/LoginPage";
import WaitingRoomPage from "./page/WaitingRoomPage";
import GamePage from "./page/GamePage";
import GameResult from "./page/GameResult";
import "../styles/CreateRoommodal.scss";
import "../styles/WaitingRoom.scss";
import "../styles/menu-button.scss";
import "../styles/mypagemodal.scss";
import "../styles/rankingmodal.scss";
import "../styles/ShopModal.scss";
import "../styles/pagination.scss";
import "../styles/font.scss";

function App() {
    const dispatch = useDispatch();
    const isLoggedIn = useSelector((state) => state.auth.userData !== null);
    const [isWaitingPageAccessAllowed, setIsWaitingPageAccessAllowed] =
        useState(true); // 초기값을 true로 설정하여 기본적으로 대기 페이지 액세스를 허용

    useEffect(() => {
        const storedLoggedIn = localStorage.getItem("isLoggedIn") === "true";
        const userString = localStorage.getItem("user");
        if (storedLoggedIn && userString) {
            try {
                const user = JSON.parse(userString);
                dispatch(loginUserFromLocalStorage(user));
            } catch (error) {
                console.error("Invalid user data in localStorage", error);
                dispatch(logoutUser());
            }
        } else {
            dispatch(logoutUser());
        }
    }, [dispatch]);

    const rooms = useSelector((state) => state.waiting.rooms);

    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route
                        path="/"
                        element={<Navigate replace to="/login" />}
                    />
                    <Route path="/result" element={<GameResult />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route
                        path="/waiting"
                        element={
                            isWaitingPageAccessAllowed ? (
                                <WaitingRoomPage />
                            ) : (
                                <Navigate replace to="/login" />
                            )
                        }
                    />
                    {rooms.map((room) => (
                        <Route
                            key={room.room_id}
                            path={`/waiting/${room.room_id}`}
                            element={<GamePage roomId={room.room_id} />}
                        />
                    ))}
                </Routes>
            </div>
        </Router>
    );
}

export default App;
