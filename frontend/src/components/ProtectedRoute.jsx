import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuthStore } from "../store/userStore";
import PropTypes from "prop-types";
import LoginModal from "./Modal/LoginModal";

const ProtectedRoute = ({ children }) => {
    const { isLoggedIn } = useAuthStore();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [redirectToLogin, setRedirectToLogin] = useState(false);

    useEffect(() => {
        if (!isLoggedIn) {
            setIsModalOpen(true);
        }
    }, [isLoggedIn]);

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setRedirectToLogin(true);
    };

    if (redirectToLogin) {
        return <Navigate to="/login" replace />;
    }

    if (!isLoggedIn) {
        return (
            <>
                {isModalOpen && (
                    <LoginModal
                        message="로그인이 필요한 서비스입니다"
                        onClose={handleCloseModal}
                    />
                )}
            </>
        );
    }

    return children; // 사용자가 로그인한 경우 자식 컴포넌트 렌더링
};

ProtectedRoute.propTypes = {
    children: PropTypes.node.isRequired,
};

export default ProtectedRoute;
