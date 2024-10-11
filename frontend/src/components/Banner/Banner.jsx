import * as S from "./Banner.styled";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

const Banner = ({
    subTitle,
    title,
    navLink,
    imgUrl,
    backgroundColor = "#fef7e7",
    pointColor = "#f7da76",
    fontColor = "#000000",
}) => {
    const navigate = useNavigate();

    return (
        <S.Banner
            backgroundColor={backgroundColor}
            pointColor={pointColor}
            fontColor={fontColor}
        >
            <S.ContentContainer>
                <S.ContentWrapper>
                    <S.TextSection>
                        <S.SubTitle>{subTitle}</S.SubTitle>
                        <S.Title>{title}</S.Title>
                    </S.TextSection>
                    <S.Link onClick={() => navigate(navLink)}>
                        <S.LinkText>레시피 보러가기</S.LinkText>
                        {">"}
                    </S.Link>
                </S.ContentWrapper>
                <S.Image src={imgUrl} />
            </S.ContentContainer>
        </S.Banner>
    );
};

Banner.propTypes = {
    subTitle: PropTypes.string,
    title: PropTypes.string,
    navLink: PropTypes.string,
    imgUrl: PropTypes.string,
    backgroundColor: PropTypes.string,
    pointColor: PropTypes.string,
    fontColor: PropTypes.string,
};

export default Banner;
