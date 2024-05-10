const { where } = require("sequelize");
const { usersModel } = require("../models");

// GET /api-server
exports.index = async (req, res) => {
    if (req.session.userId) {
        res.send({
            isLogin: true,
            userId: req.session.userId, // cookie : {}
        });
    } else {
        res.send({ isLogin: false });
    }
};

// PATCH /api-server/matchResult
exports.matchResult = async (req, res) => {
    try {
        /* 포인트를 백에서 지정 */
        const { winUserId, loseUserId } = req.body;
        const winRP = 50;
        const loseRP = 20;

        // 기존 사용자의 point 조회
        const findWinner = await usersModel.findOne({
            where: {
                user_id: winUserId,
            },
        });
        if (!findWinner) {
            res.send({
                result: false,
                msg: "승리 유저 정보를 찾을 수 없습니다.",
            });
            return;
        }
        const findLoser = await usersModel.findOne({
            where: {
                user_id: loseUserId,
            },
        });
        if (!findLoser) {
            res.send({
                result: false,
                msg: "패배 유저 정보를 찾을 수 없습니다.",
            });
            return;
        }

        // 승패 여부에 따라 데이터 처리
        // 승리 유저
        const winUpdateRating = findWinner.rating + winRP;
        const winUser = await usersModel.update(
            {
                rating: winUpdateRating,
                win: findWinner.win + 1,
            },
            {
                where: {
                    user_id: winUserId,
                },
            }
        );
        // 패배 유저
        // 승점이 -가 되지 않도록
        const updateRating =
            findLoser.rating >= loseRP ? findLoser.rating - loseRP : 0;
        const loseUser = await usersModel.update(
            {
                rating: updateRating,
                lose: findLoser.lose + 1,
            },
            {
                where: {
                    user_id: loseUserId,
                },
            }
        );

        if (winUser > 0 && loseUser > 0) {
            res.status(200).send({
                result: true,
                msg: "유저 정보가 변경되었습니다.",
            });
        } else {
            res.status(400).send({
                result: false,
                msg: "유저 정보가 변경되지 않았습니다.",
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
            attributes: ["rating", "nickname"],
            limit: 3,
            order: [["rating", "DESC"]],
        });
        res.json(rank);
    } catch (error) {
        console.log("error", error);
        res.status(500).send("server error");
    }
};

// GET /api-server/modalBackgroundColor
// 배경색 값을 클라이언트에 전송
exports.getModalBackgroundColor = async (req, res) => {
    try {
        const theme = await usersModel.findOne({
            where: {
                user_id: req.session.userId,
            },
        });

        res.send({ data: theme });
    } catch (error) {
        console.log("error", error);
        res.status(500).send("server error");
    }
};
