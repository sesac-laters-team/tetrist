export default function Speech({ chat }) {
    console.log("chat: ", chat);
    // chat = {type: "me", content: "내 채팅", name: "상대 이름"},{type: "other", content: "상대 채팅"}
    // chat = {content, type}
    return (
        <>
            <div className={`speech ${chat.type}`}>
                {chat.type === "other" && (
                    <span className="nickname">{chat.name}</span>
                )}
                <span className="chat-box">{chat.content}</span>
            </div>
        </>
    );
}
