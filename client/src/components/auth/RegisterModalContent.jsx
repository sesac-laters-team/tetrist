import React, { useState } from 'react';


const RegisterModalContent = ({ handleRegister, email, setEmail, password, setPassword, nickname, setNickname }) => {
  return (
    <div>
      <h2>회원가입</h2>
      <form onSubmit={handleRegister}>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="이메일" />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="비밀번호" />
        <input type="text" value={nickname} onChange={(e) => setNickname(e.target.value)} placeholder="닉네임" />
        <button type="submit">회원가입</button>
      </form>
    </div>
  );
};

export default RegisterModalContent;
