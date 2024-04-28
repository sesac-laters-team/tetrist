import React, { useEffect, useRef, useState } from "react";
import SideBarList from "./SideBarList";

// props 변수 width 기본값을 줘서 오류 방지
const Sidebar = ({ width = 280, children, socket }) => {
    const [isOpen, setOpen] = useState(false);
    const [xPosition, setX] = useState(-width);
    const side = useRef();

    // button 클릭 시 토글
    const toggleMenu = () => {
        if (xPosition < 0) {
            setX(0);
            setOpen(true);
        } else {
            setX(-width);
            setOpen(false);
        }
    };

    // 사이드바 외부 클릭시 닫히는 함수
    const handleClose = async (e) => {
        let sideArea = side.current;
        let sideCildren = side.current.contains(e.target);
        if (isOpen && (!sideArea || !sideCildren)) {
            await setX(-width);
            await setOpen(false);
        }
    };

    useEffect(() => {
        window.addEventListener("click", handleClose);
        return () => {
            window.removeEventListener("click", handleClose);
        };
    });

    return (
        <div className="container">
            <div
                ref={side}
                className="sidebar"
                style={{
                    width: `${width}px`,
                    height: "100%",
                    transform: `translatex(${-xPosition}px)`,
                }}
            >
                <button onClick={() => toggleMenu()} className="toggleBtn">
                    {isOpen ? (
                        <span>X</span>
                    ) : (
                        <img
                            src="images/logo_ssac.png"
                            alt="contact open button"
                            className="openBtn"
                        />
                    )}
                </button>
                {/* 사이드 바 컴포넌트 내부 값이 구현되는 위치 */}
                <SideBarList socket={socket}>{children}</SideBarList>
            </div>
        </div>
    );
};

export default Sidebar;
