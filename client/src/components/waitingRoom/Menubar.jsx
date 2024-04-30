import React, { useState } from "react";
import Modal from "../common/commonmodal"; // Modal 컴포넌트를 임포트
import { useDispatch } from "react-redux"; // 리덕스 훅 사용
import { logoutUser } from "../../redux/store/module/authModule"; // 로그아웃 액션 임포트
import { useNavigate } from "react-router-dom"; // 리액트 라우터 네비게이트 훅

const Menubar = () => {
  const [modalType, setModalType] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const openModal = (type) => {
    setModalType(type);
  };

  const closeModal = () => {
    setModalType("");
  };

  const handleLogout = () => {
    dispatch(logoutUser());  // 로그아웃 액션을 디스패치하며 로컬 스토리지 클린업
    navigate("/login"); // 로그아웃 후 로그인 페이지로 리다이렉션
  };

  return (
    <div className="menubar">
      <button onClick={() => openModal('Rank')} className="menubar-button">랭킹</button>
      <button onClick={() => openModal('MyPage')} className="menubar-button">내 정보</button>
      <button onClick={() => openModal('Shop')} className="menubar-button">상점</button>
      <button onClick={handleLogout} className="menubar-button">로그아웃</button> {/* 로그아웃 버튼 추가 */}

      {modalType && <Modal type={modalType} closeModal={closeModal} />}
    </div>
  );
};

export default Menubar;
