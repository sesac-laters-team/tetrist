const express = require("express");
const authRouter = express.Router();

const usersCtr = require("../controller/Cusers");
const { checkAuth, checkPenalty } = require("../utils/routerUtils");

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
 *          description: "회원가입 성공"
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  result:
 *                    type: boolean
 *                  msg:
 *                    type: string
 *              example:
 *                result: true
 *                msg: "회원가입 성공"
 */
authRouter.post("/register", usersCtr.postRegister);

/**
 * @swagger
 * /api-server/auth/register/emailDuplicate:
 *   post:
 *     summary: "유저 회원가입 이메일 중복 검사"
 *     description: ""
 *     tags: [User]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *     responses:
 *       "200":
 *         description: "이메일 사용 가능"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: boolean
 *                 msg:
 *                   type: string
 *               example:
 *                 result: true
 *                 msg: "사용할 수 있는 이메일입니다."
 */
authRouter.post("/emailDuplicate", usersCtr.emailDuplicate);

/**
 * @swagger
 * paths:
 *  /api-server/auth/register/nicknameDuplicate:
 *    post:
 *      summary: "닉네임 중복 검사"
 *      description: ""
 *      tags: [User]
 *      responses:
 *        "200":
 *          description: 닉네임 사용 가능
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
    "msg": "사용할 수 있는 닉네임입니다."
}
 *                          ]
 */
authRouter.post("/nicknameDuplicate", usersCtr.nickDuplicate);

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
    "userId": 1,
    "email": "user1@email.com",
    "data": {
        "userId": 1,
        "email": "user1@email.com",
        "password": "$2b$10$EIB9uVp3sZkodsg6H65KpuLr81bJGPQqktZnNsIb2z48a3PL1o.N.",
        "nickname": "유저1",
        "profile": "/profile/default",
        "profileEdge": "/profileEdge/default",
        "theme": "#ffffff",
        "win": 0,
        "lose": 0,
        "rating": 0,
        "access_penalty": false
    }
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
authRouter.get("/logout", checkAuth, usersCtr.logout);

/**
 * @swagger
 * paths:
 *  /api-server/auth/mypage:
 *    get:
 *      summary: "로그인 한 유저 정보 조회"
 *      description: ""
 *      tags: [User]
 *      responses:
 *        "200":
 *          description: 유저 정보 확인 성공
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
    "data": {
        "userId": 1,
        "email": "user1@email.com",
        "password": "$2b$10$EIB9uVp3sZkodsg6H65KpuLr81bJGPQqktZnNsIb2z48a3PL1o.N.",
        "nickname": "유저1",
        "profile": "/profile/default",
        "profileEdge": "/profileEdge/default",
        "theme": "#ffffff",
        "win": 0,
        "lose": 0,
        "rating": 0,
        "access_penalty": false
    }
 *                          ]
 */
authRouter.get("/mypage", checkAuth, usersCtr.getOneUser);

/**
 * @swagger
 * paths:
 *  /api-server/auth/mypage/changePassword:
 *    patch:
 *      summary: "로그인 한 유저 비밀번호 변경"
 *      description: ""
 *      tags: [User]
 *      responses:
 *        "200":
 *          description: 비밀번호 변경 성공
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
    "msg": "비밀번호가 변경되었습니다."
}
 *                          ]
 */
authRouter.patch(
    "/mypage/changePassword",
    checkAuth,
    usersCtr.patchUserPassword
);

/**
 * @swagger
 * paths:
 *  /api-server/auth/mypage/changeNickname:
 *    patch:
 *      summary: "로그인 한 유저 닉네임 변경"
 *      description: ""
 *      tags: [User]
 *      responses:
 *        "200":
 *          description: 닉네임 변경 성공
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
    "msg": "닉네임이 변경되었습니다."
}
 *                          ]
 */
authRouter.patch(
    "/mypage/changeNickname",
    checkAuth,
    usersCtr.patchUserNickname
);

/**
 * @swagger
 * paths:
 *  /api-server/mypage/changeCustom:
 *    patch:
 *      summary: "유저 커스텀 변경"
 *      description: ""
 *      tags: [Custom]
 *      responses:
 *        "200":
 *          description: 사용중인 커스텀 변경
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
                result: true,
                msg: "유저 커스텀이 변경되었습니다.",
}
 *                          ]
 */
authRouter.patch("/mypage/changeCustom", checkAuth, usersCtr.patchCustom);

/**
 * @swagger
 * paths:
 *  /api-server/auth/mypage/delete:
 *    delete:
 *      summary: "로그인 한 유저 회원 탈퇴"
 *      description: ""
 *      tags: [User]
 *      responses:
 *        "200":
 *          description: 탈퇴 성공
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
    "msg": "탈퇴 완료되었습니다."
}
 *                          ]
 */
authRouter.delete("/mypage/delete", checkAuth, usersCtr.deleteUserData);

module.exports = authRouter;
