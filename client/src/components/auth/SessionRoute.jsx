import { Navigate } from "react-router-dom";

const SessionRoute = ({ childComponent }) => {
    const isLoggedIn = () => {
        if (localStorage.getItem("user")) {
            return true;
        } else {
            alert("잘못된 접근입니다. 로그인 화면으로 이동합니다.");
            return false;
        }
    };
    return isLoggedIn() ? childComponent : <Navigate to="/login" replace />;
};

export default SessionRoute;
