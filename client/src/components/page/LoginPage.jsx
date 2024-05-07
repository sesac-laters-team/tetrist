import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../../redux/store/module/authModule";
import { useNavigate } from "react-router-dom";
import Modal from "../common/commonmodal";
import "../../styles/Login.scss";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const AuthForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // 모달 관리 state
    const [createModal, setCreateModal] = useState(false);

    // 입력값 저장 state
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // 비밀번호 보이기/숨기기 값 저장 state
    const [showPw, setShowPw] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        if (email === "" || password === "") {
            alert("이메일과 비밀번호를 모두 입력해주세요.");
            return;
        }
        try {
            await dispatch(loginUser(email, password));
            navigate("/waiting"); // 로그인 성공 시 /waiting 페이지로 이동
        } catch (error) {
            console.log(error);
            alert("로그인에 실패했습니다. 다시 시도해주세요.");
        }
    };

    return (
        <div className="container">
            <div className="contentWrap">
                <div className="logoWrap">
                    <img src="/images/tetrist_logo.gif" alt="LOGO" />
                </div>
                <form onSubmit={handleLogin}>
                    <div className="inputWrap email">
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="이메일"
                        />
                    </div>
                    <div className="inputWrap">
                        <input
                            className="pw"
                            type={showPw ? "text" : "password"}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="비밀번호"
                        />
                        {showPw ? (
                            <FaEyeSlash
                                className="eye"
                                onClick={() => {
                                    setShowPw(false);
                                }}
                            />
                        ) : (
                            0
                        )}
                    </div>
                    <div className="btnWrap">
                        <button type="submit" className="login">
                            로그인
                        </button>
                        <button
                            type="button"
                            onClick={() => setCreateModal(true)}
                        >
                            회원가입
                        </button>
                    </div>
                </form>
            </div>
            {createModal && (
                <Modal
                    type="Register"
                    closeModal={() => setCreateModal(false)}
                />
            )}
        </div>
    );
};

export default AuthForm;
