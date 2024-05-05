export default function Speech({ chat }) {
    const isMyMessage = chat.type === "me"; // 'me'이면 자신의 메시지

    return (
        <div className={`speech ${isMyMessage ? "my-message" : ""}`}>
            {chat.type === "other" && (
                <span className="username">{chat.nickname}</span>
            )}

            <span className="chat-box">{chat.content}</span>
        </div>
    );
}
