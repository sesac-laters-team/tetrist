import axios from "axios";
import { useState } from "react";
import { IoClose } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { join } from "../../redux/store/module/waiting";
import { useNavigate } from "react-router-dom";

axios.defaults.withCredentials = true;

// 비밀 방인 경우 방 입장 관리
const InsertPwModal = ({ roomInfo, socket, closeModal }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    // 입력받은 비밀번호 관리
    const [password, setPassword] = useState("");

    const joinRoom = async () => {
        if (password !== roomInfo.r_password) {
            alert("비밀번호가 틀립니다.");
            return;
        } else {
            const response = await axios.post(
                `${process.env.REACT_APP_API_SERVER}/room/enter/${roomInfo.room_id}`,
                {
                    roomId: roomInfo.room_id,
                    r_password: roomInfo.r_password,
                }
            );
            socket.emit(
                "joinRoom",
                roomInfo.room_id, // {room_id, r_name, r_password, r_status, guest_id}
                roomInfo.user_id, // {user_id, email, password, nickname}
                response.data.guestId // guset_id
            );
            console.log(
                `참여방 제목은 ${roomInfo.r_name}, 방장은 ${roomInfo.user_id}, 게스트는 ${response.data.guestId}`
            );

            dispatch(
                join({
                    room_id: roomInfo.room_id,
                    // user_id: searchRoom.data.creatorData.user_id,
                    // r_name: roomInfo.r_name,
                    guest_id: response.data.guestId,
                })
            );

            navigate(`/waiting/${roomInfo.room_id}`);
        }
    };
    return (
        <>
            <div className="insertCntr">
                <div className="pwTitle">
                    <span>비밀번호 입력</span>
                    <IoClose onClick={closeModal} />
                </div>
                <div className="pwContent">
                    <input
                        type="password"
                        placeholder="비밀번호를 입력해주세요."
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div>
                    <input type="button" value="입력" onClick={joinRoom} />
                </div>
            </div>
        </>
    );
};

export default InsertPwModal;
