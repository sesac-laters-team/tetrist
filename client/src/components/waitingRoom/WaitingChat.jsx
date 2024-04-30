import { useEffect } from "react";
import io from "socket.io-client";

const socket = io.connect("http://localhost:8080", {
    autoConnect: false,
});

export default function WaitingChat({ socket }) {
    const initSocketConnect = () => {
        if (!socket.connected) socket.connect();
    };

    const [msgInput, setMsgInput] = useState("");
    const [chatList, setChatList] = useState([]);

    useEffect(() => {
        initSocketConnect();
    }, []);

    return (
        <>
            <ul>
                <div className="chat-container">
                    <section></section>
                    <form className="waiting-chat" id="waiting-chat">
                        <input type="text" placeholder="채팅" />
                        <button>입력</button>
                    </form>
                </div>
            </ul>
        </>
    );
}
