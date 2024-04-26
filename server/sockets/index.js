const socketIO = require("socket.io");

function socketHandler(server) {
    const io = socketIO(server, {
        cors: {
            origin: "http://localhost:3000",
        },
    });

    io.on("connection", (socket) => {
        console.log("클라이언트 아이디 : ", socket.id);

        // 연결 해제
        socket.on("disconnect", () => {
            console.log(`${socket.id} 연결 해제`);
        });
    });
}

module.exports = socketHandler;
