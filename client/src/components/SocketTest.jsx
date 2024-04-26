import React, { useEffect, useRef, useState } from "react";
import io from "socket.io-client";

const socket = io.connect("http://localhost:8081", {
    autoConnect: false,
});

export default function SocketTest() {
    const initSocketConnect = () => {
        if (!socket.connected) socket.connect();
    };

    useEffect(() => {
        initSocketConnect();
    }, []);

    const inputValue = useRef();
    const [input, setInput] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        socket.emit("test", inputValue.current.value);
    };

    socket.on("resTest", (message) => {
        setInput(message);
    });

    return (
        <>
            <p>소켓 통신 테스트</p>
            <form className="msg-form" id="msg-form" onSubmit={handleSubmit}>
                <input type="text" placeholder="메시지" ref={inputValue} />
                <br />
                <button>전송!</button>
                <p>서버 응답 : {input}</p>
            </form>
        </>
    );
}
