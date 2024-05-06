const socketIO = require("socket.io");
const { usersModel } = require("../models");

function tetrisSocketHandler(server) {
    const io = socketIO(server, {
        cors: {
            origin: true,
            credentials: true,
        },
    });

    io.on("connection", (socket) => {
        // 입장 이벤트
        socket.on("game_enter", (creator, guest) => {
            socket.join("game");
            // 콘솔 확인용 룸정보
            const gameInfo = io.sockets.adapter.rooms.get("game");
            console.log("gameInfo ::: ", gameInfo);
            console.log(`${creator}가 게임 생성`);
            console.log(gameInfo.size);
            if (gameInfo.size === 2) {
                socket.to("game").emit("game_enter_notice", guest);
            }
        });
        // 방에 참가하기
        // socket.on("joinRoom", (roomId, userId, guestId) => {
        //     socket.join(`room`, () => {
        //         console.log(
        //             `~~~~${guestId}가 ${userId}의  ${roomId} 번 방에 참가했습니다.`
        //         );
        //     });
        // });
        // 상태정보 이벤트
        socket.on("send_states_to_server", (object) => {
            // 상태정보 전달 이벤트
            socket.to("game").emit("send_states_to_client", object);
        });
        // 게임종료 이벤트
        socket.on("game_over_to_server", () => {
            console.log("게임종료");
            socket.to("game").emit("game_over_to_client");
        });

        socket.on("disconnect", () => {
            console.log(`${socket.id} ::: disconnect`);
            // socket.to("game").emit("player_disconnect");
        });
    });
}

module.exports = tetrisSocketHandler;
