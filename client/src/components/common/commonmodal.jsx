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
    const [shopList, setShopList] = useState(null);

    const closeModalOnRegister = () => {
        if (
            window.confirm(
                "화면을 전환하시겠습니까? 작성하신 항목은 저장되지 않습니다."
            )
        ) {
            closeModal();
        }
    };
    // rank
    useEffect(() => {
        const fetchRanking = async () => {
            try {
                const response = await axios.get(
                    `${process.env.REACT_APP_API_SERVER}/rank`
                );
                setRanking(response.data);
            } catch (error) {
                console.error("랭킹을 불러오는 중 오류가 발생했습니다:", error);
            }
        };

        if (type === "Rank") {
            fetchRanking();
        }
    }, [type]);

    // mypage
    useEffect(() => {
        const fetchMyPage = async () => {
            try {
                const response = await axios.get(
                    `${process.env.REACT_APP_API_SERVER}/auth/mypage`
                );
                setMyInfo(response.data);
                console.log("서버에서 받은 유저 :: ", response.data);
            } catch (error) {
                console.error("정보를 불러오는 중 오류가 발생했습니다:", error);
            }
        };

        if (type === "MyPage") {
            fetchMyPage();
        }
    }, [type]);

    // shop
    useEffect(() => {
        const fetchShop = async () => {
            try {
                const response = await axios.get(
                    `${process.env.REACT_APP_API_SERVER}/shop`
                );
                setShopList(response.data);
                // console.log("서버에서 받은 shop :: ", response.data);
            } catch (error) {
                console.error("정보를 불러오는 중 오류가 발생했습니다:", error);
            }
        };

        if (type === "Shop") {
            fetchShop();
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
                return <ShopModalContent shopList={shopList} />;

            case "Register":
                return <RegisterModalContent closeModal={closeModal} />;

            default:
                return <div>내용이 없습니다.</div>;
        }
    };

    return (
        <div
            className="modal-backdrop"
            onClick={type === "Register" ? closeModalOnRegister : closeModal}
        >
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                {renderModalContent()}
            </div>
        </div>
    );
};

export default Modal;
