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
 *      requestBody:
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                email:
 *                  type: string
 *                password:
 *                  type: string
 *                nickname:
 *                  type: string
 *      responses:
 *        "201":
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
 *        "400":
 *          description: "회원가입 실패"
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
 *                result: false
 *                msg: "회원가입 실패, 다시 시도해주세요."
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
 *       "409":
 *         description: "중복 이메일 확인"
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
 *                 result: false
 *                 msg: "이미 가입된 이메일입니다. 다른 이메일을 입력해주세요."
 *
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
 *      requestBody:
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                nickname:
 *                  type: string
 *      responses:
 *        "200":
 *          description: "닉네임 사용 가능"
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  result:
 *                    type: boolean
 *                  msg:
 *                    type: string
 *                example:
 *                  result: true
 *                  msg: "사용할 수 있는 닉네임입니다."
 *        "409":
 *          description: "중복 닉네임 확인"
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  result:
 *                    type: boolean
 *                  msg:
 *                    type: string
 *                example:
 *                  result: false
 *                  msg: "동일한 닉네임이 존재합니다. 다른 닉네임을 입력해주세요."
 *
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
 *      requestBody:
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                email:
 *                  type: string
 *                password:
 *                  type: string
 *      responses:
 *        "200":
 *          description: "로그인 성공"
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  result:
 *                    type: boolean
 *                  msg:
 *                    type: string
 *                example:
 *                  result: true
 *                  msg: "로그인 성공"
 *                  userId: 1
 *                  email: "user1@email.com"
 *                  data: {
 *                     "userId": 1,
 *                     "email": "user1@email.com",
 *                     "password": "$2b$10$EIB9uVp3sZkodsg6H65KpuLr81bJGPQqktZnNsIb2z48a3PL1o.N.",
 *                     "nickname": "유저1",
 *                     "profile": "/profile/default",
 *                     "profileEdge": "/profileEdge/default",
 *                     "theme": "#ffffff",
 *                     "win": 0,
 *                     "lose": 0,
 *                     "rating": 0,
 *                     "access_penalty": false
 *                   }
 *        "400":
 *          description: "입력값 유무 체크"
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  result:
 *                    type: boolean
 *                  msg:
 *                    type: string
 *                example:
 *                  result: false
 *                  msg: "이메일과 비밀번호를 모두 입력해주세요."
 *        "401_1":
 *          description: "접속 제한 상태인 유저 차단"
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  result:
 *                    type: boolean
 *                  msg:
 *                    type: string
 *                example:
 *                  result: false
 *                  msg: "접속이 제한된 유저입니다. 관리자에게 문의하세요."
 *        "401_2":
 *          description: "입력한 이메일로 조회한 비밀번호와 입력한 비밀번호가 불일치"
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  result:
 *                    type: boolean
 *                  msg:
 *                    type: string
 *                example:
 *                  result: false
 *                  msg: "비밀번호가 일치하지 않습니다."
 *        "401_3":
 *          description: "유저 목록에 없는 이메일 입력"
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  result:
 *                    type: boolean
 *                  msg:
 *                    type: string
 *                example:
 *                  result: false
 *                  msg: "등록되지 않은 이메일입니다."
 *
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
 *          description: "로그아웃 성공"
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  result:
 *                    type: boolean
 *                  msg:
 *                    type: string
 *                example:
 *                  result: true
 *                  msg: "로그아웃 성공"
 */
authRouter.get("/logout", checkAuth, usersCtr.logout);

/**
 * @swagger
 * paths:
 *  /api-server/auth/mypage:
 *    get:
 *      summary: "현재 로그인 중인 유저의 데이터 전체 조회"
 *      description: ""
 *      tags: [User]
 *      responses:
 *        "200":
 *          description: "데이터 조회 성공"
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  result:
 *                    type: boolean
 *                  msg:
 *                    type: string
 *                example:
 *                  result: true
 *                  msg: "유저 정보 확인"
 *                  data: {
 *                     "userId": 1,
 *                     "email": "user1@email.com",
 *                     "password": "$2b$10$EIB9uVp3sZkodsg6H65KpuLr81bJGPQqktZnNsIb2z48a3PL1o.N.",
 *                     "nickname": "유저1",
 *                     "profile": "/profile/default",
 *                     "profileEdge": "/profileEdge/default",
 *                     "theme": "#ffffff",
 *                     "win": 0,
 *                     "lose": 0,
 *                     "rating": 0,
 *                     "access_penalty": false
 *                   }
 *        "404":
 *          description: "유저 데이터 조회 실패"
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  result:
 *                    type: boolean
 *                  msg:
 *                    type: string
 *                example:
 *                  result: false
 *                  msg: "유저 정보를 찾을 수 없습니다."
 */
authRouter.get("/mypage", checkAuth, /* checkPenalty, */ usersCtr.getOneUser);

/**
 * @swagger
 * paths:
 *  /api-server/auth/mypage/changePassword:
 *    patch:
 *      summary: "로그인 한 유저 비밀번호 변경"
 *      description: ""
 *      tags: [User]
 *      requestBody:
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                password:
 *                  type: string
 *      responses:
 *        "200":
 *          description: "비밀번호 변경 성공"
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  result:
 *                    type: boolean
 *                  msg:
 *                    type: string
 *                example:
 *                  result: true
 *                  msg: "비밀번호가 변경되었습니다."
 *        "400":
 *          description: "비밀번호 변경 실패"
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  result:
 *                    type: boolean
 *                  msg:
 *                    type: string
 *                example:
 *                  result: false
 *                  msg: "유저 정보가 수정되지 않았습니다."
 *
 */
authRouter.patch(
    "/mypage/changePassword",
    checkAuth,
    /* checkPenalty, */
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
 *      requestBody:
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                nickname:
 *                  type: string
 *      responses:
 *        "200":
 *          description: "닉네임 변경 성공"
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  result:
 *                    type: boolean
 *                  msg:
 *                    type: string
 *                example:
 *                  result: true
 *                  msg: "닉네임이 변경되었습니다."
 *        "400":
 *          description: "닉네임 변경 실패"
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  result:
 *                    type: boolean
 *                  msg:
 *                    type: string
 *                example:
 *                  result: false
 *                  msg: "유저 정보가 수정되지 않았습니다."
 *
 */
authRouter.patch(
    "/mypage/changeNickname",
    checkAuth,
    /* checkPenalty, */
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
 *      requestBody:
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                profile:
 *                  type: string
 *                profileEdge:
 *                  type: string
 *                theme:
 *                  type: string
 *      responses:
 *        "200":
 *          description: "유저 커스텀 변경 성공"
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  result:
 *                    type: boolean
 *                  msg:
 *                    type: string
 *                example:
 *                  result: true
 *                  msg: "유저 커스텀이 변경되었습니다."
 *        "400":
 *          description: "유저 커스텀 변경 실패"
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  result:
 *                    type: boolean
 *                  msg:
 *                    type: string
 *                example:
 *                  result: false
 *                  msg: "유저 정보가 수정되지 않았습니다."
 *
 */
authRouter.patch(
    "/mypage/changeCustom",
    checkAuth,
    /* checkPenalty, */
    usersCtr.patchCustom
);

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
 *          description: "유저 탈퇴 성공"
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  result:
 *                    type: boolean
 *                  msg:
 *                    type: string
 *                example:
 *                  result: true
 *                  msg: "탈퇴 완료되었습니다."
 *        "400":
 *          description: "유저 탈퇴 실패"
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  result:
 *                    type: boolean
 *                  msg:
 *                    type: string
 *                example:
 *                  result: false
 *                  msg: "탈퇴 요청을 처리할 수 없습니다."
 *
 */
authRouter.delete(
    "/mypage/delete",
    checkAuth,
    /* checkPenalty, */
    usersCtr.deleteUserData
);

module.exports = authRouter;
