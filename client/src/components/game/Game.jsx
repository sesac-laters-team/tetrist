import "../../styles/game/Game.css";
import React, { useEffect, useState } from "react";
import { useGameOver } from "../../hooks/useGameOver";
import Tetris from "./Tetris";

import io from "socket.io-client";
import { useDispatch, useSelector } from "react-redux";
import GameResult from "../page/GameResult";
import { join } from "../../redux/store/module/waiting";

export const socket = io.connect(`${process.env.REACT_APP_GAME_SERVER}`, {
    autoConnect: false,
});

const Game = ({ rows, columns, roomId }) => {
    const initSocketConnect = () => {
        if (!socket.connected) socket.connect();
    };

    const rooms = useSelector((state) => state.waiting.rooms);
    const [room, setRoom] = useState(
        rooms.find((room) => room.room_id === roomId)
    );
    const [gameOver, setGameOver, resetGameOver] = useGameOver();
    const [winner, setWinner] = useState(null);

    const dispatch = useDispatch();

    useEffect(() => {
        initSocketConnect();
        socket.emit("game_enter", room.user_id);
        resetGameOver();
    }, []);

    useEffect(() => {
        socket.on("game_enter_notice", (creator) => {
            console.log("상대입장 알림!");
            dispatch(
                join({
                    room_id: room.room_id,
                    r_password: room.r_password,
                    user_id: room.user_id,
                    guest_id: creator,
                    r_state: true,
                })
            );
            // 게임 화면 표시
            setGameOver(false);
            // 게임 정보 업데이트
            setRoom(rooms.map((room) => room.room_id === roomId));
            console.log("상대가 입장시 수정된 방정보 :: ", room);
            // 게임 참가 액션 디스패치
        });
    }, [dispatch, roomId, room, rooms]);

    socket.on("game_over_to_client", () => {
        setWinner(room.guest_id);
        setGameOver(true);
    });

    return (
        <div className="Game">
            {room.guest_id === null ? (
                <div className="Waiting">
                    <h2>Waiting for players...</h2>
                    <div className="loader"></div>
                </div>
            ) : room.guest_id !== null && gameOver ? (
                <div className="Result">
                    {winner === null ? (
                        <GameResult result={false} />
                    ) : (
                        <GameResult result={true} />
                    )}
                </div>
            ) : (
                <Tetris
                    rows={rows}
                    columns={columns}
                    setGameOver={setGameOver}
                />
            )}
        </div>
    );
};

export default Game;
