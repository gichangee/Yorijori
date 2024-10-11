import PropTypes from "prop-types";
import InteractionToggle from "../../Toggle/InteractionToggle/InteractionToggle";
import * as S from "./HotIngredient.styled";
const HotIngredient = ({ ingredient, onLike, like, idx }) => {
    const placeholderImage = "/images/placeholder-img.jpg";
    return (
        <S.Wrapper>
            <S.Img src={ingredient.ingredientImage || placeholderImage} />
            <S.Info>
                <S.InfoTop>
                    <S.InfoLeft>
                        <S.Rank>{idx}위</S.Rank>
                        <S.Name>{ingredient.name}</S.Name>
                    </S.InfoLeft>
                    <InteractionToggle
                        onClick={() => onLike(ingredient)}
                        type="heart"
                        size="1rem"
                        isActive={like}
                    />
                </S.InfoTop>
                <S.Price>{ingredient.price}원</S.Price>
                <S.Like>{ingredient.likeCount}명이 좋아요를 눌렀어요!</S.Like>
            </S.Info>
        </S.Wrapper>
    );
};

HotIngredient.propTypes = {
    ingredient: PropTypes.object.isRequired,
    onLike: PropTypes.func,
    like: PropTypes.bool,
    idx: PropTypes.number,
};
export default HotIngredient;
