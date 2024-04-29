import { useRef, useState } from "react";
import SignIn from "../auth/SignIn";
import "../../styles/MainPage.scss";
import Logo from "../common/Logo";
import SignUp from "../auth/SignUp";

const MainPage = () => {
    const [openModal, setOpenModal] = useState(false); // modal 상태 관리 state
    const modalOut = useRef(); // modal 바깥을 클릭했을 때 modal이 닫히도록 DOM을 조작할 ref
    return (
        <div className="main">
            <Logo />
            <button onClick={() => setOpenModal("signIn")} className="btn">
                접속
            </button>
            {openModal && (
                <div
                    className="modalOut"
                    ref={modalOut}
                    onClick={(e) => {
                        if (e.target === modalOut.current) setOpenModal(false); // 클릭한 곳이 modalOut 부분일 때 modal이 닫히도록 설정
                    }}
                >
                    {openModal === "signIn" && ( // setOpenModal 값을 통해 modal로 띄울 컴포넌트 연결 및 modal 화면 전환을 위해 props로 함수 전달
                        <SignIn setOpenModal={setOpenModal} />
                    )}
                    {openModal === "signUp" && (
                        <SignUp setOpenModal={setOpenModal} />
                    )}
                </div>
            )}
        </div>
    );
};

export default MainPage;
