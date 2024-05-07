import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { create } from "../../redux/store/module/waiting";
import { useNavigate } from "react-router-dom";
// 모듈 설치 필요
import Pagination from "react-js-pagination";
import axios from "axios";
import { init, join } from "../../redux/store/module/waiting";
import Modal from "../common/commonmodal";
axios.defaults.withCredentials = true;

export default function RoomList({ socket }) {
    const dispatch = useDispatch();
    const rooms = useSelector((state) => state.waiting.rooms);
    const nextID = useSelector((state) => state.waiting.nextID);
    const navigate = useNavigate();

    const [countRoom, setCountRoom] = useState(null);
    const [createModal, setCreateModal] = useState({});

    // pagiation
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    // 페이지 변경 핸들러
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber); // 페이지가 변경될 때마다 currentPage 상태 업데이트
    };

    async function getWaitingList() {
        try {
            const res =
                await axios.get(`${process.env.REACT_APP_API_SERVER}/rooms
            `);
            console.log("getWaitingList :: ", res.data);
            // {room_id, r_name, r_password, r_status, user_id, guest_id}
            if (res.data) {
                // 서버에서 받아온 데이터를 rooms에 추가
                dispatch(init(res.data));

                // 인원 저장
                setCountRoom(res.data.guestId);
            }
        } catch (error) {
            console.error("Error fetching waiting list: ", error);
        }
    }
    useEffect(() => {
        getWaitingList();
    }, [currentPage]);

    // useEffect(() => {
    //     socket.on("newRoomList", (r_name) => {
    //         console.log("룸 이름은 :: ", r_name);
    //     });
    // }, []);

    const gameJoin = async (room) => {
        // console.log("방 인덱스 :: ", room.room_id); // state에 저장되어 있는 방 전체 데이터
        if (room.guest_id === "2/2") {
            return;
        }

        // 서버에서 방 조회
        const searchRoom = await axios.get(
            `${process.env.REACT_APP_API_SERVER}/room/${room.room_id}`,
            { roomId: room.room_id }
        );

        if (searchRoom.data.roomData.r_password) {
            setCreateModal({
                modalOpen: true,
                roomInfo: searchRoom.data.roomData,
            });
            return;
        }
        // 서버에서 방 입장
        const joinRoom = await axios.post(
            `${process.env.REACT_APP_API_SERVER}/room/enter/${searchRoom.data.roomData.room_id}`,
            {
                roomId: searchRoom.data.roomData.room_id,
                r_password: searchRoom.data.roomData.r_password,
            }
        );
        console.log("서버에서 보내는 방 참가 :: ", joinRoom.data.guestId);

        if (!searchRoom.data.result) {
            alert(`${searchRoom.data.msg}`);
        } else if (!joinRoom.data.result) {
            alert(`${joinRoom.data.msg}`);
            return;
        }

        socket.emit(
            "joinRoom",
            searchRoom.data.roomData.room_id, // {room_id, r_name, r_password, r_status, guest_id}
            searchRoom.data.roomData.user_id, // {user_id, email, password, nickname}
            joinRoom.data.guestId // guset_id
        );
        console.log(
            `참여방 제목은 ${searchRoom.data.roomData.r_name}, 방장은 ${searchRoom.data.roomData.user_id}, 게스트는 ${joinRoom.data.guestId}`
        );

        dispatch(
            join({
                room_id: searchRoom.data.roomData.room_id,
                // user_id: searchRoom.data.creatorData.user_id,
                // r_name: searchRoom.data.roomData.r_name,
                guest_id: joinRoom.data.guestId,
            })
        );

        navigate(`/waiting/${room.room_id}`);
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
                                    <div>
                                        {room.guest_id === null ? "1/2" : "2/2"}
                                    </div>
                                    <button
                                        onClick={() => gameJoin(room)}
                                        disabled={room.guest_id === "2/2"}
                                    >
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
            {createModal.modalOpen && (
                <Modal
                    type="InsertPw"
                    socket={socket}
                    roomInfo={createModal.roomInfo}
                    closeModal={() => setCreateModal({})}
                />
            )}
        </div>
    );
}
