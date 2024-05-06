const bcrypt = require("bcrypt");
const { usersModel } = require("../models");

// POST /api-server/auth/register
// 회원가입 요청 > DB에 유저 정보 추가
exports.postRegister = async (req, res) => {
    try {
        const { email, password, nickname } = req.body;
        // email, password, nickname 중 입력 값이 없을 시 예외처리
        if (!email || !password || !nickname) {
            return res.status(400).send({
                result: false,
                msg: "항목을 모두 작성해주세요.",
            });
        }
        const checkDupEmail = await usersModel.findOne({
            where: {
                email: email,
            },
        });
        const checkDupNick = await usersModel.findOne({
            where: {
                nickname: nickname,
            },
        });
        if (checkDupEmail || checkDupNick) {
            return res.status(409).send({
                result: false,
                msg: "이메일과 닉네임 중복 확인을 다시 해주세요.",
            });
        }

        // 유저 정보 DB 추가
        const registUser = await usersModel.create({
            email: email,
            password: await hashPassword(password), // 비밀번호를 암호화하여 저장
            nickname: nickname,
        });

        // 비밀번호를 bcrypt로 암호화하는 함수
        async function hashPassword(password) {
            const saltRounds = 10;
            return await bcrypt.hash(password, saltRounds);
        }

        if (registUser) {
            req.session.userId = registUser.users_id;
            res.status(201).send({ result: true, msg: "회원가입 성공" });
        } else {
            res.status(400).send({
                result: false,
                msg: "회원가입 실패, 다시 시도해주세요.",
            });
        }
    } catch (error) {
        console.log("error", error);
        res.status(500).send("server error");
    }
};

// POST /api-server/auth/register/emailDuplicate
exports.emailDuplicate = async (req, res) => {
    try {
        const { email } = req.body;
        // 이메일 중복 검사
        const checkDupEmail = await usersModel.findOne({
            where: {
                email: email,
            },
        });
        if (checkDupEmail) {
            return res.status(409).send({
                result: false,
                msg: "이미 가입된 이메일입니다. 다른 이메일을 입력해주세요.",
            });
        } else {
            return res.status(200).send({
                result: true,
                msg: "사용할 수 있는 이메일입니다.",
            });
        }
    } catch (error) {
        console.log("error", error);
        res.status(500).send("server error");
    }
};
// POST /api-server/auth/register/nicknameDuplicate
exports.nickDuplicate = async (req, res) => {
    try {
        const { nickname } = req.body;
        // 닉네임 중복 검사
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
        } else {
            return res.status(200).send({
                result: true,
                msg: "사용할 수 있는 닉네임입니다.",
            });
        }
    } catch (error) {
        console.log("error", error);
        res.status(500).send("server error");
    }
};

// POST /api-server/auth/login
// 로그인 요청 > DB에서 유저 조회
exports.postLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        // 입력값이 없을 시 예외처리
        if (!email || !password) {
            return res.status(400).send({
                result: false,
                msg: "이메일과 비밀번호를 모두 입력해주세요.",
            });
        }
        const findUserData = await usersModel.findOne({
            where: {
                email: email,
            },
        });

        if (findUserData) {
            const isPasswordMatch = await bcrypt.compare(
                password,
                findUserData.password
            );

            if (isPasswordMatch) {
                req.session.userId = findUserData.user_id;
                res.status(200).send({
                    result: true,
                    msg: "로그인 성공",
                    userId: findUserData.user_id,
                    email: findUserData.email,
                    data: findUserData,
                });
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

// GET /api-server/auth/logout
exports.logout = (req, res) => {
    req.session.destroy((err) => {
        if (err) throw err;
    });
    res.status(200).send({ result: true, msg: "로그아웃 성공" });
};

// GET /api-server/auth/mypage
exports.getOneUser = async (req, res) => {
    console.log("서버 마이페이지 세션 id:: ", req.session.userId);
    try {
        const userData = await usersModel.findOne({
            where: {
                user_id: req.session.userId,
            },
        });

        if (userData) {
            res.status(200).send({
                result: true,
                data: userData,
                msg: "유저 정보 확인",
            });
        } else {
            res.status(404).send({
                result: false,
                msg: "유저 정보를 찾을 수 없습니다.",
            });
        }
    } catch (error) {
        console.log("error", error);
        res.status(500).send("server error");
    }
};

// PATCH /api-server/auth/mypage/changePassword
exports.patchUserPassword = async (req, res) => {
    try {
        const { password } = req.body;

        const isUpdated = await usersModel.update(
            {
                password: await hashPassword(password),
            },
            {
                where: {
                    user_id: req.session.userId,
                },
            }
        );

        // 비밀번호를 bcrypt로 암호화하는 함수
        async function hashPassword(password) {
            const saltRounds = 10;
            return await bcrypt.hash(password, saltRounds);
        }

        if (isUpdated > 0) {
            res.status(200).send({
                result: true,
                msg: "비밀번호가 변경되었습니다.",
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

// PATCH /api-server/auth/mypage/changeNickname
exports.patchUserNickname = async (req, res) => {
    try {
        const { nickname } = req.body;

        const isUpdated = await usersModel.update(
            {
                nickname: nickname,
            },
            {
                where: {
                    user_id: req.session.userId,
                },
            }
        );

        if (isUpdated > 0) {
            res.status(200).send({
                result: true,
                msg: "닉네임이 변경되었습니다.",
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

// PATCH /api-server/auth/mypage/changeCustom
exports.patchCustom = async (req, res) => {
    try {
        const { profile, profileEdge, theme } = req.body;

        const [updateCustom] = await usersModel.update(
            {
                profile: profile,
                profileEdge: profileEdge,
                theme: theme,
            },
            {
                where: {
                    user_id: req.session.userId,
                },
            }
        );

        if (updateCustom) {
            res.status(200).send({
                result: true,
                msg: "유저 커스텀이 변경되었습니다.",
            });
        } else {
            res.send({
                result: false,
                msg: "유저 정보가 수정되지 않았습니다.",
            });
        }
    } catch (error) {
        console.log("error", error);
        res.status(500).send("server error");
    }
};

// DELETE /api-server/auth/mypage/delete
exports.deleteUserData = async (req, res) => {
    try {
        const isDeleted = await usersModel.destroy({
            where: {
                user_id: req.session.userId,
            },
        });

        if (isDeleted > 0) {
            req.session.destroy((err) => {
                if (err) throw err;
            });
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
