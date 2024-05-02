import React, { useEffect } from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from "react-router-dom";

import WaitingRoomPage from "./page/WaitingRoomPage";
import LoginPage from "./page/LoginPage";
import GameContainer from "./inGame/GameContainer";
import GamePage from "./page/GamePage";
import { useSelector, useDispatch } from "react-redux";
import {
    loginUserFromLocalStorage,
    logoutUser,
} from "../redux/module/authModule";

function App() {
    const dispatch = useDispatch();
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn); // isLoggedIn 상태 가져오기

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
        }
    }, [dispatch]);

    return (
        <Router>
            <div className="App">
                <Routes>
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
