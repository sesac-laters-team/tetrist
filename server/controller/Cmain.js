const {
    usersModel,
    roomsModel,
    productsModel,
    userPurchaseModel,
    sequelize,
} = require("../models");

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

// shop

// GET /api-server/shop
// 상점 상품 전체 목록 조회
exports.productsList = async (req, res) => {
    try {
        const productsList = await productsModel.findAll();
        if (productsList) {
            res.status(200).json(productsList);
        } else {
            res.status(400).send({ result: false });
        }
    } catch (error) {
        console.log("error", error);
        res.status(500).send("server error");
    }
};

// GET /api-server/shop/user
// 로그인한 유저가 이미 구매한 상품 목록 조회
exports.ownedList = async (req, res) => {
    try {
        const userOwned = await userPurchaseModel.findAll({
            where: { user_id: req.session.userId },
        });
        if (userOwned) {
            res.status(200).json(userOwned);
        } else {
            res.status(400).send({ result: false });
        }
    } catch (error) {
        console.log("error", error);
        res.status(500).send("server error");
    }
};

// POST /api-server/shop/buy
// 로그인한 유저가 특정 상품을 구매한 데이터 전달
exports.postBuy = async (req, res) => {
    try {
        const { productId, price } = req.body;

        // 이미 구매한 상품인지 확인
        const isBuy = await userPurchaseModel.findOne({
            where: {
                user_id: req.session.userId,
                product_id: productId,
            },
        });
        // 이미 구매한 상품이라면 클라이언트로 에러 메시지 전송
        if (isBuy) {
            res.status(400).send({
                result: false,
                msg: "이미 구매한 상품입니다.",
            });
            return;
        }

        // 구매 유저 정보 확인
        const findUser = await usersModel.findOne({
            where: {
                user_id: req.session.userId,
            },
        });
        if (!findUser) {
            res.status(404).send({
                result: false,
                msg: "유저 정보를 찾을 수 없습니다.",
            });
            return;
        }

        // 유저 포인트 확인
        const updatePoint = findUser.point - Number(price);
        if (updatePoint < 0) {
            res.status(400).send({
                result: false,
                msg: "보유 포인트가 부족합니다.",
            });
            return;
        }
        // 유저 포인트 소모
        const usePoint = await usersModel.update(
            { point: updatePoint },
            {
                where: {
                    user_id: req.session.userId,
                },
            }
        );
        if (!usePoint) {
            res.status(400).send({
                result: false,
                msg: "유저의 구매 포인트 차감에 실패했습니다.",
            });
        }

        // 구매 목록 추가
        const addList = await userPurchaseModel.create({
            user_id: req.session.userId,
            product_id: productId,
        });
        if (addList) {
            res.status(200).send({ result: true, addList: addList });
        } else {
            res.status(400).send({
                result: false,
                msg: "구매 목록 추가에 실패했습니다.",
            });
        }
    } catch (error) {
        console.log("error", error);
        res.status(500).send("server error");
    }
};

// shop /admin

// POST /api-server/admin/shop/add
// 상품 신규 등록
exports.postProduct = async (req, res) => {
    try {
        const { name, type, price, imgName } = req.body;

        // 같은 타입이면서 중복된 이름과 파일명의 상품이 있는 지 확인
        const checkDupName = await productsModel.findOne({
            where: {
                p_type: type,
                p_name: name,
            },
        });
        const checkDupImg = await productsModel.findOne({
            where: {
                p_type: type,
                p_img: imgName,
            },
        });
        if (checkDupName || checkDupImg) {
            res.status(409).send({
                result: false,
                msg: "중복되지 않는 이름과 파일명을 입력해주세요.",
            });
            return;
        }

        const newProduct = await productsModel.create({
            p_name: name,
            p_type: type,
            p_img: imgName,
            p_price: price,
        });
        if (newProduct) {
            res.status(200).send({ result: true, newProduct: newProduct });
        } else {
            res.status(400).send({
                result: false,
                msg: "상품을 등록할 수 없습니다.",
            });
        }
    } catch (error) {
        console.log("error", error);
        res.status(500).send("server error");
    }
};

// PATCH /api-server/admin/shop/:productId
// 등록된 상품 수정
exports.patchProduct = async (req, res) => {
    try {
        const { productId } = req.params;
        const { name, type, imgName, price } = req.body;

        // 같은 타입이면서 중복된 이름과 파일명의 상품이 있는 지 확인
        const checkDupName = await productsModel.findOne({
            where: {
                p_type: type,
                p_name: name,
            },
        });
        const checkDupImg = await productsModel.findOne({
            where: {
                p_type: type,
                p_img: imgName,
            },
        });
        if (checkDupName || checkDupImg) {
            res.status(409).send({
                result: false,
                msg: "중복되지 않는 이름과 파일명을 입력해주세요.",
            });
            return;
        }

        const values = {
            p_name: name,
            p_type: type,
            p_img: imgName,
            p_price: price,
        };
        const updatedProduct = await productsModel.update(values, {
            where: { product_id: productId },
        });
        if (updatedProduct) {
            res.status(200).send({
                result: true,
                updatedProduct: values,
            });
        } else {
            res.status(400).send({
                result: false,
                msg: "상품 정보를 수정할 수 없습니다.",
            });
        }
    } catch (error) {
        console.log("error", error);
        res.status(500).send("server error");
    }
};

// DELETE /api-server/admin/shop/:productId
// 등록된 상품 삭제
exports.deleteProduct = async (req, res) => {
    try {
        const { productId } = req.params;
        const deletedProduct = await productsModel.destroy({
            where: { product_id: productId },
        });
        if (deletedProduct) {
            res.status(200).send({ result: true, msg: "상품 삭제 성공" });
        } else {
            res.status(400).send({ result: false, msg: "상품 삭제 실패" });
        }
    } catch (error) {
        console.log("error", error);
        res.status(500).send("server error");
    }
};
