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

// GET /rooms
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

// POST /room
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

// PATCH /room/:roomId
exports.patchRoom = async (req, res) => {
    try {
        const { roomId } = req.params;
        const [isUpdated] = await roomsModel.update(
            { r_status: sequelize.literal("NOT r_status") }, // 현재값과 반대
            { where: { room_id: roomId } }
        );
        isUpdated
            ? res.status(200).send({ result: true, roomId })
            : res.status(404).send({ result: false }); // 존재하지 않는 room_id
    } catch (error) {
        console.log("error", error);
        res.status(500).send("server error");
    }
};

// DELETE /room/:roomId
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
            : res.status(404).send({ result: false }); // 존재하지 않는 room_id
    } catch (error) {
        console.log("error", error);
        res.status(500).send("server error");
    }
};
