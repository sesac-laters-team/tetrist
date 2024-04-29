const express = require("express");
const authRouter = express.Router();

const usersCtr = require("../controller/Cusers");

/**
 * @swagger
 * paths:
 *  /api-server/auth/register:
 *    post:
 *      summary: "유저 회원가입 요청"
 *      description: ""
 *      tags: [User]
 *      responses:
 *        "200":
 *          description: 회원가입 성공
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
    "msg": "회원가입 성공"
}
 *                          ]
 */
authRouter.post("/register", usersCtr.postRegister);

/**
 * @swagger
 * paths:
 *  /api-server/auth/login:
 *    post:
 *      summary: "유저 로그인 요청"
 *      description: ""
 *      tags: [User]
 *      responses:
 *        "200":
 *          description: 로그인 성공
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
    "msg": "로그인 성공",
    "userId": 1
}
 *                          ]
 */
authRouter.post("/login", usersCtr.postLogin);
/**
 * @swagger
 * paths:
 *  /api-server/auth/logout:
 *    get:
 *      summary: "유저 로그아웃 요청"
 *      description: ""
 *      tags: [User]
 *      responses:
 *        "200":
 *          description: 로그아웃 성공
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
    "msg": "로그아웃 성공"
}
 *                          ]
 */
authRouter.get("/logout", usersCtr.logout);

module.exports = authRouter;
