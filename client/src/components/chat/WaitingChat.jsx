import React, { useCallback, useEffect, useState } from "react";
import Notice from "../chat/Notice";
import Speech from "../chat/Speech";
import "../../styles/chat/chat.scss";
import axios from "axios";
axios.defaults.withCredentials = true;

async function getUserInfo() {
    try {
        const myInfo = await axios.get(
            `http://localhost:8080/api-server/auth/mypage`
        );
        const userInfo = myInfo && myInfo.data;
        console.log("userInfo >> ", userInfo.data.nickname);
        return userInfo.data.nickname;
    } catch (error) {
        console.error("Error fetching user info:", error);
        return null;
    }
}

export default function WaitingChat({ socket }) {
    const [chatInput, setChatInput] = useState("");
    const [chatList, setChatList] = useState([]); // {type, content, nickname}
    const [userNickname, setUserNickname] = useState("");

    // 현재 닉네임을 불러옴
    useEffect(() => {
        const fetchUserInfo = async () => {
            const userInfo = await getUserInfo();
            console.log("현재 아이디 >>> ", userInfo);
            setUserNickname(userInfo);

            socket.emit("userData", userInfo);
        };

        fetchUserInfo();
    }, [socket]);

    // notice
    useEffect(() => {
        socket.on("notice", (notice) => {
            const newChatList = [
                ...chatList,
                {
                    type: notice.type,
                    content: notice.content,
                    nickname: notice.nickname,
                },
            ];

            setChatList(newChatList);
        });
    }, [chatList]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (chatInput.trim() === "") {
            setChatInput("");
            return;
        }

        const sendChat = {
            chat: chatInput,
            nickname: userNickname,
        };
        socket.emit("send", sendChat);
        setChatInput("");
    };

    useEffect(() => {
        socket.on("sendChat", (data) => {
            const userType = data.nickname === userNickname ? "me" : "other";
            const userContent = data.chat;
            const userNick = data.nickname;

            const newChatList = [
                ...chatList,
                {
                    type: userType,
                    content: userContent,
                    nickname: userNick,
                },
            ];
            setChatList(newChatList);
        });
    });

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
