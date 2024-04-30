const express = require("express");
const router = express.Router();

const mainCtr = require("../controller/Cmain");

// main

router.get("/", mainCtr.index);

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
// 상품 리스트 조회
// 유저 구매 목록 조회
// 유저 구매

// admin

module.exports = router;
