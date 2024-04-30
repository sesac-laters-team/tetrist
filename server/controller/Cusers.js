const bcrypt = require("bcrypt");
const { usersModel } = require("../models");

exports.getAllUsers = async (req, res) => {
    try {
        const users = await usersModel.findAll();
        res.json(users);
    } catch (error) {
        res.status(500).send("server error");
    }
};

// POST /auth/register
// 회원가입 요청 > DB에 유저 정보 추가
exports.postRegister = async (req, res) => {
    try {
        const { email, password, nickname } = req.body;
        // email, password, nickname 중 입력 값이 없을 시 예외처리
        if (!email || !password || !nickname) {
            return res.send({
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
        if (checkDupEmail && checkDupNick) {
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
            res.send({ result: true, msg: "회원가입 성공" });
        } else {
            res.send({ result: false, msg: "회원가입 실패" });
        }
    } catch (error) {
        console.log("error", error);
        res.status(500).send("server error");
    }
};

// POST /auth/emailDuplicate
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
// POST /auth/nicknameDuplicate
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

// POST /auth/login
// 로그인 요청 > DB에서 유저 조회
exports.postLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        // 입력값이 없을 시 예외처리
        if (!email || !password) {
            return res.send({
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
                res.send({
                    result: true,
                    msg: "로그인 성공",
                    userId: findUserData.user_id,
                });
            } else {
                res.send({
                    result: false,
                    msg: "비밀번호가 일치하지 않습니다.",
                });
            }
        } else {
            res.send({ result: false, msg: "등록되지 않은 이메일입니다." });
        }
    } catch (error) {
        console.log("error", error);
        res.status(500).send("server error");
    }
};

// GET /auth/logout
exports.logout = (req, res) => {
    req.session.destroy((err) => {
        if (err) throw err;
    });
    res.send({ result: true, msg: "로그아웃 성공" });
};
