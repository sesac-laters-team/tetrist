const socketIO = require("socket.io");

function tetrisSocketHandler(server) {
    const io = socketIO(server, {
        cors: {
            origin: "http://localhost:3000",
        },
    });

    io.on("connection", (socket) => {
        console.log("클라이언트 아이디 ::: ", socket.id);

        socket.on("enter", () => {
            socket.join("room");
            const roomInfo = io.sockets.adapter.rooms.get("room");
            console.log("roomInfo ::: ", roomInfo);
        });

        socket.on("send_states_to_server", (object) => {
            socket.to("room").emit("send_states_to_client", object);
        });

        socket.on("disconnect", () => {
            console.log(`${socket.id} ::: disconnect`);
        });
    });
}

module.exports = tetrisSocketHandler;
