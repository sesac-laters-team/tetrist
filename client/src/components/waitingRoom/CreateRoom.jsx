import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import TimerRadio from "./TimerRadio";
import TimerRadioGroup from "./TimerRadioGroup";
import axios from "axios";
import { create } from "../../redux/store/module/waiting";

export default function CreateRoom({ socket }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [pwInput, setPwInput] = useState("");

    const handleNewRoom = async (e) => {
        e.preventDefault();

        const r_name = e.target.roomTitle.value;
        const r_status = true; // 일단 처음 만들어질 때 방을 true로 설정

        if (r_name.trim() === "") {
            alert("방 제목은 공백일 수 없습니다.");
        } else {
            try {
                // 서버에 새로운 방 정보를 추가하는 POST 요청
                const res = await axios.post(`http://localhost:8081/waiting`, {
                    r_name,
                    r_status,
                });
                console.log("postWaitingList :: ", res.data);

                // 새로운 방 정보를 Redux store에 추가
                dispatch(
                    create({
                        r_name: r_name,
                        room_id: res.data.room_id,
                        user_id: socket.id,
                        r_status: r_status,
                    })
                );

                // 게임 페이지로 이동
                navigate("/game");
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
                        <label>
                            시간 선택
                            {/* 시간 선택 라디오 그룹 */}
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
                        <br />
                        <label>
                            비밀번호
                            <input
                                type="text"
                                name="roomPw"
                                value={pwInput.trim()}
                                onKeyDown={checkSpacebar}
                                onChange={(e) => setPwInput(e.target.value)}
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
