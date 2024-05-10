const socketIO = require("socket.io");

function socketHandler(server) {
    const io = socketIO(server, {
        cors: {
            origin: true,
            credentials: true,
        },
    });

    let rooms = {}; // {room_id, r_name, r_password, userId}
    let chats = {}; // {userid, chat}
    let users = {}; // {userId}

    io.on("connection", (socket) => {
        // 채팅
        // 입장 알림
        socket.on("userData", (nickname) => {
            socket.broadcast.emit("notice", {
                type: "notice",
                content: `${nickname}님이 입장하셨습니다.`,
                nickname: nickname, // socket.id 보냄
            });
        });

        // 채팅 전송
        socket.on("send", (chatData) => {
            io.emit("sendChat", {
                chat: chatData.chat,
                nickname: chatData.nickname,
            });
        });
    });

    // 연결 해제
}

module.exports = socketHandler;
