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
    // const [nickname, setNickname] = useState();
    const userInfo = myInfo && myInfo.data;

    // if (userInfo.nickname == nickname) {
    //     alert("현재 닉네임과 변경 닉네임이 같습니다.");
    // }

    // console.log("마이페이지 정보 :: ", userInfo);

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

    // 편집하기 btn
    const changeNick = () => {
        // useNick.disabled = false;
        // console.log(changeNick);
        // console.log("변경할 닉네임 :: ", userNick);
    };
    const storeNick = () => {
        // const changeNick = axios.post(
        //     "http://localhost:8080/api-server/auth/mypage/chageNickname",
        //     { nickname: userNick }
        // );
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
                    {/* <div className="username">닉</div> */}
                    <input
                        className="username"
                        type="text"
                        value={userInfo && userInfo.nickname}
                        // ref={userNick}
                        // onChange={(e)=>setNickname(e.target.value)}
                        disabled
                    ></input>

                    <button className="edit-button">편집하기</button>
                    {/* <button className="edit-button" onClick={changeNick}>
                        편집
                    </button> */}
                    <button className="edit-button">저장</button>
                </div>
            </div>
            <div className="user-status">
                <div className="status-item">
                    {/* <span className="status-title">전적:</span> */}
                    <span className="status-title">
                        포인트 : {userInfo && userInfo.point}
                    </span>
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
