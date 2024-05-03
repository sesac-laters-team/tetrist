import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../redux/store/module/authModule";
import axios from "axios";
axios.defaults.withCredentials = true;

const RegisterModalContent = ({ closeModal }) => {
    const dispatch = useDispatch();

    // 입력값 저장 state
    const [email, setEmail] = useState("");
    const [nickname, setNickname] = useState("");
    const [password, setPassword] = useState("");
    const [checkPassword, setCheckPassword] = useState("");

    // 유효성 체크 여부 및 중복 검사 여부를 관리하는 state
    const [emailValidCheck, setEmailValidCheck] = useState(false);
    const [emailDuplicateCheck, setEmailDuplicateCheck] = useState(false);
    const [nickValidCheck, setNickValidCheck] = useState(false);
    const [nickDuplicateCheck, setNickDuplicateCheck] = useState(false);
    const [pwValidCheck, setPwValidCheck] = useState(false);
    const [confirmPw, setConfirmPw] = useState(false);

    // 오류 메시지 저장을 위한 state
    const [emailValidMessage, setEmailValidMessage] = useState("");
    const [nickValidMessage, setNickValidMessage] = useState("");
    const [pwValidMessage, setPwValidMessage] = useState("");
    const [pwConfirmMessage, setPwConfirmMessage] = useState("");
    // 중복 검사 증 데이터 중복 시 409 에러를 방지 => axiosInstance.post
    const axiosInstance = axios.create({
        validateStatus: function (status) {
            return status >= 200 && status < 500; // 상태 코드가 200 이상 500 미만인 경우 유효하다고 판단
        },
    });
    // 중복 검사용 함수
    const checkDuplicate = async (type, value) => {
        // 이메일 중복 검사 버튼 클릭 시
        if (type === "email") {
            if (email === "") {
                alert("이메일 아이디를 입력해주세요.");
            } else if (!emailValidCheck) {
                alert("잘못된 형식입니다. 이메일을 다시 입력해주세요.");
                return;
            } else {
                const response = await axiosInstance.post(
                    "http://localhost:8080/api-server/auth/emailDuplicate",
                    { email: value }
                );
                alert(response.data.msg);
                if (!response.data.result) {
                    setEmailDuplicateCheck(false);
                } else {
                    setEmailDuplicateCheck(true);
                }
            }
            // 닉네임 중복 검사 버튼 클릭 시
        } else if (type === "nickname") {
            if (nickname === "") {
                alert("닉네임을 입력해주세요.");
            } else if (!nickValidCheck) {
                alert("잘못된 형식입니다. 닉네임을 다시 입력해주세요.");
                return;
            } else {
                const response = await axiosInstance.post(
                    "http://localhost:8080/api-server/auth/nicknameDuplicate",
                    { nickname: value }
                );
                alert(response.data.msg);
                if (!response.data.result) {
                    setNickDuplicateCheck(false);
                } else {
                    setNickDuplicateCheck(true);
                }
            }
        }
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        if (!emailDuplicateCheck) {
            alert("이메일 중복확인을 해주세요.");
        } else if (!nickDuplicateCheck) {
            alert("닉네임 중복확인을 해주세요.");
        } else if (
            emailValidCheck &&
            emailDuplicateCheck &&
            nickValidCheck &&
            nickDuplicateCheck &&
            pwValidCheck &&
            confirmPw
        ) {
            const callback = (success, message) => {
                if (success) {
                    closeModal();
                    alert(message);
                }
            };
            // 회원가입 시 필요한 이메일, 비밀번호, 닉네임을 로컬 스토리지에 저장
            dispatch(registerUser(email, password, nickname, callback));
        }
    };

    useEffect(() => {
        // 이메일 유효성 검사
        setEmailDuplicateCheck(false);
        const emailRegExp =
            /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/;
        if (!emailRegExp.test(email)) {
            setEmailValidCheck(false);
            setEmailValidMessage("이메일 형식에 맞게 작성해주세요.");
        } else {
            setEmailValidCheck(true);
            setEmailValidMessage("");
        }
    }, [email]);

    useEffect(() => {
        // 닉네임 유효성 검사
        setNickDuplicateCheck(false);
        const nickRegExp = /^(?=.*[a-z0-9가-힣])[a-z0-9가-힣]{2,8}$/;
        if (!nickRegExp.test(nickname)) {
            setNickValidCheck(false);
            setNickValidMessage(
                "닉네임은 영문 숫자 한글을 포함해 2~8자 사이로 작성해주세요."
            );
        } else {
            setNickValidCheck(true);
            setNickValidMessage("");
        }
    }, [nickname]);

    useEffect(() => {
        // 비밀번호 유효성 검사
        const pwRegExp = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{6,16}$/;
        if (!pwRegExp.test(password)) {
            setPwValidCheck(false);
            setPwValidMessage(
                "비밀번호는 영문 숫자 특수문자를 모두 포함해 6~16자 사이로 작성해주세요."
            );
        } else {
            setPwValidCheck(true);
            setPwValidMessage("사용 가능한 비밀번호 입니다.");
        }
    }, [password]);

    useEffect(() => {
        // 비밀번호 확인 검사
        if (checkPassword === "") {
            setPwConfirmMessage("비밀번호를 한 번 더 입력해주세요.");
        } else if (password !== checkPassword) {
            setConfirmPw(false);
            setPwConfirmMessage("비밀번호가 일치하지 않습니다.");
        } else {
            setConfirmPw(true);
            setPwConfirmMessage("비밀번호가 일치합니다.");
        }
    }, [password, checkPassword]);
    return (
        <div>
            <h2>회원가입</h2>
            <form onSubmit={handleRegister}>
                <div>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="이메일"
                    />
                    <button
                        type="button"
                        onClick={() => checkDuplicate("email", email)} // 이메일 중복 검사를 위해 email type과 해당 값 전달
                    >
                        중복확인
                    </button>
                    <p>{emailValidMessage}</p>
                </div>
                <div>
                    <input
                        type="text"
                        value={nickname}
                        onChange={(e) => setNickname(e.target.value)}
                        placeholder="닉네임"
                    />
                    <button
                        type="button"
                        onClick={() => checkDuplicate("nickname", nickname)} // 닉네임 중복 검사를 위해 nickname type과 해당 값 전달
                    >
                        중복확인
                    </button>
                    <p>{nickValidMessage}</p>
                </div>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="비밀번호"
                />
                <p>{pwValidMessage}</p>
                <input
                    type="password"
                    value={checkPassword}
                    onChange={(e) => setCheckPassword(e.target.value)}
                    placeholder="비밀번호 확인"
                />
                <p>{pwConfirmMessage}</p>
                <button type="submit">회원가입</button>
            </form>
        </div>
    );
};

export default RegisterModalContent;
