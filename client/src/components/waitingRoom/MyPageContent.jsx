import React, { useState } from "react";

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

    console.log("전달 받은 내 정보 :: ", myInfo);

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
                    <div className="username">닉네임 1</div>
                    <button className="edit-button">편집하기</button>
                </div>
            </div>
            <div className="user-status">
                <div className="status-item">
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
