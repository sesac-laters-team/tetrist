const socketIO = require("socket.io");

function tetrisSocketHandler(server) {
    const io = socketIO(server, {
        cors: {
            origin: "http://localhost:3000",
        },
    });

    io.on("connection", (socket) => {
        console.log("클라이언트 아이디 ::: ", socket.id);
        // 입장 이벤트
        socket.on("enter", () => {
            socket.join("room");
            // 콘솔 확인용 룸정보
            const roomInfo = io.sockets.adapter.rooms.get("room");
            console.log("roomInfo ::: ", roomInfo);
        });
        // 상태정보 이벤트
        socket.on("send_states_to_server", (object) => {
            // 상태정보 전달 이벤트
            socket.to("room").emit("send_states_to_client", object);
        });
        // 게임종료 이벤트
        socket.on("game_over_to_server", (guest) => {
            console.log(guest);

            socket.to("room").emit("game_over_to_client", "you win");
        });

        socket.on("disconnect", () => {
            console.log(`${socket.id} ::: disconnect`);
        });
    });
}

module.exports = tetrisSocketHandler;
