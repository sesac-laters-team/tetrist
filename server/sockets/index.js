const socketIO = require("socket.io");

function socketHandler(server) {
    const io = socketIO(server, {
        cors: {
            origin: "http://localhost:3000",
        },
    });

    let rooms = {}; // {room_id, r_name, r_status, user_id}
    let chats = {}; // {userid, chat}

    io.on("connection", (socket) => {
        console.log("클라이언트 아이디 ::: ", socket.id);

        socket.emit("resTest", "서버로 보내는 메세지");
        socket.on("test", (msg) => {
            console.log(msg);
        });

        // 방 만들기
        socket.on("createRoom", (r_name, r_status) => {
            if (Object.values(rooms).includes(r_name)) {
                // [입장 실패]
                // 방 제목이 이미 rooms에 존재할 때
                socket.emit("err", "이미 존재하는 방입니다.");
            } else {
                // [입장 성공]
                // rooms에 방 정보 넣기
                rooms[r_name] = {
                    r_name: r_name,
                    r_status: r_status,
                };

                console.log(
                    `${socket.id}의 제목은 ${r_name}, 방 상태는 ${r_status}.`
                );

                // 모두에게 방 리스트 전달
                io.emit(
                    "newRoomList",
                    rooms[r_name].r_name,
                    rooms[r_name].r_status
                );
            }
        });

        // 방에 참가하기
        socket.on("joinRoom", (roomId) => {
            socket.join(roomId);
            console.log(`${socket.id}가 '${roomId}' 방에 참가했습니다.`);
        });

        // 채팅
        // 입장 알림
        let userid = socket.id; // 임시

        socket.emit("chatInfo", () => {
            chats[userid] = userid; // 현재는 socket.id를 받고 있음
            socket.broadcast.emit(
                "notice",
                `${chats[userid]}님이 입장하셨습니다.`
            );
        });

        // 채팅 전송
        socket.on("send", (chatData) => {
            console.log(chatData);
            // chatData = {chat, userid}
            io.emit("sendChat", {
                chat: chatData.chat,
                userid: chatData.userid,
            });
        });

        // 연결 해제
        // socket.on("disconnect", () => {
        //     console.log(`${socket.id} 연결 해제`);
        //     // 모든 방에서 플레이어 제거
        //     for (let roomId in rooms) {
        //         rooms[roomId].players = rooms[roomId].players.filter(
        //             (id) => id !== socket.id
        //         );
        //         if (rooms[roomId].players.length === 0) {
        //             delete rooms[roomId];
        //             console.log(`방 '${roomId}'이 비었습니다.`);
        //         } else {
        //             io.to(roomId).emit("leftRoom", socket.id);
        //         }
        //     }
        // });
    });
}

module.exports = socketHandler;
