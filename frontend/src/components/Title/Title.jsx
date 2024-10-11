import PropTypes from "prop-types";
import { emoji } from "../../constants/emoji";
import * as S from "./Title.styled";
const Title = ({ title }) => {
    return (
        <S.Wrapper>
            <S.Emoji>{emoji[title]}</S.Emoji>
            <S.Label>{title}</S.Label>
        </S.Wrapper>
    );
};
Title.propTypes = {
    title: PropTypes.string.isRequired,
};
export default Title;
