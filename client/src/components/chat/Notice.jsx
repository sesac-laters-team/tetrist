export default function Notice({ chat }) {
    return (
        <>
            <div className="notice">{chat.content}</div>
        </>
    );
}
