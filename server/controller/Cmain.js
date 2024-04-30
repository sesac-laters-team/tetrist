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
        const { name, password } = req.body;
        console.log(req.session.userId, name, password);
        await roomsModel.create({
            user_id: req.session.userId,
            r_name: name,
            r_password: password,
        });
        res.send({ result: true });
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
