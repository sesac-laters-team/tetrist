import { useEffect, useState } from "react";
import Notice from "../chat/Notice";
import Speech from "../chat/Speech";

export default function WaitingChat({ socket }) {
    const [user, setUser] = useState(null); // 일단 socket.id 보관중이지만 차후 아이디(닉네임) 필요
    const [chatInput, setChatInput] = useState("");
    const [chatList, setChatList] = useState([]);
    // [{type: "me", content: "내 채팅"}, {type: "other", content: "상대 채팅"}]

    useEffect(() => {
        socket.on("notice", (notice) => {
            const newChatList = [
                ...chatList,
                { type: "notice", content: notice },
            ];

            setChatList(newChatList);
        });
    }, [chatList]);

    useEffect(() => {
        socket.on("chatInfo", (userid) => {
            setUser(userid); // socket.id 저장
        });
    }, [socket]);

    useEffect(() => {
        socket.on("sendChat", (chat) => {
            console.log(chatList);

            const type = chat.userid === user ? "me" : "other";
            const content = chat.chat;
            const newChatList = [
                ...chatList,
                {
                    type: type,
                    content: content,
                },
            ];

            setChatList(newChatList);
        });
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (chatInput.trim() === "") return setChatInput("");

        const sendChat = {
            chat: chatInput,
            userid: user,
        };

        socket.emit("send", sendChat);
        setChatInput("");
    };

    return (
        <>
            <ul>
                <div className="chat-container">
                    <span>채팅</span>
                    <br />
                    <section>
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
