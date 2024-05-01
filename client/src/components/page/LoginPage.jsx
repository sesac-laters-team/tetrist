import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
    registerUser,
    loginUser,
    logoutUser,
} from "../../redux/store/module/authModule";
import { useNavigate } from "react-router-dom";
import Modal from "../common/commonmodal";
import "../../styles/Login.scss";

const AuthForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // 모달 관리 state
    const [createModal, setCreateModal] = useState(false);
    // 입력값 저장 state
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const closeModal = () => {
        if (
            window.confirm(
                "화면을 전환하시겠습니까? 작성하신 데이터는 저장되지 않습니다."
            )
        ) {
            setCreateModal(false);
        }
    };

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
                <div className="logoWrap">LOGO</div>
                <form onSubmit={handleLogin}>
                    <div className="emailWrap">
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="이메일"
                        />
                    </div>
                    <div className="pwWrap">
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="비밀번호"
                        />
                    </div>
                    <div className="loginBtnWrap">
                        <button type="submit">로그인</button>
                    </div>
                </form>
                <div className="registerBtnWrap">
                    <button type="button" onClick={() => setCreateModal(true)}>
                        회원가입
                    </button>
                </div>
                {createModal && (
                    <Modal type="Register" closeModal={closeModal} />
                )}
            </div>
        </div>
    );
};

export default AuthForm;
