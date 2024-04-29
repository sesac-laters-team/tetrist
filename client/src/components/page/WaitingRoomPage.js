import { useRef, useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import RoomList from "../waitingRoom/RoomList";
import io from "socket.io-client";
import CreateRoom from "../waitingRoom/CreateRoom";
import Menubar from "../waitingRoom/Menubar";
// 모듈 설치 필요
import Pagination from "react-js-pagination";

const socket = io.connect("http://localhost:8081", {
    autoConnect: false,
});

export default function WaitingRoomPage() {
    const dispatch = useDispatch();

    // socket 연결
    const initSocketConnect = () => {
        if (!socket.connected) socket.connect();
    };

    useEffect(() => {
        initSocketConnect();
    }, []);

    // 방 만들기 modal state
    const [createModal, setCreateModal] = useState(false);
    const outside = useRef();

    // pagiation
    const [page, setPage] = useState(1);

    const handlePageChange = (page) => {
        setPage(page);
    };

    return (
        <div className="waiting-room">
            <div className="logo-and-menubar">
                <div className="logoImg">TETRIST</div>
                <Menubar socket={socket} />
            </div>
            <br />

            <div className="ListTitle">
                <span className="roomListTitle">방 목록</span>
                <button
                    onClick={() => setCreateModal(true)}
                    className="btnRoom btnPush btnJoin"
                >
                    방 만들기
                </button>
            </div>

            <RoomList socket={socket} />
            {/* <RoomList /> */}

            <Pagination
                activePage={page} // 현재 페이지
                itemsCountPerPage={5} // 한 페이지랑 보여줄 아이템 갯수
                totalItemsCount={25} // 총 아이템 갯수
                pageRangeDisplayed={5} // paginator의 페이지 범위
                prevPageText={"<"} // "이전"을 나타낼 텍스트
                nextPageText={">"} // "다음"을 나타낼 텍스트
                onChange={handlePageChange} // 페이지 변경을 핸들링하는 함수
            ></Pagination>
            {createModal && (
                <div
                    className="modal-outside"
                    ref={outside}
                    onClick={(e) => {
                        if (e.target === outside.current) {
                            setCreateModal(false);
                        }
                    }}
                >
                    <div className="create-modal">
                        {createModal === true ? (
                            <CreateRoom
                                socket={socket}
                                setCreateModal={setCreateModal}
                            />
                        ) : null}
                    </div>
                </div>
            )}
        </div>
    );
}
