export default function Notice({ chat }) {
    // chat={
    //     type: "notice",
    //     content: "~~입장하셨습니댜",
    // },
    return (
        <>
            <div className="notice">{chat.content}</div>
        </>
    );
}
