import "../../styles/game/Game.css";
import React, { useEffect, useState } from "react";
import { useGameOver } from "../../hooks/useGameOver";
import Tetris from "./Tetris";

import io from "socket.io-client";
import { useDispatch, useSelector } from "react-redux";
import GameResult from "../page/GameResult";
import { join } from "../../redux/store/module/waiting";

import axios from "axios";
import { useNavigate } from "react-router-dom";
axios.defaults.withCredentials = true;

export const socket = io.connect(`${process.env.REACT_APP_GAME_SERVER}`, {
    autoConnect: false,
});

const Game = ({ rows, columns, roomId }) => {
    const initSocketConnect = () => {
        if (!socket.connected) socket.connect();
    };

    const realUserId = useSelector((state) => state.auth.userData);

    const rooms = useSelector((state) => state.waiting.rooms);
    const [room, setRoom] = useState(
        rooms.find((room) => room.room_id === roomId)
    );
    const [gameOver, setGameOver, resetGameOver] = useGameOver();
    const [winner, setWinner] = useState(null);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    // console.log(realUserId.userNickname);
    const [otherNick, setOtherNick] = useState(null);

    useEffect(() => {
        initSocketConnect();
        socket.emit(
            "game_enter",
            room.user_id,
            room.guest_id,
            realUserId.userNickname
        );
        resetGameOver();
    }, []);

    useEffect(() => {
        socket.on("game_enter_notice", (guest, nickname) => {
            //상대닉 받아온 후 할당
            setOtherNick(nickname);

            dispatch(
                join({
                    room_id: room.room_id,
                    // r_password: room.r_password,
                    // user_id: room.user_id,
                    guest_id: guest,
                    // r_state: true,
                })
            );
            console.log("디스패치 액션!");
            // 게임 화면 표시
            setGameOver(false);
            // 게임 정보 업데이트
            setRoom({
                room_id: room.room_id,
                user_id: room.user_id,
                guest_id: guest,
            });
            // console.log("상대 입장 시 변경된 룸 스테이트 ", room);
        });
        socket.on("saveNick", (saveNick) => {
            setOtherNick(saveNick);
        });
    }, [dispatch, roomId, room, rooms, otherNick]);

    // 서버로부터 게임 종료 이벤트를 받았을때 (상대가 먼저 죽었을 경우)
    socket.on("game_over_to_client", async () => {
        setWinner(realUserId);

        setGameOver(true);

        console.log("결과 전송 엑시오스!!!!");
        await axios.patch(`${process.env.REACT_APP_API_SERVER}/matchResult`, {
            winUserId: realUserId.userId,
            loseUserId:
                realUserId.userId === room.user_id
                    ? room.guest_id
                    : room.user_id,
        });
        socket.disconnect();
        console.log("이거 realUserId.userId ??? :: ", realUserId.userId);

        //axios
        await axios.delete(
            `${process.env.REACT_APP_API_SERVER}/room/${room.room_id}`
        );
    });

    const exit = async () => {
        socket.disconnect();
        //axios
        await axios.delete(
            `${process.env.REACT_APP_API_SERVER}/room/${room.room_id}`
        );
        navigate("/waiting");
    };

    return (
        <div className="Game">
            {room.guest_id === null ? (
                <div className="Waiting">
                    <h2>Waiting for players...</h2>
                    <div className="loader"></div>
                    <button className="exit" onClick={exit}>
                        나가기
                    </button>
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
                    otherNick={otherNick}
                    myNick={realUserId.userNickname}
                />
            )}
        </div>
    );
};

export default Game;
