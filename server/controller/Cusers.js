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

// POST /register
// 회원가입 요청 > DB에 유저 정보 추가
exports.postRegister = async (req, res) => {
    try {
        const { email, password, nickname } = req.body;
        // 이메일 중복 검사
        const checkDupEmail = await usersModel.findOne({
            where: {
                email: email,
            },
        });
        if (checkDupEmail)
            return res.send({
                result: false,
                msg: "동일한 이메일이 있습니다.",
            });
        // 닉네임 중복 검사
        const checkDupNick = await usersModel.findOne({
            where: {
                nickname: nickname,
            },
        });
        if (checkDupNick)
            return res.send({
                result: false,
                msg: "동일한 닉네임이 있습니다.",
            });
        // email, password, nickname 중 입력 값이 없을 시 예외처리
        if (!email || !password || !nickname) {
            return res
                .status(404)
                .send({ result: false, msg: "입력 값을 모두 작성해주세요" });
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

// POST /login
// 로그인 요청 > DB에서 유저 조회
exports.postLogin = async (req, res) => {
    try {
        console.log(req.body);
        const { email, password } = req.body;
        // 입력값이 없을 시 예외처리
        if (!email || !password) {
            return res.status(404).send({
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
                console.log("pw:::", password, "fp:::", findUserData.password);
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

// GET /logout
exports.logout = (req, res) => {
    req.session.destroy((err) => {
        if (err) throw err;
    });
    res.send({ result: true, msg: "로그아웃 성공" });
};
