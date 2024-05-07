import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";

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
    const inputRef = useRef(null);
    const userInfo = myInfo && myInfo.data;

    const handleDeleteAccount = () => {
        setModalOpen(true); // 모달을 열어줌
    };

    const handleCloseModal = () => {
        setModalOpen(false); // 모달을 닫음
    };

    const handleConfirmDelete = () => {
        // console.log("회원 탈퇴 처리됨");
        setModalOpen(false);
        // 회원 탈퇴 로직 실행
        const response = axios
            .delete(`${process.env.REACT_APP_API_SERVER}/auth/mypage/delete`)
            .then(alert(`${response.data.msg}`));
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
            // 닉네임이 변경되었을 때만 요청을 보냄
            axios
                .patch(
                    `${process.env.REACT_APP_API_SERVER}/auth/mypage/changeNickname`,
                    { nickname: newNickname }
                )
                .then((response) => {
                    console.log("닉네임 변경 요청 성공", response);
                    setNickname(newNickname);
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
        if (newPassword === "") {
            alert("비밀번호는 공백일 수 없습니다.");
            return;
        }
        axios
            .patch(
                `${process.env.REACT_APP_API_SERVER}/auth/mypage/changePassword`,
                { password: newPassword }
            )
            .then((response) => {
                console.log("닉네임 변경 요청 성공", response);
                setNickname(newPassword);
                setIsChangePwVisible(false);
                alert(`${response.data.msg}`);
            })
            .catch((error) => {
                console.error("닉네임 변경 요청 실패", error);
            });
    };

    const handleNewPasswordChange = (event) => {
        const newValue = event.target.value;
        if (newValue.includes(" ")) {
            alert("비밀번호에는 공백을 포함할 수 없습니다.");
            return;
        } else {
            // 공백이 없으면 상태 업데이트
            setNewPassword(newValue);
        }
    };

    // 승률
    const winningRate =
        userInfo && (userInfo.win / (userInfo.win + userInfo.lose)) * 100;

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
                            저장하기
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
                    <div>
                        <span className="status-title">포인트:</span>
                        <span className="status-value">
                            {userInfo && userInfo.point}
                        </span>
                    </div>
                    <span className="status-title">전적:</span>
                    <span className="status-value">
                        {userInfo && userInfo.win}승 {userInfo && userInfo.lose}
                        패 (승률 {winningRate}%)
                    </span>
                </div>
            </div>
            {isChangePwVisible && (
                <div>
                    <br />
                    새 비밀번호 :
                    <input
                        type="password"
                        className="chagnePwInput"
                        value={newPassword}
                        onChange={handleNewPasswordChange}
                    />
                    <button onClick={handleSendNewPw}>변경</button>
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
