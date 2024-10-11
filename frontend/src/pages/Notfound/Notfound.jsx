import Button from "../../components/Button/Button";
import * as S from "./Notfound.styled";

import { useNavigate } from "react-router-dom";

const Notfound = () => {
    const navigate = useNavigate();

    return (
        <>
            <S.Notfound>
                <S.Icon />
                <S.ErrorCode>404</S.ErrorCode>
                <S.TextContainer>
                    <S.Title>
                        죄송해요.
                        <br />
                        페이지를 찾을 수 없어요.
                    </S.Title>
                    <S.Text>
                        찾으려는 페이지의 주소가 잘못 입력되었거나,
                        <br />
                        주소의 변경 혹은 삭제로 인해 사용하실 수 없어요.
                        <br /> 입력하신 페이지의 주소가 정확한지 다시 한번
                        확인해 주세요.
                    </S.Text>
                </S.TextContainer>
                <Button
                    text={"홈으로 가기"}
                    onClick={() => navigate("/")}
                    width="150px"
                    height="40px"
                />
            </S.Notfound>
        </>
    );
};

export default Notfound;
