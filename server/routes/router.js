const express = require("express");
const router = express.Router();

const usersCtr = require("../controller/Cusers");

// user
/**
 * @swagger
 * paths:
 *  /api-server/users:
 *    get:
 *      summary: "유저 데이터 전체조회"
 *      description: "서버에 데이터를 보내지 않고 Get방식으로 요청"
 *      tags: [User]
 *      responses:
 *        "200":
 *          description: 전체 유저 정보
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
                                    "user_id": 1,
                                    "email": "user1@test.com",
                                    "password": "user1pw",
                                    "nickname": "유저1",
                                    "custom": {
                                      "theme": 1,
                                      "profile": 1
                                    },
                                    "point": 1000,
                                    "connecting": true,
                                    "chat_penalty": true,
                                    "access_penalty": false
                                },
 *                          ]
 */
router.get("/users", usersCtr.getAllUsers);

module.exports = router;
