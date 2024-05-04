import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import TimerRadio from "./TimerRadio";
import TimerRadioGroup from "./TimerRadioGroup";
import axios from "axios";
import { create } from "../../redux/store/module/waiting";
import { createGame } from "../../redux/store/module/gameRoom";
axios.defaults.withCredentials = true;

export default function CreateRoom({ socket }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [pwInput, setPwInput] = useState("");
    const nextID = useSelector((state) => state.waiting.nextID);

    const handleNewRoom = async (e) => {
        e.preventDefault();

        const r_name = e.target.roomTitle.value;
        const r_password = e.target.roomPw.value.trim();

        if (r_name.trim() === "") {
            alert("방 제목은 공백일 수 없습니다.");
        } else {
            try {
                // 서버에 새로운 방 정보를 추가하는 POST 요청
                const res = await axios.post(
                    `${process.env.REACT_APP_API_SERVER}/room`,
                    {
                        r_name,
                        r_password,
                    }
                );

                // 방 정보, 방장 정보
                const userId = res.data.userId;
                const roomId = res.data.roomId;
                console.log("방 아이디:: ", roomId);

                // 새로운 방 정보를 Redux store에 추가
                dispatch(
                    create({
                        r_name: r_name,
                        r_password: r_password,
                        userId: userId,
                        room_id: roomId,
                    })
                );

                console.log(
                    `방 번호 ${roomId}의 제목은 ${r_name} 인 방이 추가 되었습니다.`
                );

                // socket.emit("createRoom", r_name, r_password, userId);
                // socket.on("err", (errMsg) => {
                //     alert(errMsg);
                //     setPwInput("");
                //     r_name = "";
                // });

                // 게임 페이지로 이동
                navigate(`/waiting/${roomId}`);
            } catch (error) {
                console.error("Error creating new room:", error);
            }
        }
    };

    const checkSpacebar = (e) => {
        if (e.code === "Space") {
            setPwInput("");
            alert("비밀번호는 space 입력이 불가능합니다.");
        }
    };

    return (
        <div className="CreateRoom">
            {/* 모달 */}
            <div className="modal">
                <div className="modal-body">
                    <form className="newRoom" onSubmit={handleNewRoom}>
                        <label>
                            방 제목
                            <input
                                type="text"
                                className="roomTitle"
                                name="roomTitle"
                                placeholder="방 제목"
                            />
                        </label>
                        <br />
                        {/* <label>
                            시간 선택
                            <TimerRadioGroup label="시간선택">
                                <TimerRadio
                                    name="time"
                                    value="sec30"
                                    defaultChecked
                                >
                                    00:30
                                </TimerRadio>
                                <TimerRadio name="time" value="sec60">
                                    01:00
                                </TimerRadio>
                                <TimerRadio name="time" value="sec90">
                                    01:30
                                </TimerRadio>
                            </TimerRadioGroup>
                        </label>
                        <br /> */}
                        <label>
                            비밀번호
                            <input
                                type="text"
                                name="roomPw"
                                className="roomPw"
                                value={pwInput.trim()}
                                onKeyDown={checkSpacebar}
                                onChange={(e) => setPwInput(e.target.value)}
                                placeholder="비밀번호"
                            />
                        </label>
                        <label>
                            <button type="submit" className="newRoomSubmit">
                                방 만들기
                            </button>
                        </label>
                    </form>
                </div>
            </div>
        </div>
    );
}
