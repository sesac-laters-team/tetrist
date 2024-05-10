const { usersModel, roomsModel } = require("../models");
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

// 접속 제한 유저 확인
async function checkPenalty(req, res, next) {
    const findUserData = await usersModel.findOne({
        where: {
            email: req.body.email,
        },
    });
    if (!findUserData.access_penalty) {
        // 로그인 성공
        next();
    } else {
        // 로그인 제한
        res.status(401).send({
            result: false,
            msg: "접속이 제한된 유저입니다. 관리자에게 문의하세요.",
        });
    }
}

module.exports = { checkAuth, checkPenalty };
