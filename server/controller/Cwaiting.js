const { roomsModel } = require("../models");
const { usersModel } = require("../models");

// GET /waiting
exports.getWaiting = async (req, res) => {
    try {
        const waitingList = await roomsModel.findAll();
        // console.log("서버에 저장된 데이터 입니다.....", waitingList);
        res.json(waitingList);
    } catch (err) {
        console.log("server error!");
        res.status(500).send("SERVER ERROR!, 관리자에게 문의바랍니다.");
    }
};

exports.postWaiting = async (req, res) => {
    // {room_id, r_name, r_status, user_id}
    try {
        const roomInfo = req.body;
        await roomsModel.create({
            r_name: roomInfo.r_name, // 방 제목
            r_status: roomInfo.r_status,
        });
        res.send({ isSuccess: true });
    } catch (error) {
        console.log("server error!", error);
        res.status(500).send("SERVER ERROR!, 관리자에게 문의바랍니다.");
    }
};
