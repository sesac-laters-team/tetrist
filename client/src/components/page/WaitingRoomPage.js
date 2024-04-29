import { useRef, useState, useEffect } from "react";
import RoomList from "../waitingRoom/RoomList";
import io from "socket.io-client";
import CreateRoom from "../waitingRoom/CreateRoom";
import Menubar from "../waitingRoom/Menubar";

const socket = io.connect("http://localhost:8081", {
    autoConnect: false,
});

export default function WaitingRoomPage() {
    // socket 연결
    const initSocketConnect = () => {
        console.log("소켓 연결 완료. 웨이팅 페이지");
        if (!socket.connected) socket.connect();
    };

    useEffect(() => {
        initSocketConnect();
    }, []);

    // 방 만들기 modal state
    const [createModal, setCreateModal] = useState(false);
    const outside = useRef();

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
