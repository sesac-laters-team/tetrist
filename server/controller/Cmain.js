const { usersModel, roomsModel, sequelize } = require("../models");

exports.index = async (req, res) => {
    if (req.session.userId) {
        res.send({
            isLogin: true,
            userId: req.session.userId,
        });
    } else {
        res.send({ isLogin: false });
    }
};

// PATCH /api-server/patchPoint
exports.patchPoint = async (req, res) => {
    try {
        // calc: 승패에 따른 승점을 계산하기 위한 값, 1 플러스, 0이 마이너스
        const { userId, ratePoint, calc } = req.body;

        // 기존 사용자의 point 조회
        const findUser = await usersModel.findOne({
            where: {
                user_id: userId,
            },
        });
        if (!findUser) {
            res.status(404).send({
                result: false,
                msg: "유저 정보를 찾을 수 없습니다.",
            });
            return;
        }

        // 승패 여부에 따라 기존 point 값에 ratePoint 더하거나 빼기
        const updatePoint = Number(calc)
            ? findUser.point + Number(ratePoint)
            : findUser.point - Number(ratePoint);

        const isUpdated = await usersModel.update(
            {
                point: updatePoint,
            },
            {
                where: {
                    user_id: userId,
                },
            }
        );

        if (isUpdated > 0) {
            res.status(200).send({
                result: true,
                msg: "포인트가 변경되었습니다.",
            });
        } else {
            res.send({
                result: false,
                msg: "포인트가 변경되지 않았습니다.",
            });
        }
    } catch (error) {
        console.log("error", error);
        res.status(500).send("server error");
    }
};

// GET /api-server/rank
// point 높은 순 10위까지 랭킹 조회
exports.rank = async (req, res) => {
    try {
        const rank = await usersModel.findAll({
            attributes: ["point", "nickname"],
            limit: 10,
            order: [["point", "DESC"]],
        });
        res.json(rank);
    } catch (error) {
        console.log("error", error);
        res.status(500).send("server error");
    }
};

// room

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
        res.send({
            result: true,
            userId: createRoom.user_id,
            roomId: createRoom.room_id,
        });
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
        const creator = await usersModel.findOne({
            where: {
                user_id: room.user_id,
            },
        });
        const guest = await usersModel.findOne({
            where: {
                user_id: room.guest_id,
            },
        });

        if (room) {
            res.status(200).send({
                result: true,
                roomData: room,
                creatorData: creator,
                guestData: guest,
                msg: "룸 정보 확인",
            });
        } else {
            res.status(404).send({
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

        // 공개방인 경우
        if (!findRoom.r_password) {
            if (!findRoom.guest_id) {
                // 입장 성공
                await roomsModel.update(
                    { guest_id: req.session.userId },
                    { where: { room_id: roomId } }
                );
                res.send({
                    result: true,
                    guestId: req.session.userId,
                });
            } else {
                // 방에 guest_id가 이미 존재
                res.status(409).send({
                    result: false,
                    msg: "인원이 가득 찼습니다. 입장할 수 없습니다.",
                });
            }
            // 비밀방인 경우
        } else {
            if (r_password === findRoom.r_password) {
                // 비밀번호 일치
                if (!findRoom.guest_id) {
                    // 입장 성공
                    await roomsModel.update(
                        { guest_id: req.session.userId },
                        { where: { room_id: roomId } }
                    );
                    res.send({
                        result: true,
                        guestId: req.session.userId,
                    });
                } else {
                    // 방에 guest_id가 이미 존재
                    res.status(409).send({
                        result: false,
                        msg: "인원이 가득 찼습니다. 입장할 수 없습니다.",
                    });
                }
            } else {
                // 비밀번호 불일치
                res.status(401).send({
                    result: false,
                    msg: "비밀번호가 일치하지 않습니다.",
                });
            }
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

        await roomsModel.update(
            { guest_id: null },
            { where: { room_id: roomId } }
        );
        res.send({ result: true, roomId: roomId });
    } catch (error) {
        console.log("error", error);
        res.status(500).send("server error");
    }
};

// PATCH /api-server/room/:roomId
// 방 게임 상태 전환
exports.patchRoom = async (req, res) => {
    try {
        const { roomId } = req.params;
        const [isUpdated] = await roomsModel.update(
            { r_status: sequelize.literal("NOT r_status") }, // 현재값과 반대
            { where: { room_id: roomId } }
        );
        isUpdated
            ? res.status(200).send({ result: true, roomId })
            : res
                  .status(404)
                  .send({ result: false, msg: "존재하지 않는 방입니다." });
    } catch (error) {
        console.log("error", error);
        res.status(500).send("server error");
    }
};

// PATCH /api-server/room/:roomId
// 방 게임 상태 전환
exports.patchRoom = async (req, res) => {
    try {
        const { roomId } = req.params;
        const [isUpdated] = await roomsModel.update(
            { r_status: sequelize.literal("NOT r_status") }, // 현재값과 반대
            { where: { room_id: roomId } }
        );
        isUpdated
            ? res.status(200).send({ result: true, roomId })
            : res
                  .status(404)
                  .send({ result: false, msg: "존재하지 않는 방입니다." });
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
        console.log(roomId);
        const isDeleted = await roomsModel.destroy({
            where: { room_id: roomId },
        });
        console.log(isDeleted);
        isDeleted
            ? res.status(200).send({ result: true, roomId: roomId })
            : res
                  .status(404)
                  .send({ result: false, msg: "존재하지 않는 방입니다." });
    } catch (error) {
        console.log("error", error);
        res.status(500).send("server error");
    }
};
