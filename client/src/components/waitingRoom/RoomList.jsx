import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { create } from "../../redux/store/module/waiting";
import { useNavigate } from "react-router-dom";

export default function RoomList({ socket }) {
    const dispatch = useDispatch();
    const rooms = useSelector((state) => state.waiting.rooms);
    const nextID = useSelector((state) => state.waiting.nextID);
    const navigate = useNavigate();

    const initSocketConnect = () => {
        if (!socket.connected) socket.connect();
    };

    useEffect(() => {
        initSocketConnect();
    }, []);

    useEffect(() => {
        // 새 방 만들기
        socket.on("newRoomList", (title, timer, roomPw, roomId, roomIndex) => {
            dispatch(
                create({
                    title: title,
                    timer: timer,
                    roomPw: roomPw,
                    roomId: roomId,
                    roomIndex: nextID, // roomIndex를 roomId로 수정해야 할 수도 있습니다.
                })
            );
            console.log(`${title} 방 생성 완료`);
        });
    }, [socket]);

    const gameJoin = (roomId) => {
        socket.emit("joinRoom", roomId); // 방 참가시 룸 아이디 보내기
        console.log(`방 아이디는 ${roomId}`);
        navigate("/game"); // navigate 함수가 어디서 온 것인지 확인이 필요합니다.
    };

    return (
        <div className="RoomList">
            <section className="ShowRoomList">
                <div className="ListRoom">
                    <ul>
                        {rooms.map((room) => (
                            <li key={room.roomId}>
                                <span>
                                    {room.roomIndex} {room.title}
                                </span>
                                <button onClick={() => gameJoin(room.roomId)}>
                                    입장
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            </section>
        </div>
    );
}
