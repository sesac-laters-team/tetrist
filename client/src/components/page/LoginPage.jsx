import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { registerUser, loginUser, logoutUser } from '../../redux/store/module/authModule';
import { useNavigate } from 'react-router-dom'; 

const AuthForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nickname, setNickname] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate(); // useNavigate 훅 추가

  const handleRegister = (e) => {
    e.preventDefault();
    dispatch(registerUser(email, password, nickname));
    console.log("회원가입 성공");
    // 회원가입 시 이메일, 비밀번호, 닉네임을 로컬 스토리지에 저장
    localStorage.setItem('user', JSON.stringify({ email, nickname, password }));
  };

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(loginUser(email, password));
    console.log("로그인 성공");

    // 로그인 시 이메일과 비밀번호를 로컬 스토리지에 저장
    localStorage.setItem('user', JSON.stringify({ email, password }));
    navigate('/waiting'); 
  };

  return (
    <div>
      <form onSubmit={handleRegister}>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="이메일" />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="비밀번호" />
        <input type="text" value={nickname} onChange={(e) => setNickname(e.target.value)} placeholder="닉네임" />
        <button type="submit">회원가입</button>
      </form>
      <button onClick={handleLogin}>로그인</button>
    </div>
  );
};

export default AuthForm;
