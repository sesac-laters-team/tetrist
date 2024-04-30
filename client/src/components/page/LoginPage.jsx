// AuthForm.jsx
import React, { useState } from 'react';

import { useDispatch } from 'react-redux';
import { loginUser, registerUser } from '../../redux/store/module/authModule';
import { useNavigate } from 'react-router-dom';
import Modal from '../common/commonmodal'; // 모달 컴포넌트 import
import RegisterModalContent from '../auth/RegisterModalContent'; // 회원가입 모달 컨텐츠 import

const AuthForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nickname, setNickname] = useState('');
  const [showRegisterModal, setShowRegisterModal] = useState(false); // 회원가입 모달 표시 상태 추가
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    dispatch(registerUser(email, password, nickname))
      .then(() => {
        console.log("회원가입 성공");
        localStorage.setItem('user', JSON.stringify({ email, nickname, password }));
  
        // 회원가입 후 로그인 처리
        dispatch(loginUser(email, password))
          .then(() => {
            console.log("로그인 성공");
            localStorage.setItem('user', JSON.stringify({ email, password }));
         
            
            // 회원가입 후 이메일과 비밀번호 초기화
            setEmail('');
            setPassword('');
          })
          .catch(error => {
            console.error("로그인 실패", error);
          });
      })
      .catch(error => {
        console.error("회원가입 실패", error);
      });
  };
  

  const handleLogin = (e) => {
    e.preventDefault();
    if (!email || !password) {
      console.error("이메일과 비밀번호를 입력해주세요.");
      return;
    }
    dispatch(loginUser(email, password))
      .then(() => {
        console.log("로그인 성공");
        localStorage.setItem('user', JSON.stringify({ email, password }));
        navigate('/waiting');
       
      })
      .catch(error => {
        console.error("로그인 실패", error);
      });
  };

  return (
    <div>
      <form onSubmit={handleLogin}>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="이메일" required />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="비밀번호" required />

        <button type="submit">로그인</button>
      </form>
      {/* 회원가입 버튼 */}
      <button onClick={() => setShowRegisterModal(true)}>회원가입</button>
      {/* 회원가입 모달 */}
      {showRegisterModal && (
        <Modal type="Register" closeModal={() => setShowRegisterModal(false)}>
          {/* 회원가입 폼 */}
          <RegisterModalContent
            handleRegister={handleRegister}
            setEmail={setEmail} // setEmail 함수 전달
            setPassword={setPassword}
            setNickname={setNickname}
          />
        </Modal>
      )}
    </div>
  );
};

export default AuthForm;
