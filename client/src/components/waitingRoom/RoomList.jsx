import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';

import { addRoom } from '../../redux/reducers/roomReducer.js';


export default function RoomList({ socket }) {
    const dispatch = useDispatch();
    const rooms = useSelector(state => state.room.rooms);
    const navigate = useNavigate();
    

    useEffect(() => {
        if (!socket.connected) socket.connect();

        const onNewRoomList = (title, timer, roomPw, roomId, roomIndex) => {
            dispatch(addRoom({
                title,
                timer,
                roomPw,
                roomId,
                roomIndex
            }));
            console.log(`${title} 방 생성 완료`);
        };

        socket.on("newRoomList", onNewRoomList);

        return () => {
            socket.off("newRoomList", onNewRoomList);
        };
    }, [socket, dispatch]);

    const gameJoin = (roomId) => {
        socket.emit("joinRoom", roomId);
        navigate("/game");
    };

    return (
        <div className="RoomList">
            <section className="ShowRoomList">
                <div className="ListRoom">
                    <ul>
                        {rooms.map(room => (
                            <li key={room.roomId}>
                                <span>{room.roomIndex}  {room.title}</span>
                                <button onClick={() => gameJoin(room.roomId)}>입장</button>
                            </li>
                        ))}
                    </ul>
                </div>
            </section>
        </div>
    );
}
