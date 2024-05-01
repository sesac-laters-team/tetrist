import { useCallback, useEffect, useState } from "react";
import Notice from "../chat/Notice";
import Speech from "../chat/Speech";
import "../../styles/chat/chat.scss";

export default function WaitingChat({ socket }) {
    const [user, setUser] = useState(null); // 일단 socket.id 보관중이지만 차후 아이디(닉네임) 필요
    const [chatInput, setChatInput] = useState("");
    const [chatList, setChatList] = useState([]);
    // [{type: "me", content: "내 채팅"}, {type: "other", content: "상대 채팅"}]

    useEffect(() => {
        socket.on("notice", (notice) => {
            const newChatList = [
                ...chatList,
                {
                    type: notice.type,
                    content: notice.content,
                    userid: notice.userid,
                },
            ];

            setUser(notice.userid);
            setChatList(newChatList);

            console.log("newchatlist>>", newChatList);
        });
    }, [chatList]);

    useEffect(() => {
        socket.on("chatInfo", (userid) => {
            setUser(userid); // socket.id 저장
        });
    }, [socket]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (chatInput.trim() === "") return setChatInput("");

        const sendChat = {
            chat: chatInput,
            userid: socket.id, // 본인의 소켓 ID를 직접 넣어줍니다.
        };

        socket.emit("send", sendChat);
        setChatInput("");
    };
    const addChatList = useCallback(
        (chatContent) => {
            const type = chatContent.userid === socket.id ? "me" : "other"; // socket.id와 비교하여 나인지 판단합니다.
            const content = chatContent.chat;

            setChatList((prevList) => [
                ...prevList,
                {
                    type: type,
                    content: content,
                },
            ]);
        },
        [] // 의존성 배열에서 socket.id 제거
    );

    useEffect(() => {
        socket.on("sendChat", addChatList);
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
