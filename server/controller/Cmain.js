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
        // matchResult: 승패에 따른 값, 1이 승리, 0이 패배

        /* 포인트를 프론트에서 지정
        const { userId, ratePoint, shopPoint, matchResult } = req.body; */
        /* 포인트를 백에서 지정 */
        const { userId, matchResult } = req.body;
        const winRP = 50;
        const loseRP = 20;
        const winSP = 100;
        const loseSP = 50;

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

        // 승패 여부에 따라 데이터 처리
        if (matchResult > 0) {
            // 승리 시
            /*
            const updateRating = findUser.rating + Number(ratePoint);
            const updatePoint = findUser.point + Number(shopPoint); */
            const updateRating = findUser.rating + winRP;
            const updatePoint = findUser.point + winSP;
            const winUser = await usersModel.update(
                {
                    rating: updateRating,
                    point: updatePoint,
                    win: findUser.win + 1,
                },
                {
                    where: {
                        user_id: userId,
                    },
                }
            );

            if (winUser > 0) {
                res.status(200).send({
                    result: true,
                    msg: "승리 유저 정보가 변경되었습니다.",
                });
            } else {
                res.status(400).send({
                    result: false,
                    msg: "승리 유저 정보가 변경되지 않았습니다.",
                });
            }
        } else {
            // 패배 시
            /*
            let updateRating = findUser.rating - Number(ratePoint);
            const updatePoint = findUser.point + Number(shopPoint);
            // 승점이 -가 되지 않도록
            if (updateRating < 0) {
                updateRating = 0;
            } */
            // 승점이 -가 되지 않도록
            const updateRating =
                findUser.rating >= loseRP ? findUser.rating - loseRP : 0;
            const updatePoint = findUser.point + loseSP;
            const loseUser = await usersModel.update(
                {
                    rating: updateRating,
                    point: updatePoint,
                    lose: findUser.lose + 1,
                },
                {
                    where: {
                        user_id: userId,
                    },
                }
            );

            if (loseUser > 0) {
                res.status(200).send({
                    result: true,
                    msg: "패배 유저 정보가 변경되었습니다.",
                });
            } else {
                res.status(400).send({
                    result: false,
                    msg: "패배 유저 정보가 변경되지 않았습니다.",
                });
            }
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
