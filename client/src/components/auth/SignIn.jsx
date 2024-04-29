import { useState } from "react";
// import { Socket } from "socket.io-client";
import Logo from "../common/Logo";
import { useDispatch } from "react-redux";
import axios from "axios";
import { login } from "../../redux/actions/authActions";
import { useNavigate } from "react-router-dom";

const Signin = ({ setOpenModal }) => {
    const [email, setEmail] = useState(""); // input에 입력된 id 저장
    const [pw, setPw] = useState(""); // input에 입력된 pw 저장
    const dispatch = useDispatch();
    const nav = useNavigate();
    const signIn = async (e) => {
        e.preventDefault();
        if (email === "") {
            alert("이메일 아이디를 입력해주세요.");
            return;
        } else if (pw === "") {
            alert("비밀번호를 입력해주세요");
            return;
        } else {
            const data = { email, password: pw };
            try {
                const res = await axios.post(
                    "http://localhost:8080/api-server/signIn",
                    data
                );
                dispatch(login(data));
                if (res.data.idError || res.data.pwError) {
                    alert(res.data.message);
                } else if (res.data.loginSuccess) {
                    nav("/");
                }
            } catch (err) {
                throw err;
            }
        }
    };
    return (
        <div className="signInModal">
            <Logo />
            <form onSubmit={signIn}>
                <div className="inputWrap">
                    <div className="emailWrap">
                        <input
                            className="input"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="이메일"
                        />
                    </div>
                    <div className="pwWrap">
                        <input
                            className="input"
                            type="password"
                            value={pw}
                            onChange={(e) => setPw(e.target.value)}
                            placeholder="비밀번호"
                        />
                    </div>
                </div>
                <div className="loginBtnWrap">
                    <input type="submit" value="로그인" className="btn" />
                </div>
            </form>
            <div className="registerBtnWrap">
                {/* 회원가입 클릭 시 회원가입 페이지로 모달창 변경*/}
                <div
                    onClick={() => setOpenModal("signUp")}
                    className="btn text"
                >
                    <span>회원가입</span>
                </div>
            </div>
        </div>
    );
};

export default Signin;
