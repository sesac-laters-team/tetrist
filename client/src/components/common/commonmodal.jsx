import React from "react";
import RankingModalContent from "../waitingRoom/RankingModalContent"; // 랭킹 컴포넌트 임포트
import MyPageContent from "../waitingRoom/MyPageContent";
import ShopModalContent from "../waitingRoom/ShopModalContent"
import RegisterModalContent from "../auth/RegisterModalContent"

const Modal = ({ type, closeModal }) => {
  const renderModalContent = () => {
    switch (type) {
      case 'Rank':
        return <RankingModalContent />;
      case 'MyPage':
        // 프로필 정보 컴포넌트를 렌더링
        return <MyPageContent/>;
      case 'Shop':
        // 상점 컴포넌트를 렌더링
        return <ShopModalContent/>
        
        case 'Register':
          return <RegisterModalContent />;
      default:
        return <div>내용이 없습니다.</div>;
    }
  };

  return (
    <div className="modal-backdrop" onClick={closeModal}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {renderModalContent()}
    
      </div>
    </div>
  );
};

export default Modal;
