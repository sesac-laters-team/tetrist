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
    const itemsPerPage = 5;

    // 페이지 변경 핸들러
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber); // 페이지가 변경될 때마다 currentPage 상태 업데이트
    };

    async function getWaitingList() {
        try {
            const res = await axios.get(`http://localhost:8080/api-server/rooms
            `);
            console.log("getWaitingList :: ", res.data);
            // {room_id, r_name, r_password, r_status, user_id}
            if (res.data) {
                // 서버에서 받아온 데이터를 rooms에 추가
                dispatch(init(res.data));
            }
        } catch (error) {
            console.error("Error fetching waiting list: ", error);
        }
    }

    // // 새로운 방 추가
    // async function postWaitingList(r_name) {
    //     try {
    //         // axios post
    //         const res = await axios.post(
    //             `http://localhost:8080/api-server/room`,
    //             {
    //                 r_name,
    //                 // r_password,
    //             }
    //         );
    //         console.log("postWaitingList :: ", res.data);
    //     } catch (error) {
    //         console.error("Error posting waiting list: ", error);
    //     }
    // }

    useEffect(() => {
        getWaitingList();
    }, [currentPage]);

    // useEffect(() => {
    //     // 새 방 만들기
    //     socket.on("newRoomList", (r_name, r_status) => {
    //         // {room_id, r_name, r_status, user_id}
    //         dispatch(
    //             create({
    //                 r_name: r_name,
    //                 room_id: nextID,
    //                 user_id: Number(socket.id), // 임시로 socket.id로 받아 놓았음
    //                 r_status: r_status,
    //             })
    //         );
    //         console.log(`${r_name} 방 생성 완료`);

    //         // 새로운 방 생성 시 서버에 추가
    //         postWaitingList(r_name, r_status);
    //     });
    // }, []);

    useEffect(() => {
        socket.on("newRoomList", (r_name) => {
            console.log("룸 이름은 :: ", r_name);
        });
    }, []);

    const gameJoin = async (room) => {
        console.log("방 인덱스 :: ", room.room_id); // state에 저장되어 있는 방 전체 데이터
        const joinUser = await axios.get(
            `http://localhost:8080/api-server/room/${room.room_id}`,
            { roomId: room.room_id }
        );
        // 유저 아이디, 닉네임 필요.. 혹시 테마 적용할 시 구매 이력도 필요
        console.log("서버에서 보내는 값:: ", joinUser.data);

        // 차후에 dispatch로 r_state 관리 필요

        socket.emit(
            "joinRoom",
            room.room_id,
            joinUser.room,
            joinUser.creatorData
        );
        console.log(`참여방 제목은 ${room.r_name}`);
        navigate("/tetris");
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
                                    <button onClick={() => gameJoin(room)}>
                                        입장
                                    </button>
                                </li>
                            ))}
                    </ul>
                </div>
            </section>
            <Pagination
                activePage={currentPage}
                itemsCountPerPage={itemsPerPage}
                totalItemsCount={rooms.length}
                pageRangeDisplayed={5}
                prevPageText={"<"}
                nextPageText={">"}
                onChange={handlePageChange}
            />
        </div>
    );
}
