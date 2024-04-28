import React, { useState, useEffect } from 'react';

function Timer({ turn, onTimeOut }) {
  const [seconds, setSeconds] = useState(30); // 예를 들어 각 턴에 30초를 부여합니다.

  useEffect(() => {
    let timer;
    if (seconds > 0) {
      timer = setTimeout(() => {
        setSeconds(prevSeconds => prevSeconds - 1);
      }, 1000);
    } else {
      // 타임아웃 발생 시 onTimeOut 함수 호출
      onTimeOut();
    }
    
    return () => clearTimeout(timer);
  }, [seconds, onTimeOut]); // seconds와 onTimeOut 함수가 변경될 때마다 useEffect가 실행되도록 설정

  useEffect(() => {
    // 턴이 변경될 때마다 타이머를 초기화
    setSeconds(30);
  }, [turn]); // turn 상태가 변경될 때마다 useEffect가 실행되도록 설정

  return (
    <div>
      <h3>Time Left: {seconds} Seconds</h3>
    </div>
  );
}

export default Timer;
