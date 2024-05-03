import { useRef, useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import RoomList from "../waitingRoom/RoomList";
import io from "socket.io-client";
import CreateRoom from "../waitingRoom/CreateRoom";
import Menubar from "../waitingRoom/Menubar";
import WaitingChat from "../chat/WaitingChat";

const socket = io.connect("http://localhost:8081", {
    autoConnect: false,
});

export default function WaitingRoomPage() {
    const dispatch = useDispatch();
    // const [userSess, setUserSess] = useState(null);

    // socket 연결
    const initSocketConnect = () => {
        if (!socket.connected) socket.connect();
    };

    useEffect(() => {
        initSocketConnect();

        // [ 추가 ]
        // 여기서 로그인 상태 관리하는 값 필요..
        // const getSession = axios.get(`http://localhost:8080/api-server`);
        // setUserSess(getSession);
        // console.log("getSession: ");
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
