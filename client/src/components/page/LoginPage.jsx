import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
// import { registerUser, loginUser, logoutUser } from '../../redux/store/module/authModule';
import { registerUser, loginUser } from '../../redux/store/module/authModule';
import { useNavigate } from 'react-router-dom'; 

const AuthForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nickname, setNickname] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    dispatch(registerUser(email, password, nickname))
      .then(() => {
        console.log("회원가입 성공");
        localStorage.setItem('user', JSON.stringify({ email, nickname, password }));
      })
      .catch(error => {
        console.error("회원가입 실패", error);
      });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(loginUser(email, password))
      .then(() => {
        console.log("로그인 성공");
        localStorage.setItem('user', JSON.stringify({ email, password }));
        navigate('/waiting'); // 로그인 성공 후 대기실 페이지로 이동
      })
      .catch(error => {
        console.error("로그인 실패", error);
      });
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
