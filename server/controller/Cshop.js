const { usersModel, productsModel, userPurchaseModel } = require("../models");

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
