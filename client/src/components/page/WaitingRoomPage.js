import { useRef, useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import RoomList from "../waitingRoom/RoomList";
import io from "socket.io-client";
import CreateRoom from "../waitingRoom/CreateRoom";
import Menubar from "../waitingRoom/Menubar";
import WaitingChat from "../chat/WaitingChat";

const socket = io.connect(`${process.env.REACT_APP_CHAT_SERVER}`, {
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

            <div>
                <WaitingChat socket={socket}></WaitingChat>
            </div>

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
