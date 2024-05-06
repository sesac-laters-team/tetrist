import "../../styles/game/Game.css";
import React, { useEffect, useRef, useState } from "react";
import { useGameOver } from "../../hooks/useGameOver";
import Tetris from "./Tetris";

import io from "socket.io-client";
import { useSelector } from "react-redux";
import GameResult from "../page/GameResult";

// 테트리스 컴포넌트에서 소켓을 사용하기때문에 export
export const socket = io.connect(`${process.env.REACT_APP_GAME_SERVER}`, {
    autoConnect: false,
});

const Game = ({ rows, columns, roomId }) => {
    // 소켓 연결
    const initSocketConnect = () => {
        if (!socket.connected) socket.connect();
    };

    const [room, setRoom] = useState([]);
    // store에서 방정보 불러오기
    const rooms = useSelector((state) => state.waiting.rooms);
    const [gameOver, setGameOver, resetGameOver] = useGameOver();
    const [winner, setWinner] = useState(null);
    useEffect(() => {
        initSocketConnect();
    }, []);

    useEffect(() => {
        // rooms 배열이 비어 있을 경우(방이 없을경우) 예외처리
        if (rooms.length > 0) {
            // 방 정보 설정
            setRoom(rooms.filter((room) => room.room_id === roomId));
            // 게임 시작 초기화
            resetGameOver();
            console.log("rooms ::: ", rooms);
        }
    }, [rooms]);

    // 입장 이벤트 전달
    useEffect(() => {
        if (room.length > 0) {
            socket.emit("game_enter", room[0].user_id);
            // 승리시 전달받는 이벤트
            socket.on("game_over_to_client", () => {
                setWinner(room[0].user_id);
                setGameOver(true);
            });
            console.log(room[0].guest_id);
        }
    }, [room]);

    return (
        <div className="Game">
            {room.length > 0 ? (
                room[0].guest_id === null ? (
                    <div className="Waiting">
                        <h2>Waiting for players...</h2>
                        <div
                            className="loader"
                            style={{
                                border: "4px solid #f3f3f3",
                                borderTop: "4px solid #3498db",
                                borderRadius: "50%",
                                width: "30px",
                                height: "30px",
                                animation: "spin 2s linear infinite",
                                margin: "20px auto",
                            }}
                        ></div>
                    </div>
                ) : room[0].guest_id !== null && gameOver ? (
                    <div className="Result">
                        <h2>Game End</h2>
                        <p>
                            {winner === null ? (
                                <GameResult result={true} />
                            ) : (
                                <GameResult result={false} />
                            )}
                        </p>
                    </div>
                ) : (
                    <Tetris
                        rows={rows}
                        columns={columns}
                        setGameOver={setGameOver}
                    />
                )
            ) : null}
        </div>
    );
};
export default Game;
