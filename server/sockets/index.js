// const socketIO = require("socket.io");

// function socketHandler(server) {
//     const io = socketIO(server, {
//         cors: {
//             origin: "http://localhost:3000",
//         },
//     });

//     // {room_id, r_name, r_status, user_id}

//     let rooms = {}; // 방 정보를 저장하는 객체
//     // const roomId = socket.id; // 방 ID를 소켓 ID로 설정
//     // rooms[roomId] = {
//     //     title: title,
//     //     board: Array(19).fill(Array(19).fill(null)), // 19x19 게임 보드 초기화
//     //     turn: 'black', // 시작 차례
//     //     players: [socket.id] // 플레이어 목록

//     //     [ 추가 ! ]
//     //     timer: "sec30", // 타이머 선택
//     //     roomPw: 1234, // 방 비밀번호

//     // };

//     io.on("connection", (socket) => {
//         console.log("클라이언트 아이디 ::: ", socket.id);

//         socket.emit("resTest", "서버로 보내는 메세지");
//         socket.on("test", (msg) => {
//             console.log(msg);
//         });

//         // 방 만들기
//         socket.on("createRoom", (title, timer, roomPw, roomId, roomIndex) => {
//             if (Object.values(rooms).includes(roomId)) {
//                 // [입장 실패]
//                 // 방 아이디가 이미 rooms에 존재할 때
//                 socket.emit("err", "이미 존재하는 방입니다.");
//             } else {
//                 // [입장 성공]
//                 // rooms에 방 정보 넣기
//                 rooms[roomId] = {
//                     title: title,
//                     timer: timer,
//                     roomPw: roomPw,
//                     roomId: roomId,
//                     roomIndex: roomIndex,
//                     // nextID: nextID,
//                     players: [roomId],
//                 };

//                 console.log(
//                     `${socket.id}의 제목은 ${title}, 시간은 ${timer}, 비밀번호는 ${roomPw}, 방 아이디는 ${roomId} 방 번호는 ${roomIndex}입니다.`
//                 );

//                 // 모두에게 방 리스트 전달
//                 io.emit(
//                     "newRoomList",
//                     rooms[roomId].title,
//                     rooms[roomId].timer,
//                     rooms[roomId].roomPw,
//                     rooms[roomId].roomId,
//                     rooms[roomId].roomIndex
//                     // rooms[roomId].nextID
//                 );
//             }
//         });

//         // 방에 참가하기
//         socket.on("joinRoom", (roomId) => {
//             socket.join(roomId);
//             console.log(`${socket.id}가 '${roomId}' 방에 참가했습니다.`);
//         });

//         // 방 나가기
//         socket.on("leaveRoom", (roomId) => {
//             socket.leave(roomId);
//             rooms[roomId].players = rooms[roomId].players.filter(
//                 (id) => id !== socket.id
//             );
//             if (rooms[roomId].players.length === 0) {
//                 delete rooms[roomId];
//                 console.log(`방 '${roomId}'이 비었습니다.`);
//             } else {
//                 io.to(roomId).emit("leftRoom", socket.id);
//             }
//         });

//         // 연결 해제
//         socket.on("disconnect", () => {
//             console.log(`${socket.id} 연결 해제`);
//             // 모든 방에서 플레이어 제거
//             for (let roomId in rooms) {
//                 rooms[roomId].players = rooms[roomId].players.filter(
//                     (id) => id !== socket.id
//                 );
//                 if (rooms[roomId].players.length === 0) {
//                     delete rooms[roomId];
//                     console.log(`방 '${roomId}'이 비었습니다.`);
//                 } else {
//                     io.to(roomId).emit("leftRoom", socket.id);
//                 }
//             }
//         });
//     });
// }

// module.exports = socketHandler;

const socketIO = require("socket.io");

function socketHandler(server) {
    const io = socketIO(server, {
        cors: {
            origin: "http://localhost:3000",
        },
    });

    // {room_id, r_name, r_status, user_id}
    let rooms = {}; // 방 정보를 저장하는 객체

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
                    // room_id: room_id,
                    // user_id: user_id,
                };

                // console.log(
                //     `${socket.id}의 제목은 ${r_name}, 방 아이디는 ${room_id}, 유저 이름은 ${user_id}, 방 상태는 ${r_status}.`

                // );

                console.log(
                    `${socket.id}의 제목은 ${r_name}, 방 상태는 ${r_status}.`
                );

                // 모두에게 방 리스트 전달
                io.emit(
                    "newRoomList",
                    rooms[r_name].r_name,
                    // rooms[room_id].room_id,
                    // rooms[room_id].user_id,
                    rooms[r_name].r_status
                );
            }
        });

        // 방에 참가하기
        socket.on("joinRoom", (roomId) => {
            socket.join(roomId);
            console.log(`${socket.id}가 '${roomId}' 방에 참가했습니다.`);
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
