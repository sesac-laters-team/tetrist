const bcrypt = require("bcrypt");
const { usersModel, roomsModel, productsModel } = require("../models");

// 렌더링
exports.toLogin = (req, res) => {
    res.render("adminLogin");
};
exports.toAdmin = (req, res) => {
    res.render("adminPage");
};
exports.toUser = async (req, res) => {
    try {
        const userList = await usersModel.findAll();
        res.render("adminUser", { data: userList });
    } catch (error) {
        console.log("error", error);
        res.status(500).send("server error");
    }
};
exports.toRoom = async (req, res) => {
    try {
        const roomList = await roomsModel.findAll();
        res.render("adminRoom", { data: roomList });
    } catch (error) {
        console.log("error", error);
        res.status(500).send("server error");
    }
};
exports.toShop = async (req, res) => {
    try {
        const productList = await productsModel.findAll();
        res.render("adminShop", { data: productList });
    } catch (error) {
        console.log("error", error);
        res.status(500).send("server error");
    }
};

// 로그인 로그아웃
exports.adminLogin = async (req, res) => {
    try {
        const { id, pw } = req.body;
        const findUserData = await usersModel.findOne({
            where: {
                email: id,
            },
        });

        if (findUserData) {
            const isPasswordMatch = await bcrypt.compare(
                pw,
                findUserData.password
            );

            if (isPasswordMatch) {
                if (findUserData.nickname === "admin") {
                    req.session.admin = true;
                    res.status(200).send({
                        result: true,
                        msg: "로그인 성공",
                        userId: findUserData.user_id,
                        email: findUserData.email,
                    });
                } else {
                    res.status(403).send({
                        result: false,
                        msg: "접근 권한이 없습니다.",
                    });
                }
            } else {
                res.status(401).send({
                    result: false,
                    msg: "비밀번호가 일치하지 않습니다.",
                });
            }
        } else {
            res.status(401).send({
                result: false,
                msg: "등록되지 않은 이메일입니다.",
            });
        }
    } catch (error) {
        console.log("error", error);
        res.status(500).send("server error");
    }
};

exports.adminLogout = (req, res) => {
    req.session.destroy((err) => {
        if (err) throw err;
    });
    res.send(`
    <script>
    localStorage.removeItem("admin");
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("user");
    alert("로그아웃되었습니다.");
    window.location.href = "/api-server/admin";
    </script>
    `);
};

// 유저 관리
exports.deleteUser = async (req, res) => {
    try {
        const isDeleted = await usersModel.destroy({
            where: {
                user_id: req.params.userId,
            },
        });

        if (isDeleted > 0) {
            res.status(200).send({ result: true, msg: "탈퇴 완료되었습니다." });
        } else {
            res.status(400).send({
                result: false,
                msg: "탈퇴 요청을 처리할 수 없습니다.",
            });
        }
    } catch (error) {
        console.log("error", error);
        res.status(500).send("server error");
    }
};

exports.patchUser = async (req, res) => {
    try {
        const { userId, nickname, penalty } = req.body;

        const checkDupNick = await usersModel.findOne({
            where: {
                nickname: nickname,
            },
        });
        if (checkDupNick) {
            return res.status(409).send({
                result: false,
                msg: "동일한 닉네임이 존재합니다. 다른 닉네임을 입력해주세요.",
            });
        }

        const isUpdated = await usersModel.update(
            {
                nickname: nickname,
                access_penalty: penalty,
            },
            {
                where: {
                    user_id: userId,
                },
            }
        );

        if (isUpdated > 0) {
            res.status(200).send({
                result: true,
                msg: "유저 정보가 변경되었습니다.",
            });
        } else {
            res.status(400).send({
                result: false,
                msg: "유저 정보가 수정되지 않았습니다.",
            });
        }
    } catch (error) {
        console.log("error", error);
        res.status(500).send("server error");
    }
};

exports.resetPw = async (req, res) => {
    try {
        const { userId } = req.body;

        // 비밀번호를 bcrypt로 암호화하는 함수
        const resetPassword = "resetpassword";
        async function hashPassword(resetPassword) {
            const saltRounds = 10;
            return await bcrypt.hash(resetPassword, saltRounds);
        }

        const isUpdated = await usersModel.update(
            {
                password: await hashPassword(resetPassword),
            },
            {
                where: {
                    user_id: userId,
                },
            }
        );

        if (isUpdated > 0) {
            res.status(200).send({
                result: true,
                msg: "유저 비밀번호가 'resetpassword' 로 초기화 되었습니다.",
            });
        } else {
            res.status(400).send({
                result: false,
                msg: "유저 비밀번호가 초기화되지 않았습니다.",
            });
        }
    } catch (error) {
        console.log("error", error);
        res.status(500).send("server error");
    }
};

// 방 관리

exports.deleteRoom = async (req, res) => {
    try {
        const isDeleted = await roomsModel.destroy({
            where: {
                room_id: req.params.roomId,
            },
        });

        if (isDeleted > 0) {
            res.status(200).send({ result: true, msg: "삭제 완료되었습니다." });
        } else {
            res.status(400).send({
                result: false,
                msg: "삭제 요청을 처리할 수 없습니다.",
            });
        }
    } catch (error) {
        console.log("error", error);
        res.status(500).send("server error");
    }
};
