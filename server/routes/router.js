const express = require("express");
const router = express.Router();

const mainCtr = require("../controller/Cmain");
const roomCtr = require("../controller/Crooms");
const shopCtr = require("../controller/Cshop");
const { checkAuth, checkPenalty, userInRoom } = require("../utils/routerUtils");

// main

router.get("/", mainCtr.index);

// Rank

/**
 * @swagger
 * paths:
 *  /api-server/matchResult:
 *    patch:
 *      summary: "유저 정보에 승점 증감 적용"
 *      description: "게임 종료 후 승패에 따라 데이터 처리, 변동량은 서버 코드에서 관리"
 *      tags: [Rank]
 *      requestBody:
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                winUserId:
 *                  type: "number"
 *                loseUserId:
 *                  type: "number"
 *      responses:
 *        "200":
 *          description: "승점 변경 성공"
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
 *                msg: "유저 정보가 변경되었습니다."
 *        "400":
 *          description: "승점 변경 실패"
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
 *                  msg: "유저 정보가 변경되지 않았습니다."
 *        "404_1":
 *          description: "승리 유저 데이터 조회 실패"
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
 *                  msg: "승리 유저 정보를 찾을 수 없습니다."
 *        "404_2":
 *          description: "패배 유저 데이터 조회 실패"
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
 *                  msg: "패배 유저 정보를 찾을 수 없습니다."
 */
router.patch("/matchResult", mainCtr.matchResult);

/**
 * @swagger
 * paths:
 *  /api-server/rank:
 *    get:
 *      summary: "랭킹 조회"
 *      description: "승점을 내림차순으로 10개 데이터를 승점과 닉네임만 조회"
 *      tags: [Rank]
 *      responses:
 *        "200":
 *          description: "승점 조회 성공"
 *          content:
 *            application/json:
 *              schema:
 *                type: json
 *                properties:
 *                  data:
 *                    type: json
 *                example:
 *                  [
 *                    {
 *                        "rating": 3000,
 *                        "nickname": "user1"
 *                    },
 *                    {
 *                        "rating": 2000,
 *                        "nickname": "user2"
 *                    },
 *                    {
 *                        "rating": 0,
 *                        "nickname": "user3"
 *                    }
 *                  ]
 */
router.get("/rank", mainCtr.rank);

// rooms

/**
 * @swagger
 * paths:
 *  /api-server/rooms:
 *    get:
 *      summary: "전체 방 목록 조회"
 *      description: "대기실에 만들어진 방을 보여주기 위해 전체 방 목록 조회"
 *      tags: [Room]
 *      responses:
 *        "200":
 *          description: "방 목록 조회 성공"
 *          content:
 *            application/json:
 *              schema:
 *                type: json
 *                properties:
 *                  data:
 *                    type: json
 *                example:
 *                  [
 *                      {
 *                          "room_id": 1,
 *                          "r_name": "방 1번",
 *                          "r_password": null,
 *                          "r_status": false,
 *                          "guest_id": null,
 *                          "user_id": 2
 *                      },
 *                      {
 *                          "room_id": 2,
 *                          "r_name": "방 2번",
 *                          "r_password": null,
 *                          "r_status": true,
 *                          "guest_id": 2,
 *                          "user_id": 3
 *                      },
 *                      {
 *                          "room_id": 3,
 *                          "r_name": "방 3번",
 *                          "r_password": "qwerty",
 *                          "r_status": false,
 *                          "guest_id": null,
 *                          "user_id": 4
 *                      }
 *                  ]
 */
router.get("/rooms", roomCtr.roomsList);

/**
 * @swagger
 * paths:
 *  /api-server/room:
 *    post:
 *      summary: "새로운 방 생성"
 *      description: "비밀번호 값 입력이 없으면 공개 방, 있으면 비공개 방으로 생성"
 *      tags: [Room]
 *      requestBody:
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                r_name:
 *                  type: string
 *                r_password:
 *                  type: string
 *      responses:
 *        "201_1":
 *          description: "비밀번호 없는 방 생성 성공"
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  result:
 *                    type: boolean
 *                  msg:
 *                    type: string
 *                  userId:
 *                    type: number
 *                  userNickname:
 *                    type: string
 *                  roomId:
 *                    type: number
 *                  private:
 *                    type: boolean
 *              example:
 *                result: true
 *                msg: "공개방이 생성되었습니다."
 *                userId: 1
 *                userNickname: user1
 *                roomId: 1
 *                private: false
 *        "201_2":
 *          description: "비밀번호 있는 방 생성 성공"
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  result:
 *                    type: boolean
 *                  msg:
 *                    type: string
 *                  userId:
 *                    type: number
 *                  userNickname:
 *                    type: string
 *                  roomId:
 *                    type: number
 *                  private:
 *                    type: boolean
 *              example:
 *                result: true
 *                msg: "비공개방이 생성되었습니다."
 *                userId: 2
 *                userNickname: user2
 *                roomId: 2
 *                private: true
 *        "400":
 *          description: "방 생성 실패"
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
 *                msg: "방 생성에 실패했습니다. 다시 시도해주세요."
 */
// router.post("/room", checkAuth, userInRoom, checkPenalty, roomCtr.postRoom);
router.post("/room", roomCtr.postRoom);

/**
 * @swagger
 * paths:
 *  /api-server/room/:roomId:
 *    get:
 *      summary: "특정 방 정보 조회"
 *      description: "params로 받은 room_id의 방 정보, 방을 만든 유저 정보, 게스트 유저(allowNull) 정보 조회"
 *      tags: [Room]
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
 *                  msg: "룸 정보 확인"
 *                  roomData: {
 *                      "room_id": 2,
 *                      "r_name": "방 2번",
 *                      "r_password": null,
 *                      "r_status": true,
 *                      "guest_id": 2,
 *                      "user_id": 3
 *                  }
 *                  creatorData: {
 *                      "user_id": 3,
 *                      "email": "user3",
 *                      "password": "$2b$10$jCUePVaRV5Ia9lp7yLzLyOEDPBVa5wBM1X78i/qRxXP0lE2NieI26",
 *                      "nickname": "유저3",
 *                      "profile": "/profile/default",
 *                      "profileEdge": "/profileEdge/default",
 *                      "theme": "#ffffff",
 *                      "win": 0,
 *                      "lose": 0,
 *                      "rating": 0,
 *                      "access_penalty": false
 *                  }
 *                  guestData: {
 *                      "user_id": 2,
 *                      "email": "user2",
 *                      "password": "$2b$10$UnStSrFOV.gSgsw8h4flLe9HWc/DklMhjiNhqwxMrWJ1bv.5nzfR.",
 *                      "nickname": "유저2",
 *                      "profile": "/profile/default",
 *                      "profileEdge": "/profileEdge/default",
 *                      "theme": "#ffffff",
 *                      "win": 20,
 *                      "lose": 3,
 *                      "rating": 1000,
 *                      "access_penalty": false
 *                  }
 *        "404_1":
 *          description: "방장 유저 데이터 조회 실패"
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
 *                  msg: "방장 유저 정보를 찾을 수 없습니다."
 *        "404_2":
 *          description: "방 데이터 조회 실패"
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
 *                  msg: "룸 정보를 찾을 수 없습니다."
 */
router.get("/room/:roomId", roomCtr.roomData);

/**
 * @swagger
 * paths:
 *  /api-server/room/enter/:roomId:
 *    post:
 *      summary: "방 입장 요청"
 *      description: "params로 받아온 값이 room_id인 방에 다른 유저가 입장 요청"
 *      tags: [Room]
 *      requestBody:
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                r_password:
 *                  type: string
 *      responses:
 *        "200_1":
 *          description: "공개 방에 입장 성공"
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  result:
 *                    type: boolean
 *                  msg:
 *                    type: string
 *                  guestId:
 *                    type: number
 *                  guestNickname:
 *                    type: string
 *                  private:
 *                    type: boolean
 *              example:
 *                result: true
 *                msg: "공개 방에 입장했습니다."
 *                guestId: 1
 *                guestNickname: 유저1
 *                private: false
 *        "200_2":
 *          description: "비공개 방에 입장 성공"
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  result:
 *                    type: boolean
 *                  msg:
 *                    type: string
 *                  guestId:
 *                    type: number
 *                  guestNickname:
 *                    type: string
 *                  private:
 *                    type: boolean
 *              example:
 *                result: true
 *                msg: "비공개 방에 입장했습니다."
 *                guestId: 2
 *                guestNickname: 유저2
 *                private: true
 *        "400_1":
 *          description: "공개 방 입장 실패"
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
 *                msg: "공개 방 입장 실패. 다시 시도해주세요."
 *        "400_2":
 *          description: "비공개 방 입장 실패"
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
 *                msg: "비공개 방 입장 실패. 다시 시도해주세요."
 *        "401_2":
 *          description: "비공개 방 입장 시 비밀번호 불일치"
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
 *                msg: "비밀번호가 일치하지 않습니다."
 *        "404":
 *          description: "입장할 방 정보 조회 실패"
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
 *                msg: "방 정보를 찾을 수 없습니다."
 *        "409_1":
 *          description: "입장할 공개 방에 guest_id가 이미 존재"
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
 *                msg: "인원이 가득 찼습니다. 공개 방에 입장할 수 없습니다."
 *        "409_2":
 *          description: "입장할 비공개 방에 guest_id가 이미 존재"
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
 *                msg: "인원이 가득 찼습니다. 비공개 방에 입장할 수 없습니다."
 */
// router.post("/room/enter/:roomId", checkAuth, checkPenalty, userInRoom, roomCtr.enterRoom);
router.post("/room/enter/:roomId", roomCtr.enterRoom);

/**
 * @swagger
 * paths:
 *  /api-server/room/leave/:roomId:
 *    post:
 *      summary: "방 나가기 요청"
 *      description: "게스트 유저가 참여 중인 방에서 나가기 요청"
 *      tags: [Room]
 *      responses:
 *        "200":
 *          description: "퇴장 성공"
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  result:
 *                    type: boolean
 *                  roomId:
 *                    type: number
 *                  msg:
 *                    type: string
 *              example:
 *                result: true
 *                roomId: 3
 *                msg: "게스트 유저가 퇴장했습니다."
 *        "400":
 *          description: "퇴장 실패"
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
 *                msg: "이미 퇴장했거나, 존재하지 않는 방입니다."
 */
router.post("/room/leave/:roomId", roomCtr.leaveRoom);

/**
 * @swagger
 * paths:
 *  /api-server/room/:roomId:
 *    patch:
 *      summary: "방 게임 상태 변경"
 *      description: "게임 시작 시 r_status를 대기중(false) > 게임중(true) 변경"
 *      tags: [Room]
 *      responses:
 *        "200":
 *          description: "게임 중으로 변경 성공"
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  result:
 *                    type: boolean
 *                  roomId:
 *                    type: number
 *                  msg:
 *                    type: string
 *              example:
 *                result: true
 *                roomId: 3
 *                msg: "방이 게임 중 상태로 전환되었습니다."
 *        "400":
 *          description: "게임 중으로 변경 실패"
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
 *                msg: "이미 게임 중이거나, 존재하지 않는 방입니다."
 */
router.patch("/room/:roomId", roomCtr.patchRoom);

/**
 * @swagger
 * paths:
 *  /api-server/room/:roomId:
 *    delete:
 *      summary: "방 정보 삭제"
 *      description: "게임이 종료되거나 방장 유저가 나갈 경우 방 데이터 삭제"
 *      tags: [Room]
 *      responses:
 *        "200":
 *          description: "방 삭제 성공"
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  result:
 *                    type: boolean
 *                  roomId:
 *                    type: number
 *                  msg:
 *                    type: string
 *              example:
 *                result: true
 *                roomId: 1
 *                msg: "게임 방이 삭제되었습니다."
 *        "404":
 *          description: "방 삭제 실패"
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
 *                msg: "존재하지 않는 방입니다."
 */
router.delete("/room/:roomId", roomCtr.deleteRoom);

// shop

/**
 * @swagger
 * paths:
 *  /api-server/shop:
 *    get:
 *      summary: "커스텀 목록 전체 조회"
 *      description: "유저가 설정할 수 있는 커스텀 목록 전체 조회"
 *      tags: [Custom]
 *      responses:
 *        "200":
 *          description: "커스텀 목록 조회 성공"
 *          content:
 *            application/json:
 *              schema:
 *                type: json
 *                properties:
 *                  data:
 *                    type: json
 *                example:
 *                  [
 *                      {
 *                          "product_id": 1,
 *                          "p_name": "펭귄",
 *                          "p_type": "profile",
 *                          "p_img": "/images/profile/penguin.png",
 *                          "p_price": 0
 *                      },
 *                      {
 *                          "product_id": 2,
 *                          "p_name": "프로필테두리1",
 *                          "p_type": "profileEdge",
 *                          "p_img": "/images/profile_edge/frame_leaves.png",
 *                          "p_price": 0
 *                      },
 *                      {
 *                          "product_id": 3,
 *                          "p_name": "#cde8e7",
 *                          "p_type": "theme",
 *                          "p_img": "/images/theme/cde8e7.png",
 *                          "p_price": 0
 *                      }
 *                  ]
 *        "400":
 *          description: "커스텀 목록 조회 실패"
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
 *                  msg: "상품 전체 조회 실패"
 */
router.get("/shop", shopCtr.productsList);

/**
 * @swagger
 * paths:
 *  /api-server/shop/user:
 *    get:
 *      summary: "유저 커스텀 조회"
 *      description: "유저가 설정한 커스텀 목록 확인을 위해 로그인 중인 유저 데이터 조회"
 *      tags: [Custom]
 *      responses:
 *        "200":
 *          description: "유저 커스텀 조회 성공"
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  data:
 *                    type: object
 *                example:
 *                      data: {
 *                          "user_id": 1,
 *                          "email": "user1@test.com",
 *                          "password": "$2b$10$b9y99.bEe/QUSZz81ISb4ekU6zCjrdTMWTRe3M1BurBngGbn8XV9u",
 *                          "nickname": "유저1",
 *                          "profile": "/profile/default",
 *                          "profileEdge": "/profileEdge/default",
 *                          "theme": "#ffffff",
 *                          "win": 0,
 *                          "lose": 0,
 *                          "rating": 0,
 *                          "access_penalty": false
 *                      }
 */
router.get("/shop/user", checkAuth, shopCtr.ownedList);

//+ 상점 추가를 위한 코드

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
