const { usersModel, roomsModel } = require("../models");

// GET /api-server/rooms
// 방 목록 전체 조회
exports.roomsList = async (req, res) => {
    try {
        const roomsList = await roomsModel.findAll();
        res.json(roomsList);
    } catch (error) {
        console.log("error", error);
        res.status(500).send("server error");
    }
};

// POST /api-server/room
// 방 추가
exports.postRoom = async (req, res) => {
    try {
        const { r_name, r_password } = req.body;
        const createRoom = await roomsModel.create({
            user_id: req.session.userId,
            r_name: r_name,
            r_password: r_password,
        });
        if (createRoom) {
            if (!r_password) {
                res.status(201).send({
                    result: true,
                    userId: createRoom.user_id,
                    userNickname: createRoom.nickname,
                    roomId: createRoom.room_id,
                    private: false,
                    msg: "공개방이 생성되었습니다.",
                });
            } else {
                res.status(201).send({
                    result: true,
                    userId: createRoom.user_id,
                    userNickname: createRoom.nickname,
                    roomId: createRoom.room_id,
                    private: true,
                    msg: "비공개방이 생성되었습니다.",
                });
            }
        } else {
            // res.status(400).send({
            res.send({
                result: false,
                msg: "방 생성에 실패했습니다. 다시 시도해주세요.",
            });
        }
    } catch (error) {
        console.log("error", error);
        res.status(500).send("server error");
    }
};

// GET /api-server/room/:roomId
// 특정 방 데이터 받아오기
exports.roomData = async (req, res) => {
    try {
        const { roomId } = req.params;
        const room = await roomsModel.findOne({
            where: {
                room_id: roomId,
            },
        });
        if (room) {
            const creator = await usersModel.findOne({
                where: {
                    user_id: room.user_id,
                },
            });
            if (!creator) {
                // res.status(404).send({
                res.send({
                    result: false,
                    msg: "방장 유저 정보를 찾을 수 없습니다.",
                });
                return;
            }
            const guest = await usersModel.findOne({
                where: {
                    user_id: room.guest_id,
                },
            });
            res.status(200).send({
                result: true,
                roomData: room,
                creatorData: creator,
                guestData: guest,
                msg: "룸 정보 확인",
            });
        } else {
            // res.status(404).send({
            res.send({
                result: false,
                msg: "룸 정보를 찾을 수 없습니다.",
            });
        }
    } catch (error) {
        console.log("error", error);
        res.status(500).send("server error");
    }
};

// POST /api-server/room/enter/:roomId
// 만들어진 방에 다른 유저가 입장 요청
exports.enterRoom = async (req, res) => {
    try {
        const { roomId } = req.params;
        const { r_password } = req.body;

        const findRoom = await roomsModel.findOne({
            where: {
                room_id: roomId,
            },
        });
        const findGuest = await usersModel.findOne({
            where: {
                user_id: req.session.userId,
            },
        });
        if (findRoom) {
            // 공개방인 경우
            if (!findRoom.r_password) {
                if (!findRoom.guest_id) {
                    const enterRoom = await roomsModel.update(
                        { guest_id: req.session.userId },
                        { where: { room_id: roomId } }
                    );
                    // 입장 성공
                    if (enterRoom > 0) {
                        res.status(200).send({
                            result: true,
                            guestId: findGuest.user_id,
                            guestNickname: findGuest.nickname,
                            private: false,
                            msg: "공개 방에 입장했습니다.",
                        });
                    } else {
                        // res.status(400).send({
                        res.send({
                            result: false,
                            msg: "공개 방 입장 실패. 다시 시도해주세요.",
                        });
                    }
                } else {
                    // 방에 guest_id가 이미 존재
                    // res.status(409).send({
                    res.send({
                        result: false,
                        msg: "인원이 가득 찼습니다. 공개 방에 입장할 수 없습니다.",
                    });
                }
                // 비밀방인 경우
            } else {
                if (r_password === findRoom.r_password) {
                    // 비밀번호 일치
                    if (!findRoom.guest_id) {
                        const enterRoom = await roomsModel.update(
                            { guest_id: req.session.userId },
                            { where: { room_id: roomId } }
                        );
                        // 입장 성공
                        if (enterRoom > 0) {
                            res.status(200).send({
                                result: true,
                                guestId: findGuest.user_id,
                                guestNickname: findGuest.nickname,
                                private: true,
                                msg: "비공개 방에 입장했습니다.",
                            });
                        } else {
                            // res.status(400).send({
                            res.send({
                                result: false,
                                msg: "비공개 방 입장 실패. 다시 시도해주세요.",
                            });
                        }
                    } else {
                        // 방에 guest_id가 이미 존재
                        // res.status(409).send({
                        res.send({
                            result: false,
                            msg: "인원이 가득 찼습니다. 비공개 방에 입장할 수 없습니다.",
                        });
                    }
                } else {
                    // 비밀번호 불일치
                    // res.status(401).send({
                    res.send({
                        result: false,
                        msg: "비밀번호가 일치하지 않습니다.",
                    });
                }
            }
        } else {
            // res.status(404).send({
            res.send({
                result: false,
                msg: "방 정보를 찾을 수 없습니다.",
            });
        }
    } catch (error) {
        console.log("error", error);
        res.status(500).send("server error");
    }
};

// POST /api-server/room/leave/:roomId
// 만들어진 방에 입장했던 다른 유저가 퇴장
exports.leaveRoom = async (req, res) => {
    try {
        const { roomId } = req.params;

        const leaveRoom = await roomsModel.update(
            { guest_id: null },
            { where: { room_id: roomId } }
        );
        if (leaveRoom > 0) {
            res.status(200).send({
                result: true,
                roomId: roomId,
                msg: "게스트 유저가 퇴장했습니다.",
            });
        } else {
            res.status(400).send({
                result: false,
                msg: "이미 퇴장했거나, 존재하지 않는 방입니다.",
            });
        }
    } catch (error) {
        console.log("error", error);
        res.status(500).send("server error");
    }
};

// PATCH /api-server/room/:roomId
// 게임 시작 시 방 게임 상태 전환
exports.patchRoom = async (req, res) => {
    try {
        const { roomId } = req.params;
        const updateState = await roomsModel.update(
            { r_status: true },
            { where: { room_id: roomId } }
        );
        if (updateState > 0) {
            res.status(200).send({
                result: true,
                roomId,
                msg: "방이 게임 중 상태로 전환되었습니다.",
            });
        } else {
            res.status(404).send({
                result: false,
                msg: "이미 게임 중이거나, 존재하지 않는 방입니다.",
            });
        }
    } catch (error) {
        console.log("error", error);
        res.status(500).send("server error");
    }
};

// DELETE /api-server/room/:roomId
// 방 삭제
exports.deleteRoom = async (req, res) => {
    try {
        const { roomId } = req.params;
        const deleteRoom = await roomsModel.destroy({
            where: { room_id: roomId },
        });
        if (deleteRoom > 0) {
            res.status(200).send({
                result: true,
                roomId: roomId,
                msg: "게임 방이 삭제되었습니다.",
            });
        } else {
            res.status(404).send({
                result: false,
                msg: "존재하지 않는 방입니다.",
            });
        }
    } catch (error) {
        console.log("error", error);
        res.status(500).send("server error");
    }
};
