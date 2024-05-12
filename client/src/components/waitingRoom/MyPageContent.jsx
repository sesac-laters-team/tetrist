import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { FaEye, FaEyeSlash } from "react-icons/fa";

// 사용자 정의 모달 컴포넌트
const ConfirmationModal = ({ isOpen, onClose, onConfirm }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-backdrop">
            <div className="modal-content">
                <h2>회원 탈퇴</h2>
                <p>정말로 회원 탈퇴를 하시겠습니까?</p>
                <button onClick={onConfirm}>확인</button>
                <button onClick={onClose}>취소</button>
            </div>
        </div>
    );
};

const MyPageContent = ({ myInfo }) => {
    const [isModalOpen, setModalOpen] = useState(false);
    const [nickname, setNickname] = useState("");
    const [isEditing, setIsEditing] = useState(false);
    const [isChangePwVisible, setIsChangePwVisible] = useState(false);
    const [newPassword, setNewPassword] = useState("");
    const [showPw, setShowPw] = useState(false); // 추가된 상태
    const inputRef = useRef(null);
    const userInfo = myInfo && myInfo.data;

    const handleDeleteAccount = () => {
        setModalOpen(true); // 모달을 열어줌
    };

    const handleCloseModal = () => {
        setModalOpen(false); // 모달을 닫음
    };

    const handleConfirmDelete = () => {
        axios
            .delete(`${process.env.REACT_APP_API_SERVER}/auth/mypage/delete`)
            .then((response) => {
                alert(`${response.data.msg}`);
                window.location.href = "/login";
            })
            .catch((error) => console.error(error));
    };

    const handleEditNickname = () => {
        setIsEditing(true);
    };

    const handleSaveNickname = () => {
        setIsEditing(false);
        const newNickname = inputRef.current.value.trim();
        if (newNickname === "") {
            alert("닉네임은 공백일 수 없습니다.");
            return;
        }
        if (newNickname !== nickname) {
            axios
                .patch(
                    `${process.env.REACT_APP_API_SERVER}/auth/mypage/changeNickname`,
                    { nickname: newNickname }
                )
                .then((response) => {
                    console.log("닉네임 변경 요청 성공", response);
                    setNickname(newNickname);
                    alert("닉네임이 변경되었습니다.");
                })
                .catch((error) => {
                    console.error("닉네임 변경 요청 실패", error);
                });
        }
    };

    const handleChangePw = () => {
        setIsChangePwVisible(true); // 새 비밀번호 입력 필드를 보이도록 설정
    };

    const handleSendNewPw = () => {
        const pwRegExp = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{6,16}$/;
        if (newPassword.includes(" ") || !pwRegExp.test(newPassword)) {
            alert(
                "비밀번호는 영문, 숫자, 특수문자를 모두 포함해 6~16자 사이로 작성해주세요."
            );
            return;
        }

        axios
            .patch(
                `${process.env.REACT_APP_API_SERVER}/auth/mypage/changePassword`,
                { password: newPassword }
            )
            .then((response) => {
                console.log("비밀번호 변경 요청 성공", response);
                setNewPassword(""); // 비밀번호 입력란 비우기
                setIsChangePwVisible(false); // 비밀번호 변경란 숨기기
                alert(`${response.data.msg}`);
            })
            .catch((error) => {
                console.error("비밀번호 변경 요청 실패", error);
            });
    };

    const handleNewPasswordChange = (event) => {
        setNewPassword(event.target.value);
    };

    // 승률
    const winningRate =
        userInfo &&
        (userInfo.win + userInfo.lose === 0
            ? 0
            : (userInfo.win / (userInfo.win + userInfo.lose)) * 100
        ).toFixed(2);

    return (
        <div className="mypage-container">
            <div className="mypage-title">마이페이지</div>
            <div className="user-info">
                <div className="user-avatar-container">
                    <img
                        className="user-avatar"
                        src={
                            userInfo && userInfo.profile !== "/profile/default"
                                ? userInfo && userInfo.profile
                                : "/images/profile/cat.png"
                        }
                        alt="Avatar"
                    />
                    <img
                        className="user-avatar profileEdge"
                        src={
                            userInfo &&
                            userInfo.profileEdge !== "/profileEdge/default"
                                ? userInfo && userInfo.profileEdge
                                : "/images/profile_edge/frame_triangle.png"
                        }
                        alt="user-profileEdge"
                    />
                </div>
                <div className="user-details">
                    <input
                        className="username"
                        type="text"
                        defaultValue={userInfo && userInfo.nickname}
                        readOnly={!isEditing}
                        ref={inputRef}
                    />
                    {isEditing ? (
                        <button
                            className="edit-button"
                            onClick={handleSaveNickname}
                        >
                            저장
                        </button>
                    ) : (
                        <button
                            className="edit-button"
                            onClick={handleEditNickname}
                        >
                            편집
                        </button>
                    )}
                </div>
            </div>
            <div className="user-status">
                <div className="status-item">
                    <span className="status-title">포인트:</span>
                    <span className="status-value">
                        {userInfo && userInfo.point}
                    </span>
                </div>
                <div className="status-item">
                    <span className="status-title">전적:</span>
                    <span className="status-value">
                        {userInfo && userInfo.win}승 {userInfo && userInfo.lose}
                        패 (승률 {winningRate}%)
                    </span>
                </div>
            </div>
            {isChangePwVisible && (
                <div style={{ textAlign: "center", marginBottom: "20px" }}>
                    {" "}
                    {/* 부모 요소에 text-align: center 및 여백 추가 */}
                    <label>새 비밀번호</label>
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <div
                            style={{
                                position: "relative",
                                width: "fit-content",
                            }}
                        >
                            <input
                                className="username"
                                type={showPw ? "text" : "password"}
                                value={newPassword}
                                onChange={handleNewPasswordChange}
                                style={{
                                    paddingRight: "35px", // 아이콘의 공간 확보
                                    borderRadius: "5px",
                                    border: "2px solid black",
                                }}
                            />
                            {showPw ? (
                                <FaEyeSlash
                                    className="eye"
                                    onClick={() => setShowPw(false)}
                                    style={{
                                        position: "absolute",
                                        right: "10px", // `input` 내부 여백에 맞게 간격 설정
                                        top: "50%",
                                        transform: "translateY(-50%)",
                                        cursor: "pointer",
                                    }}
                                />
                            ) : (
                                <FaEye
                                    className="eye"
                                    onClick={() => setShowPw(true)}
                                    style={{
                                        position: "absolute",
                                        right: "10px", // `input` 내부 여백에 맞게 간격 설정
                                        top: "50%",
                                        transform: "translateY(-50%)",
                                        cursor: "pointer",
                                    }}
                                />
                            )}
                        </div>
                    </div>
                    <div>
                        <button
                            className="action-button"
                            onClick={handleSendNewPw}
                        >
                            변경
                        </button>
                        <button
                            className="action-button"
                            onClick={() => setIsChangePwVisible(false)}
                        >
                            취소
                        </button>
                    </div>
                </div>
            )}

            <div className="user-actions">
                <button className="action-button" onClick={handleChangePw}>
                    비밀번호 변경
                </button>
                <button className="action-button" onClick={handleDeleteAccount}>
                    회원탈퇴
                </button>
            </div>
            {isModalOpen && (
                <ConfirmationModal
                    isOpen={isModalOpen}
                    onClose={handleCloseModal}
                    onConfirm={handleConfirmDelete}
                />
            )}
        </div>
    );
};

export default MyPageContent;
