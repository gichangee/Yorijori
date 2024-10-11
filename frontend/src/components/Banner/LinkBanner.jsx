import * as S from "./LinkBanner.styled";
import { useNavigate } from "react-router-dom";

const LinkBanner = () => {
    const navigate = useNavigate();

    return (
        // TODO: navigate 링크 추가
        <S.LinkBanner onClick={() => navigate("#")}>
            <div className="title">레시피를 고르지 못했다면?</div>
            <div className="text">전체 레시피 보러가기 {">"}</div>
        </S.LinkBanner>
    );
};

export default LinkBanner;
