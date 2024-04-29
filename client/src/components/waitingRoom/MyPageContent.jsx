const MyPageContent = () => {
    // 사용자 정보와 기타 상태들을 여기에 설정할 수 있습니다.
  
    return (
      <div className="mypage-container">
        <div className="mypage-title">마이페이지</div>
        <div className="user-info">
          <img className="user-avatar" src="/path/to/avatar.png" alt="Avatar" />
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
          {/* <div className="status-comment">전적에 대한 추가적인 설명이나 정보.</div> */}
        </div>
        <div className="user-actions">
          <button className="action-button">비밀번호 변경</button>
          <button className="action-button">회원탈퇴</button>
        </div>
      </div>
    );
  };
  
  export default MyPageContent;
  