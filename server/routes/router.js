const express = require("express");
const router = express.Router();

const mainCtr = require("../controller/Cmain");
const roomCtr = require("../controller/Crooms");
const shopCtr = require("../controller/Cshop");
const { checkAuth, checkPenalty, userInRoom } = require("../utils/routerUtils");

// main

router.get("/", mainCtr.index);

// rank

/**
 * @swagger
 * paths:
 *  /api-server/matchResult:
 *    patch:
 *      summary: "게임 종료 후 승패 처리"
 *      description: " 1: 승리 시, 0: 패배 시"
 *      tags: [rank]
 *      responses:
 *        "200":
 *          description: 게임 종료 후 승패에 따라 데이터 처리
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
    "msg": "유저 정보가 변경되었습니다."
}
 *                          ]
 */
router.patch("/matchResult", mainCtr.matchResult);

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
        "r_password": null,
        "r_status": false,
        "guest_id": null,
        "user_id": 1
    },
 *                          ]
 */
router.get("/rooms", roomCtr.roomsList);

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
    "result": true,
    "userId": 8,
    "roomId": 5
}
 *                          ]
 */
// router.post("/room", checkAuth, userInRoom, checkPenalty, roomCtr.postRoom);
router.post("/room", roomCtr.postRoom);

/**
 * @swagger
 * paths:
 *  /api-server/rooms/:roomId:
 *    get:
 *      summary: "특정 방 정보 조회"
 *      description: ""
 *      tags: [Room]
 *      responses:
 *        "200":
 *          description: 방 정보, 방을 만든 유저 정보, 게스트 유저(allowNull) 정보 조회
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
    "roomData": {
        "room_id": 1,
        "r_name": "방 1번",
        "r_password": null,
        "r_status": false,
        "guest_id": null,
        "user_id": 1
    },
    "creatorData": {
        "user_id": 1,
        "email": "user1@test.com",
        "password": "user1pw",
        "nickname": "유저1",
        "custom": {
            "theme": 3,
            "profile": 1,
            "profileEdge": 2
        },
        "point": 1000,
        "connecting": true,
        "chat_penalty": true,
        "access_penalty": false
    },
    "guestData": null,
    "msg": "룸 정보 확인"
}, 
{
    "result": true,
    "roomData": {
        "room_id": 2,
        "r_name": "방 2번",
        "r_password": null,
        "r_status": true,
        "guest_id": 2,
        "user_id": 3
    },
    "creatorData": {
        "user_id": 3,
        "email": "user3@test.com",
        "password": "user3pw",
        "nickname": "유저3",
        "custom": {
            "theme": 3,
            "profile": 1,
            "profileEdge": 2
        },
        "point": 3000,
        "connecting": true,
        "chat_penalty": false,
        "access_penalty": false
    },
    "guestData": {
        "user_id": 2,
        "email": "user2@test.com",
        "password": "user2pw",
        "nickname": "유저2",
        "custom": {
            "theme": 3,
            "profile": 1,
            "profileEdge": 2
        },
        "point": 2000,
        "connecting": false,
        "chat_penalty": false,
        "access_penalty": true
    },
    "msg": "룸 정보 확인"
}
 *                          ]
 */
router.get("/room/:roomId", roomCtr.roomData);

/**
 * @swagger
 * paths:
 *  /api-server/room/enter/:roomId:
 *    post:
 *      summary: "방 입장"
 *      description: ""
 *      tags: [Room]
 *      responses:
 *        "200":
 *          description: 만들어진 방에 유저가 입장
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
    "guestId": 8
}
 *                          ]
 */
// router.post("/room/enter/:roomId", checkAuth, checkPenalty, userInRoom, roomCtr.enterRoom);
router.post("/room/enter/:roomId", roomCtr.enterRoom);

/**
 * @swagger
 * paths:
 *  /api-server/room/leave/:roomId:
 *    post:
 *      summary: "방 나가기"
 *      description: ""
 *      tags: [Room]
 *      responses:
 *        "200":
 *          description: 게스트 유저가 나가는 경우 
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
    "roomId": "5"
}
 *                          ]
 */
router.post("/room/leave/:roomId", roomCtr.leaveRoom);

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
router.patch("/room/:roomId", roomCtr.patchRoom);

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
router.delete("/room/:roomId", roomCtr.deleteRoom);

// shop

/**
 * @swagger
 * paths:
 *  /api-server/shop:
 *    get:
 *      summary: "커스텀 목록 전체조회"
 *      description: ""
 *      tags: [Custom]
 *      responses:
 *        "200":
 *          description: 전체 커스텀 목록
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
        "p_name": "펭귄",
        "p_type": "profile",
        "p_img": "/images/profile/penguin.png",
        "p_price": 0
    },
 *                          ]
 */
router.get("/shop", shopCtr.productsList);

/**
 * @swagger
 * paths:
 *  /api-server/shop/user:
 *    get:
 *      summary: "유저가 설정한 커스텀 조회"
 *      description: ""
 *      tags: [Custom]
 *      responses:
 *        "200":
 *          description: 유저 정보 조회
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
 *                                  "data": {
        "user_id": 23,
        "email": "4321",
        "password": "$2b$10$EIB9uVp3sZkodsg6H65KpuLr81bJGPQqktZnNsIb2z48a3PL1o.N.",
        "nickname": "4321",
        "profile": "/profile/default",
        "profileEdge": "/profileEdge/default",
        "theme": "#ffffff",
        "win": 0,
        "lose": 0,
        "rating": 0,
        "access_penalty": true
    }
 *                          ]
 */
router.get("/shop/user", checkAuth, shopCtr.ownedList);

/*
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
router.post("/shop/buy", checkAuth, shopCtr.postBuy);

// admin

/*
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
router.post("/admin/shop/add", shopCtr.postProduct);

/*
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
router.patch("/admin/shop/:productId", shopCtr.patchProduct);

/*
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
router.delete("/admin/shop/:productId", shopCtr.deleteProduct);

module.exports = router;
