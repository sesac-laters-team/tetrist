const { roomsModel } = require("../models");
const { Op } = require("sequelize");

// 로그인 상태 확인
function checkAuth(req, res, next) {
    if (req.session.userId) {
        // 로그인된 상태
        next();
    } else {
        // 로그인되지 않은 상태
        res.status(401).send({
            result: false,
            msg: "로그인 후 이용할 수 있습니다.",
        });
    }
}

// 참여 중인 방이 있는지 확인
const userInRoom = async (req, res, next) => {
    try {
        const findUser = await roomsModel.findOne({
            where: {
                [Op.or]: [
                    { user_id: req.session.userId },
                    { guest_id: req.session.userId },
                ],
            },
        });
        if (!findUser) {
            next();
        } else {
            res.status(409).send({
                result: false,
                msg: "이미 참여 중인 방이 있습니다.",
            });
        }
    } catch (error) {
        console.log("error", error);
        res.status(500).send("server error");
    }
};

module.exports = { checkAuth, userInRoom };
