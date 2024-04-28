import { useState, useEffect, useRef } from "react";
import RoomList from "../waitingRoom/RoomList";
import io from "socket.io-client";
import CreateRoom from "../waitingRoom/CreateRoom";
import Menubar from "../waitingRoom/Menubar"

// It's good practice to move this configuration to a config file or similar
const socket = io.connect("http://localhost:8081", {
    autoConnect: false,
});

export default function WaitingRoomPage() {
    const [createModal, setCreateModal] = useState(false);
    const outside = useRef();

    useEffect(() => {
        if (!socket.connected) {
            socket.connect();
        }
    }, []);

    const handleOutsideClick = (e) => {
        if (e.target === outside.current) {
            setCreateModal(false);
        }
    };

    return (
        <div className="waiting-room">
            <div className="logo-and-menubar">
            <div className="logoImg">TETRIST</div>
                <Menubar  socket={socket} />
                
            </div>

       <div className="ListTitle">
  <span className="roomListTitle">방 목록</span>
  <button onClick={() => setCreateModal(true)} className="btnRoom btnPush btnJoin">
      방 만들기
  </button>
</div>

            <RoomList socket={socket} />
            
            {createModal && (
                <div className="modal-outside" ref={outside} onClick={handleOutsideClick}>
                    <div className="create-modal">
                        <CreateRoom socket={socket} setCreateModal={setCreateModal} />
                    </div>
                </div>
            )}
        </div>
    );
}