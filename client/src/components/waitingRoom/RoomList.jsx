import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { create } from "../../redux/store/module/waiting";
import { useNavigate } from "react-router-dom";
// 모듈 설치 필요
import Pagination from "react-js-pagination";
import axios from "axios";
import { init } from "../../redux/store/module/waiting";

export default function RoomList({ socket }) {
    const dispatch = useDispatch();
    const rooms = useSelector((state) => state.waiting.rooms);
    const nextID = useSelector((state) => state.waiting.nextID);
    const navigate = useNavigate();

    // pagiation
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5; // 한 페이지에 표시할 아이템의 최대 개수

    // 페이지 변경 핸들러
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber); // 페이지가 변경될 때마다 currentPage 상태 업데이트
    };

    async function getWaitingList() {
        try {
            const res = await axios.get(`http://localhost:8081/waiting`);
            console.log("getWaitingList :: ", res.data);
            if (res.data) {
                // 서버에서 받아온 데이터를 rooms에 추가
                dispatch(init(res.data));
            }
        } catch (error) {
            console.error("Error fetching waiting list: ", error);
        }
    }

    // 새로운 방을 서버에 추가하는 함수
    async function postWaitingList(r_name, r_status) {
        try {
            // axios post
            const res = await axios.post(`http://localhost:8081/waiting`, {
                r_name,
                r_status,
            });
            console.log("postWaitingList :: ", res.data);
        } catch (error) {
            console.error("Error posting waiting list: ", error);
        }
    }

    useEffect(() => {
        getWaitingList();
    }, [currentPage]);

    useEffect(() => {
        // 새 방 만들기
        socket.on("newRoomList", (r_name, r_status) => {
            // {room_id, r_name, r_status, user_id}
            dispatch(
                create({
                    r_name: r_name,
                    room_id: nextID,
                    user_id: Number(socket.id),
                    r_status: r_status,
                })
            );
            console.log(`${r_name} 방 생성 완료`);

            // 새로운 방을 생성할 때마다 서버에 데이터 추가
            postWaitingList(r_name, r_status);
        });
    }, []);

    const gameJoin = (room_id) => {
        socket.emit("joinRoom", room_id); // 방 참가시 룸 아이디 보내기
        console.log(`방 아이디는 ${room_id}`);
        navigate("/game");
    };

    return (
        <div className="RoomList">
            <section className="ShowRoomList">
                <div className="ListRoom">
                    <ul>
                        {rooms
                            .slice(
                                (currentPage - 1) * itemsPerPage,
                                currentPage * itemsPerPage
                            )
                            .map((room) => (
                                <li key={room.room_id}>
                                    <span>
                                        {room.room_id} {room.r_name}
                                    </span>
                                    <button
                                        onClick={() => gameJoin(room.user_id)}
                                    >
                                        입장
                                    </button>
                                </li>
                            ))}
                    </ul>
                </div>
            </section>
            <Pagination
                activePage={currentPage} // 현재 페이지
                itemsCountPerPage={itemsPerPage} // 한 페이지에 보여줄 아이템 수
                totalItemsCount={rooms.length} // 전체 아이템 수는 방 목록의 길이
                pageRangeDisplayed={5} // 표시할 페이지 범위
                prevPageText={"<"} // 이전 페이지로 가는 버튼 텍스트
                nextPageText={">"} // 다음 페이지로 가는 버튼 텍스트
                onChange={handlePageChange} // 페이지 변경 핸들러
            />
        </div>
    );
}
