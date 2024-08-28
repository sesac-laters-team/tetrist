import React, { useEffect, useState, useRef } from "react";
import Notice from "../chat/Notice";
import Speech from "../chat/Speech";
import "../../styles/chat/chat.scss";
import axios from "axios";
axios.defaults.withCredentials = true;

async function getUserInfo() {
    try {
        const myInfo = await axios.get(
            `${process.env.REACT_APP_API_SERVER}/auth/mypage`
        );
        const userInfo = myInfo && myInfo.data;
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
    const chatSectionRef = useRef(null);

    // 현재 닉네임을 불러옴
    useEffect(() => {
        const fetchUserInfo = async () => {
            const userInfo = await getUserInfo();
            setUserNickname(userInfo);

            socket.emit("userData", userInfo);
        };

        fetchUserInfo();
    }, [socket]);

    // 스크롤을 맨 아래로 이동
    const scrollToBottom = () => {
        if (chatSectionRef.current) {
            chatSectionRef.current.scrollTop =
                chatSectionRef.current.scrollHeight;
        }
    };

    // notice 이벤트 리스너 등록
    useEffect(() => {
        const handleNotice = (notice) => {
            setChatList((prevChatList) => [
                ...prevChatList,
                {
                    type: notice.type,
                    content: notice.content,
                    nickname: notice.nickname,
                },
            ]);
            scrollToBottom(); // 채팅 리스트 업데이트 후 스크롤 이동
        };

        socket.on("notice", handleNotice);

        return () => {
            socket.off("notice", handleNotice); // cleanup 함수에서 이벤트 리스너 제거
        };
    }, [socket]);

    // sendChat 이벤트 리스너 등록
    useEffect(() => {
        const handleSendChat = (data) => {
            const userType = data.nickname === userNickname ? "me" : "other";
            const userContent = data.chat;
            const userNick = data.nickname;

            setChatList((prevChatList) => [
                ...prevChatList,
                {
                    type: userType,
                    content: userContent,
                    nickname: userNick,
                },
            ]);
            scrollToBottom(); // 채팅 리스트 업데이트 후 스크롤 이동
        };

        socket.on("sendChat", handleSendChat);

        return () => {
            socket.off("sendChat", handleSendChat); // cleanup 함수에서 이벤트 리스너 제거
        };
    }, [socket, userNickname]);

    useEffect(() => {
        scrollToBottom(); // 채팅 리스트가 업데이트될 때마다 스크롤을 맨 아래로 이동
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

    return (
        <div className="chat-container">
            <div className="chat-box1">
                <span className="chat-title">채팅</span>
                <br />
                <section className="chat-section" ref={chatSectionRef}>
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
        </div>
    );
}
