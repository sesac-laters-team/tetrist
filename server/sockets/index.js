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
        // // 방 만들기
        // socket.on("createRoom", (r_name, r_password, userId) => {
        //     if (Object.values(rooms).includes(userId)) {
        //         // [입장 실패]
        //         // 아이디 하나 당 방 하나
        //         socket.emit(
        //             "err",
        //             "방은 한 아이디 당 하나만 만들 수 있습니다."
        //         );
        //     } else {
        //         // [입장 성공]
        //         // rooms에 방 정보 넣기
        //         rooms[userId] = {
        //             r_name: r_name,
        //             r_password: r_password,
        //             userId: userId,
        //         };

        //         console.log(
        //             `방장 ${userId}의 방제는 ${r_name}, 방 비밀번호는 ${r_password}.`
        //         );

        //         // // 모두에게 방 리스트 전달
        //         io.emit(
        //             "newRoomList",
        //             rooms[userId].r_name,
        //             rooms[userId].r_password,
        //             rooms[userId].userId
        //             // rooms[r_name].r_status
        //         );
        //     }
        // });

        // // 방에 참가하기
        // socket.on("joinRoom", (roomId, userId) => {
        //     socket.join(`${roomId}`, () => {
        //         console.log(`~~~~${userId}의  ${roomId} 번 방에 참가했습니다.`);
        //     });
        // });

        // 채팅
        // 입장 알림
        socket.on("userData", (nickname) => {
            // chats[nickname] = nickname;

            socket.broadcast.emit("notice", {
                type: "notice",
                content: `${nickname}님이 입장하셨습니다.`,
                nickname: nickname, // socket.id 보냄
            });
        });

        // 채팅 전송
        socket.on("send", (chatData) => {
            console.log(chatData);
            // chatData = // {chat, nickname}
            io.emit("sendChat", {
                chat: chatData.chat,
                nickname: chatData.nickname,
            });
        });
    });

    // 연결 해제
}

module.exports = socketHandler;
