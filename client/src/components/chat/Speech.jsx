export default function Speech({ chat }) {
    console.log(chat);
    // chat = {type: "me", content: "내 채팅", name: "상대 이름"},{type: "other", content: "상대 채팅"}
    return (
        <>
            <div className={`speech ${chat.type}`}>
                {chat.type === "other" && (
                    <span className="nickname">{chat.name}</span>
                )}
                <span className="msg-box">{chat.content}</span>
            </div>
        </>
    );
}
