import PropTypes from "prop-types";
import * as S from "./LivePriceTracker.styled";
import { useEffect, useState } from "react";

const LivePriceTracker = ({ ingredient, handleClick }) => {
    const [isExpensive, setIsExpensive] = useState(false);

    useEffect(() => {
        if (ingredient.priceGap < 0) {
            setIsExpensive(false);
        } else setIsExpensive(true);
    }, [ingredient]);

    return (
        <S.Wrapper onClick={() => handleClick(ingredient.name)}>
            <S.IngredientInfo>
                <S.IngredientInfoLayout>
                    <S.IngredientName>{ingredient.name}</S.IngredientName>
                </S.IngredientInfoLayout>

                <S.ingredientNowPrice>
                    현재 가격 :<span> {ingredient.currentPrice}원</span>
                </S.ingredientNowPrice>

                <S.IngredientLabel>
                    어제보다
                    <S.IngredientPrice isExpensive={isExpensive}>
                        {isExpensive
                            ? ingredient.priceGap
                            : -ingredient.priceGap}
                        원
                    </S.IngredientPrice>
                    더
                    <S.IngredientPrice isExpensive={isExpensive}>
                        {isExpensive ? "상승" : "인하"}
                    </S.IngredientPrice>
                    했습니다.
                </S.IngredientLabel>
            </S.IngredientInfo>
        </S.Wrapper>
    );
};

LivePriceTracker.propTypes = {
    ingredient: PropTypes.object.isRequired,
    handleClick: PropTypes.func.isRequired,
};
export default LivePriceTracker;
