import React, { useState } from "react";
import Modal from "../common/commonmodal"; // Modal 컴포넌트를 임포트

const Menubar = () => {
  const [modalType, setModalType] = useState("");

  const openModal = (type) => {
    setModalType(type);
  };

  const closeModal = () => {
    setModalType("");
  };

  return (
    <div className="menubar">
      <button onClick={() => openModal('Rank')}>랭킹</button>
      <button onClick={() => openModal('MyPage')}>내 정보</button>
      <button onClick={() => openModal('Shop')}>상점</button>

      {modalType && <Modal type={modalType} closeModal={closeModal} />}
    </div>
  );
};

export default Menubar;