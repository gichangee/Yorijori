import * as S from "./Login.styled";
import { useAuthStore } from "../../store/userStore";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

const LoginLoading = () => {
    const navigate = useNavigate();

    const location = useLocation();

    const queryParams = new URLSearchParams(location.search);

    const accessToken = queryParams.get("accessToken");
    const refreshToken = queryParams.get("refreshToken");

    const setTokens = useAuthStore((state) => state.setTokens);

    useEffect(() => {
        if (accessToken && refreshToken) {
            setTokens(accessToken, refreshToken);
            navigate("/");
        }
    }, [accessToken, refreshToken, setTokens, navigate]);

    return (
        <S.Loading>
            <S.LoadingIcon />
            <S.LoadingText>로그인 중...</S.LoadingText>
        </S.Loading>
    );
};

export default LoginLoading;
