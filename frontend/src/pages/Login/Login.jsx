import * as S from "./Login.styled";
import NaverLoginBtn from "../../assets/naver_login.png";

const Login = () => {
    const naverLoginLink =
        "http://j11c206.p.ssafy.io:8081/oauth2/authorization/naver";

    return (
        <S.Login>
            <S.Icon />
            <S.TextContainer>
                <S.Title>로그인</S.Title>
                <S.Text>소셜 로그인으로 간편하게 사용해보세요.</S.Text>
            </S.TextContainer>
            <S.LoginButton>
                <S.LoginButtonImage
                    src={NaverLoginBtn}
                    onClick={() => (window.location.href = naverLoginLink)}
                />
            </S.LoginButton>
        </S.Login>
    );
};

export default Login;
