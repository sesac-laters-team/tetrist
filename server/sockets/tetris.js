const socketIO = require("socket.io");
const { usersModel } = require("../models");

function tetrisSocketHandler(server) {
    const io = socketIO(server, {
        cors: {
            origin: true,
            credentials: true,
        },
    });
    let saveNick = "";

    io.on("connection", (socket) => {
        // 입장 이벤트
        socket.on("game_enter", (creator, guest, nickname) => {
            socket.join("game");
            // 콘솔 확인용 룸정보

            const gameInfo = io.sockets.adapter.rooms.get("game");
            console.log("gameInfo ::: ", gameInfo);
            console.log(`${creator}가 게임 생성`);
            console.log(gameInfo.size);
            if (gameInfo.size === 1) {
                saveNick = nickname;
            }
            if (gameInfo.size === 2) {
                socket.to("game").emit("game_enter_notice", guest, nickname);
                io.to("game").emit("saveNick", saveNick);
            }
        });
        // 상태정보 이벤트
        socket.on("send_states_to_server", (object) => {
            // 상태정보 전달 이벤트
            socket.to("game").emit("send_states_to_client", object);
        });
        // 게임종료 이벤트
        socket.on("game_over_to_server", () => {
            socket.to("game").emit("game_over_to_client");
        });

        socket.on("disconnect", () => {
            console.log(`${socket.id} ::: disconnect`);
            const remain = io.sockets.adapter.rooms.get("game");
        });
    });
}

module.exports = tetrisSocketHandler;
