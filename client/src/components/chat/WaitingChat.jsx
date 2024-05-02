import React, { useCallback, useEffect, useState } from "react";
import Notice from "../chat/Notice";
import Speech from "../chat/Speech";
import "../../styles/chat/chat.scss";

export default function WaitingChat({ socket }) {
    const [user, setUser] = useState(null); // 현재 사용자의 ID (나중에 닉네임으로 변경 가능)
    const [chatInput, setChatInput] = useState(""); // 사용자 입력
    const [chatList, setChatList] = useState([]); // 채팅 목록

    // 서버로부터 채팅 관련 공지를 수신
    useEffect(() => {
        const handleNotice = (notice) => {
            setChatList((prevChatList) => [
                ...prevChatList,
                {
                    type: notice.type,
                    content: notice.content,
                    userid: notice.userid,
                },
            ]);
            setUser(notice.userid);
        };

        socket.on("notice", handleNotice);
        return () => {
            socket.off("notice", handleNotice);
        };
    }, [socket]);

    // 서버로부터 채팅 정보 수신 (사용자 ID 등)
    useEffect(() => {
        const handleChatInfo = (userid) => {
            setUser(userid);
        };

        socket.on("chatInfo", handleChatInfo);
        return () => {
            socket.off("chatInfo", handleChatInfo);
        };
    }, [socket]);

    // 채팅을 서버로 전송
    const handleSubmit = (e) => {
        e.preventDefault();
        if (chatInput.trim() === "") {
            setChatInput("");
            return;
        }

        const sendChat = {
            chat: chatInput,
            userid: user,
        };
        socket.emit("send", sendChat);
        setChatInput("");
    };

    // 채팅 리스트에 채팅 추가
    const addChatList = useCallback(
        (chatContent) => {
            const type = chatContent.userid === user ? "me" : "other";
            const content = chatContent.chat;

            setChatList((prevChatList) => [
                ...prevChatList,
                {
                    type: type,
                    content: content,
                },
            ]);
        },
        [user]
    );

    // 서버로부터 채팅 수신
    useEffect(() => {
        socket.on("sendChat", addChatList);
        return () => {
            socket.off("sendChat", addChatList);
        };
    }, [addChatList]);

    return (
        <>
            <ul>
                <div className="chat-container">
                    <span className="chat-title">채팅</span>
                    <br />
                    <section className="chat-section">
                        {chatList.map((chat, i) =>
                            chat.type === "notice" ? (
                                <Notice key={i} chat={chat} />
                            ) : (
                                <Speech key={i} chat={chat} />
                            )
                        )}
                    </section>
                    <form
                        className="waiting-chat"
                        id="waiting-chat"
                        onSubmit={handleSubmit}
                    >
                        <input
                            type="text"
                            placeholder="채팅 입력"
                            value={chatInput}
                            onChange={(e) => setChatInput(e.target.value)}
                        />
                        <button>입력</button>
                    </form>
                </div>
            </ul>
        </>
    );
}
