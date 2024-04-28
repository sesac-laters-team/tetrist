const socketIO = require("socket.io");

function socketHandler(server) {
    const io = socketIO(server, {
        cors: {
            origin: "http://localhost:3000",
        },
    });

    let rooms = {}; // 방 정보를 저장하는 객체
    // const roomId = socket.id; // 방 ID를 소켓 ID로 설정
    // rooms[roomId] = {
    //     title: title,
    //     board: Array(19).fill(Array(19).fill(null)), // 19x19 게임 보드 초기화
    //     turn: 'black', // 시작 차례
    //     players: [socket.id] // 플레이어 목록

    //     [ 추가 ! ]
    //     timer: "sec30", // 타이머 선택
    //     roomPw: 1234, // 방 비밀번호

    // };

    io.on("connection", (socket) => {
        console.log("클라이언트 아이디 ::: ", socket.id);

        // 방 만들기
        socket.on("createRoom", (title, timer, roomPw, roomId) => {
            if (Object.values(rooms).includes(roomId)) {
                // [입장 실패]
                // 방 아이디가 이미 rooms에 존재할 때
                socket.emit("err", "이미 존재하는 방입니다.");
            } else {
                // [입장 성공]
                // rooms에 방 정보 넣기
                rooms[roomId] = {
                    title: title,
                    timer: timer,
                    roomPw: roomPw,
                    roomId: roomId,
                    players: [roomId],
                };

                console.log(
                    `${socket.id}의 제목은 ${title}, 시간은 ${timer}, 비밀번호는 ${roomPw}, 방 아이디는 ${roomId}입니다.`
                );

                // 모두에게 방 리스트 전달
                io.emit(
                    "newRoomList",
                    rooms[roomId].title,
                    rooms[roomId].timer,
                    rooms[roomId].roomPw,
                    rooms[roomId].roomId
                );
            }

            // socket.join(roomId);

            // io.to(roomId).emit('roomCreated', rooms[roomId]);
        });

        // 방에 참가하기
        socket.on("joinRoom", (roomId) => {
            socket.join(roomId);
            // rooms[roomId].players.push(socket.id);
            // io.to(roomId).emit("joinedRoom", {
            //     roomId, // 만든 사람 socket.id
            //     players: rooms[roomId].players, // 만든 사람 + 참여한 사람
            // });
            console.log(`${socket.id}가 '${roomId}' 방에 참가했습니다.`);
        });

        // 방 나가기
        socket.on("leaveRoom", (roomId) => {
            socket.leave(roomId);
            rooms[roomId].players = rooms[roomId].players.filter(
                (id) => id !== socket.id
            );
            if (rooms[roomId].players.length === 0) {
                delete rooms[roomId];
                console.log(`방 '${roomId}'이 비었습니다.`);
            } else {
                io.to(roomId).emit("leftRoom", socket.id);
            }
        });

        // 게임 진행
        socket.on("move", ({ x, y, player, roomId }) => {
            const room = rooms[roomId]; // 방 ID에 따라 방 정보를 가져옴
            if (room && room.board[x][y] === null && room.turn === player) {
                room.board[x][y] = player; // 보드 업데이트
                room.turn = player === "black" ? "white" : "black"; // 턴 교체
                io.to(roomId).emit("game update", {
                    board: room.board,
                    turn: room.turn,
                });
            }
        });

        // 무르기 기능
        socket.on("undo", ({ roomId }) => {
            const room = rooms[roomId];
            if (room && room.history.length > 0) {
                const prevState = room.history.pop(); // 이전 상태를 히스토리에서 꺼냄
                room.board = prevState; // 보드 상태를 이전 상태로 되돌림
                room.turn = room.turn === "black" ? "white" : "black"; // 턴도 이전으로 되돌림
                io.to(roomId).emit("game update", {
                    board: room.board,
                    turn: room.turn,
                });
            }
        });

        // 연결 해제
        socket.on("disconnect", () => {
            console.log(`${socket.id} 연결 해제`);
            // 모든 방에서 플레이어 제거
            for (let roomId in rooms) {
                rooms[roomId].players = rooms[roomId].players.filter(
                    (id) => id !== socket.id
                );
                if (rooms[roomId].players.length === 0) {
                    delete rooms[roomId];
                    console.log(`방 '${roomId}'이 비었습니다.`);
                } else {
                    io.to(roomId).emit("leftRoom", socket.id);
                }
            }
        });
    });
}

module.exports = socketHandler;
