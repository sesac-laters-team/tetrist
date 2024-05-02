const express = require("express");
const router = express.Router();

const mainCtr = require("../controller/Cmain");

// main

router.get("/", mainCtr.index);

// rank

/**
 * @swagger
 * paths:
 *  /api-server/patchPoint:
 *    patch:
 *      summary: "유저 포인트 변경"
 *      description: " 1: 승리 시 승점 +, 0: 패배 시 승점 -"
 *      tags: [rank]
 *      responses:
 *        "200":
 *          description: 게임 종료 후 승패에 따라 유저 포인트 변경
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                    ok:
 *                      type: boolean
 *                    users:
 *                      type: object
 *                      example:
 *                          [
 *{
    "result": true,
    "msg": "포인트가 변경되었습니다."
}
 *                          ]
 */
router.patch("/patchPoint", mainCtr.patchPoint);

/**
 * @swagger
 * paths:
 *  /api-server/rank:
 *    get:
 *      summary: "포인트 랭킹 조회"
 *      description: ""
 *      tags: [rank]
 *      responses:
 *        "200":
 *          description: 포인트 높은 순 10개 데이터를 포인트와 닉네임만 조회
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                    ok:
 *                      type: boolean
 *                    users:
 *                      type: object
 *                      example:
 *                          [
 *                              {
        "point": 4000,
        "nickname": "유저4"
    },
    {
        "point": 3000,
        "nickname": "유저3"
    },
 *                          ]
 */
router.get("/rank", mainCtr.rank);

// rooms

/**
 * @swagger
 * paths:
 *  /api-server/rooms:
 *    get:
 *      summary: "방 목록 전체조회"
 *      description: ""
 *      tags: [Room]
 *      responses:
 *        "200":
 *          description: 전체 방 목록
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                    ok:
 *                      type: boolean
 *                    users:
 *                      type: object
 *                      example:
 *                          [
 *                              {
        "room_id": 1,
        "r_name": "방 1번",
        "r_status": false,
        "user_id": 1
    },
 *                          ]
 */
router.get("/rooms", mainCtr.roomsList);

/**
 * @swagger
 * paths:
 *  /api-server/room:
 *    post:
 *      summary: "방 생성"
 *      description: ""
 *      tags: [Room]
 *      responses:
 *        "200":
 *          description: 새로운 방 생성
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                    ok:
 *                      type: boolean
 *                    users:
 *                      type: object
 *                      example:
 *                          [
 *                              {
    "result": true
}
 *                          ]
 */
router.post("/room", mainCtr.postRoom);

/**
 * @swagger
 * paths:
 *  /api-server/room/:roomId:
 *    patch:
 *      summary: "방 게임 상태 변경"
 *      description: ""
 *      tags: [Room]
 *      responses:
 *        "200":
 *          description: 방 게임 상태 대기중>게임중, 게임중>대기중 변경
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                    ok:
 *                      type: boolean
 *                    users:
 *                      type: object
 *                      example:
 *                          [
 *                              {
    "result": true,
    "roomId": "1"
}
 *                          ]
 */
router.patch("/room/:roomId", mainCtr.patchRoom);

/**
 * @swagger
 * paths:
 *  /api-server/room/:roomId:
 *    delete:
 *      summary: "방 삭제"
 *      description: ""
 *      tags: [Room]
 *      responses:
 *        "200":
 *          description: 방 정보 삭제
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                    ok:
 *                      type: boolean
 *                    users:
 *                      type: object
 *                      example:
 *                          [
 *                              {
    "result": true,
    "roomId": "1"
}
 *                          ]
 */
router.delete("/room/:roomId", mainCtr.deleteRoom);

// shop

/**
 * @swagger
 * paths:
 *  /api-server/shop:
 *    get:
 *      summary: "상품 목록 전체조회"
 *      description: ""
 *      tags: [Shop]
 *      responses:
 *        "200":
 *          description: 전체 상품 목록
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                    ok:
 *                      type: boolean
 *                    users:
 *                      type: object
 *                      example:
 *                          [
 *                                  {
        "product_id": 1,
        "p_name": "기본",
        "p_type": "profile",
        "p_img": "default",
        "p_price": 0
    },
 *                          ]
 */
router.get("/shop", mainCtr.productsList);

/**
 * @swagger
 * paths:
 *  /api-server/shop/user:
 *    get:
 *      summary: "유저가 구매한 상품 조회"
 *      description: ""
 *      tags: [Shop]
 *      responses:
 *        "200":
 *          description: 현재 접속 중인 유저가 이미 구매한 상품의 product_id를 조회
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                    ok:
 *                      type: boolean
 *                    users:
 *                      type: object
 *                      example:
 *                          [
 *                                  {
        "purchase_id": 17,
        "user_id": 11,
        "product_id": 5
    },
 *                          ]
 */
router.get("/shop/user", mainCtr.ownedList);

/**
 * @swagger
 * paths:
 *  /api-server/shop/buy:
 *    post:
 *      summary: "상품 구매 요청"
 *      description: "클라이언트에서 productId, price를 전달받음"
 *      tags: [Shop]
 *      responses:
 *        "200":
 *          description: 현재 접속 중인 유저가 상품을 구매
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                    ok:
 *                      type: boolean
 *                    users:
 *                      type: object
 *                      example:
 *                          [
 *                              {
    "result": true,
    "addList": {
        "purchase_id": 24,
        "user_id": 11,
        "product_id": "6"
    }
}
 *                          ]
 */
router.post("/shop/buy", mainCtr.postBuy);

// admin

/**
 * @swagger
 * paths:
 *  /api-server/admin/shop/add:
 *    post:
 *      summary: "상점 상품 추가"
 *      description: ""
 *      tags: [Shop/admin]
 *      responses:
 *        "200":
 *          description:
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                    ok:
 *                      type: boolean
 *                    users:
 *                      type: object
 *                      example:
 *                          [
 *                              {
    "result": true,
    "newProduct": {
        "product_id": 1,
        "p_name": "상품1",
        "p_type": "타입1",
        "p_img": "product1",
        "p_price": "100"
    }
}
 *                          ]
 */
router.post("/admin/shop/add", mainCtr.postProduct);

/**
 * @swagger
 * paths:
 *  /api-server/admin/shop/:productId:
 *    patch:
 *      summary: "상점 상품 수정"
 *      description: ""
 *      tags: [Shop/admin]
 *      responses:
 *        "200":
 *          description:
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                    ok:
 *                      type: boolean
 *                    users:
 *                      type: object
 *                      example:
 *                          [
 *                              {
    "result": true,
    "updatedProduct": {
        "p_name": "상품11",
        "p_type": "타입1",
        "p_img": "product11",
        "p_price": "200"
    }
}
 *                          ]
 */
router.patch("/admin/shop/:productId", mainCtr.patchProduct);

/**
 * @swagger
 * paths:
 *  /api-server/admin/shop/:productId:
 *    delete:
 *      summary: "상점 상품 삭제"
 *      description: ""
 *      tags: [Shop/admin]
 *      responses:
 *        "200":
 *          description:
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                    ok:
 *                      type: boolean
 *                    users:
 *                      type: object
 *                      example:
 *                          [
 *                              {
    "result": true,
    "msg": "상품 삭제 성공"
}
 *                          ]
 */
router.delete("/admin/shop/:productId", mainCtr.deleteProduct);

module.exports = router;
