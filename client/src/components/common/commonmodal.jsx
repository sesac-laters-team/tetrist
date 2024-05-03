import React from "react";
import RankingModalContent from "../waitingRoom/RankingModalContent"; // 랭킹 컴포넌트 임포트
import MyPageContent from "../waitingRoom/MyPageContent";
import ShopModalContent from "../waitingRoom/ShopModalContent";
import RegisterModalContent from "../auth/RegisterModalContent";
import axios from "axios";
import { useState, useEffect } from "react";
axios.defaults.withCredentials = true;
const Modal = ({ type, closeModal }) => {
    const [ranking, setRanking] = useState(null);
    const [myInfo, setMyInfo] = useState(null);

    // rank
    useEffect(() => {
        const fetchRanking = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:8080/api-server/rank`
                );
                setRanking(response.data);
                // console.log("랭킹 데이터 :: ", response.data); // ranking.data = [{},{},{}]
            } catch (error) {
                console.error("랭킹을 불러오는 중 오류가 발생했습니다:", error);
            }
        };

        if (type === "Rank") {
            fetchRanking();
        }
    }, [type]); // type이 변경될 때마다 랭킹을 다시 가져오도록 함

    // mypage
    useEffect(() => {
        const fetchMyPage = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:8080/api-server/auth/mypage`
                );
                setMyInfo(response.data);
                console.log("마이페이지 데이터 :: ", response.data);
            } catch (error) {
                console.error("정보를 불러오는 중 오류가 발생했습니다:", error);
            }
        };

        if (type === "MyPage") {
            fetchMyPage();
        }
    }, [type]);

    const renderModalContent = () => {
        switch (type) {
            case "Rank":
                if (ranking === null) {
                    return <div>로딩 중...</div>;
                }
                return <RankingModalContent ranking={ranking} />;
            case "MyPage":
                // 프로필 정보 컴포넌트를 렌더링
                return <MyPageContent myInfo={myInfo} />;
            case "Shop":
                // 상점 컴포넌트를 렌더링
                return <ShopModalContent />;

            case "Register":
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
