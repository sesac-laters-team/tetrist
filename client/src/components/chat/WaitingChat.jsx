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
            userid: user,
        };
        console.log("서버로 보내는 챗 :: ", sendChat);
        // {chat, userid}
        socket.emit("send", sendChat);
        setChatInput("");
    };

    const addChatList = useCallback(
        (chatContent) => {
            // console.log("소켓아이디 확인용", chatList);
            // {content, type, userid}
            const type = chatContent.userid === user ? "me" : "other";
            const content = chatContent.chat;
            console.log("content가 안들어왔나요?", content);
            const newChatList = [
                ...chatList,
                {
                    type: type,
                    content: content,
                },
            ];

            setChatList(newChatList);
            console.log("소켓아이디 확인용", newChatList);
        },
        [chatList]
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
