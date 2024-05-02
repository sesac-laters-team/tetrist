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
router.get("/room/:roomId", mainCtr.roomData);

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
router.post("/room/enter/:roomId", mainCtr.enterRoom);

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
router.post("/room/leave/:roomId", mainCtr.leaveRoom);

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
// 상품 리스트 조회
// 유저 구매 목록 조회
// 유저 구매

// admin

module.exports = router;
