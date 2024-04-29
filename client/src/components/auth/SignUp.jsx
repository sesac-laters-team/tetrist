import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { register, registerFail } from "../../redux/actions/authActions";
const SignUp = ({ setOpenModal }) => {
    // 초기값 및 input값을 저장하기 위한 state
    const [email, setEmail] = useState("");
    const [nickname, setNickname] = useState("");
    const [pw, setPw] = useState("");
    const [pwConfirm, setPwConfirm] = useState("");
    // 유효성 검사를 위한 state
    const [isValidEmail, setIsValidEmail] = useState(false); // id와 정규식 대조를 위한 state
    const [isEmailDuplicate, setIsEmailDuplicate] = useState(false); // id가 중복되지 않았는지 확인하는 state
    const [isValidNickname, setIsValidNickname] = useState(false); // 닉네임과 정규식을 대조하기 위한 statev
    const [isNicknameDuplicate, setIsNicknameDuplicate] = useState(false); // 닉네임이 중복되지 않았는지 확인하는 state
    const [isValidPw, setIsValidPw] = useState(false);
    const [isPwConfirm, setIsPwConfirm] = useState(false);
    // 오류 발생 시 메시지 전달을 위한 state
    const [emailMessage, setEmailMessage] =
        useState("이메일 형식에 맞춰 작성해주세요.");
    const [nicknameMessage, setNicknameMessage] = useState(
        "닉네임은 영문 숫자 한글을 포함해 2~8자 사이로 작성해주세요."
    );
    const [pwMessage, setPwMessage] = useState(
        "비밀번호는 영문 숫자 특수문자를 모두 포함해 8~16자 사이로 작성해주세요."
    );
    const [pwConfirmMessage, setPwConfirmMessage] = useState("");

    const axiosInstance = axios.create({
        validateStatus: function (status) {
            return status >= 200 && status < 500; // 상태 코드가 200 이상 500 미만인 경우 유효하다고 판단
        },
    });

    const changeEmail = (e) => {
        setIsEmailDuplicate(false);
        const currentEmail = e.target.value;
        setEmail(currentEmail);
        // /^[a-zA-z0-9]{4,12}$/
        const emailRegExp =
            /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/;
        if (currentEmail === "") {
            setEmailMessage("이메일 형식에 맞춰 작성해주세요.");
            setIsValidEmail(false);
        } else if (!emailRegExp.test(currentEmail)) {
            setEmailMessage("사용할 수 없는 이메일 입니다.");
            setIsValidEmail(false);
        } else {
            setEmailMessage("");
            setIsValidEmail(true);
        }
    };

    const emailDuplicate = async () => {
        if (!email || !isValidEmail) {
            alert("잘못된 형식입니다. 다시 입력해주세요.");
            setIsEmailDuplicate(false);
            return;
        } else {
            const response = await axiosInstance.post(
                "http://localhost:8080/api-server/emailDuplicate",
                {
                    email,
                }
            );
            if (response.status === 200) {
                alert(response.data.message);
                setIsEmailDuplicate(true);
            } else if (response.status === 409) {
                alert(response.data.message);
                setIsEmailDuplicate(false);
            }
        }
    };

    const changeNickname = (e) => {
        setIsNicknameDuplicate(false);
        const currentNickname = e.target.value;
        setNickname(currentNickname);
        const nicknameRegExp = /^(?=.*[a-z0-9가-힣])[a-z0-9가-힣]{2,8}$/;
        if (currentNickname === "") {
            setNicknameMessage(
                "닉네임은 영문 숫자 한글을 포함해 2~8자 사이로 작성해주세요."
            );
        } else if (!nicknameRegExp.test(currentNickname)) {
            setNicknameMessage("사용할 수 없는 닉네임입니다");
            setIsValidNickname(false);
        } else {
            setNicknameMessage("");
            setIsValidNickname(true);
        }
    };

    const nicknameDuplicate = async () => {
        if (!nickname || !isValidNickname) {
            alert("닉네임을 다시 입력해주세요.");
            setIsNicknameDuplicate(false);
            return;
        } else {
            const response = await axiosInstance.post(
                "http://localhost:8080/api-server/nicknameDuplicate",
                {
                    nickname: nickname,
                }
            );
            if (response.status === 200) {
                alert(response.data.message);
                setIsNicknameDuplicate(true);
            } else if (response.status === 409) {
                alert(response.data.message);
                setIsNicknameDuplicate(false);
            }
        }
    };

    const changePw = (e) => {
        const currentPw = e.target.value;
        setPw(currentPw);
        const pwRegExp = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,16}$/;
        if (currentPw === "") {
            setPwMessage(
                "비밀번호는 영문 숫자 특수문자를 모두 포함해 8~16자 사이로 작성해주세요."
            );
            setIsValidPw(false);
            setIsPwConfirm(false);
        } else if (!pwRegExp.test(currentPw)) {
            setPwMessage("사용할 수 없는 비밀번호입니다");
            setIsValidPw(false);
            setIsPwConfirm(false);
        } else {
            setPwMessage("사용 가능한 비밀번호입니다.");
            setIsValidPw(true);
            setIsPwConfirm(currentPw === pwConfirm);
        }
    };

    const pwCheck = (e) => {
        setPwConfirm(e.target.value);
        if (!pwConfirm) {
            setPwConfirmMessage("");
        } else if (pw !== e.target.value) {
            setPwConfirmMessage("비밀번호가 일치하지 않습니다.");
            setIsPwConfirm(false);
        } else {
            setPwConfirmMessage("비밀번호가 일치합니다.");
            setIsPwConfirm(true);
        }
    };

    useEffect(() => {
        if (isPwConfirm) {
            setPwConfirmMessage("비밀번호가 일치합니다.");
        } else {
            if (pwConfirm !== "") {
                setPwConfirmMessage("비밀번호가 일치하지 않습니다.");
            } else {
                setPwConfirmMessage("");
            }
        }
    }, [isPwConfirm, pwConfirm]);

    const dispatch = useDispatch();
    const signUp = async () => {
        if (
            isValidEmail &&
            isEmailDuplicate &&
            isValidNickname &&
            isNicknameDuplicate &&
            isValidPw &&
            isPwConfirm
        ) {
            // 모든 조건 만족시 실행시킬 구문 작성
            const data = { email, nickname, password: pw };
            try {
                const res = await axios.post(
                    "http://localhost:8080/api-server/signUp",
                    data
                );
                dispatch(register(data));
                alert(res.data.message);
                setOpenModal("signIn");
            } catch (err) {
                dispatch(registerFail(err));
                alert("회원가입 실패!", err.response.data.message);
            }
        } else if (!isEmailDuplicate) {
            alert("이메일 중복 여부를 확인해주세요.");
        } else if (!isNicknameDuplicate) {
            alert("닉네임 중복 여부를 확인해주세요.");
        }
    };
    return (
        <div className="signUpModal">
            <form>
                <div className="email">
                    <div>
                        <input
                            type="email"
                            value={email}
                            onChange={changeEmail}
                            placeholder="사용하실 이메일 아이디를 입력해주세요."
                        />
                    </div>
                    <div className="BtnWrap">
                        <input
                            type="button"
                            value="중복 확인"
                            onClick={emailDuplicate}
                        />
                    </div>
                </div>
                <div className="idMessage">{emailMessage}</div>
                <div>
                    <div>
                        <input
                            type="text"
                            value={nickname}
                            onChange={changeNickname}
                            placeholder="사용하실 닉네임을 입력해주세요."
                        />
                    </div>
                    <div className="nicknameMessage">{nicknameMessage}</div>
                    <div className="nicknameMessage"></div>
                    <input
                        type="button"
                        value="중복 확인"
                        onClick={nicknameDuplicate}
                    />
                </div>
                <div>
                    <div>
                        <input
                            type="password"
                            value={pw}
                            onChange={changePw}
                            placeholder="비밀번호를 입력해주세요."
                        />
                    </div>
                    <div className="pwMessage">{pwMessage}</div>
                </div>
                <div>
                    <div>
                        <input
                            type="password"
                            onChange={pwCheck}
                            placeholder="비밀번호를 한 번 더 입력해주세요."
                        />
                    </div>
                    <div className="pwConfirmMessage">{pwConfirmMessage}</div>
                </div>
                <div>
                    <input
                        type="button"
                        id="registerBtn"
                        className="btn"
                        value="회원가입"
                        onClick={signUp}
                    />
                </div>
                <div
                    className="btn text"
                    onClick={() => setOpenModal("signIn")}
                >
                    <span>로그인 화면으로</span>
                </div>
            </form>
        </div>
    );
};

export default SignUp;
