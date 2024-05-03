import React, { useState, useRef } from "react";
import axios from "axios";

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
    const inputRef = useRef(null);
    const userInfo = myInfo && myInfo.data;

    const handleDeleteAccount = () => {
        setModalOpen(true); // 모달을 열어줌
    };

    const handleCloseModal = () => {
        setModalOpen(false); // 모달을 닫음
    };

    const handleConfirmDelete = () => {
        console.log("회원 탈퇴 처리됨");
        setModalOpen(false);
        // 회원 탈퇴 로직 실행
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
                    "http://localhost:8080/api-server/auth/mypage/changeNickname",
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

    return (
        <div className="mypage-container">
            <div className="mypage-title">마이페이지</div>
            <div className="user-info">
                <img
                    className="user-avatar"
                    src="/path/to/avatar.png"
                    alt="Avatar"
                />
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
                            편집하기
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
                    <span className="status-value">7승 2패 (승률 70%)</span>
                </div>
            </div>
            <div className="user-actions">
                <button className="action-button">비밀번호 변경</button>
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
