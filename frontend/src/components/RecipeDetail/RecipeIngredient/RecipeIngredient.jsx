import PropTypes from "prop-types";
import * as S from "./RecipeIngredient.styled";

function RecipeIngredient({ ingredients }) {
    const midIndex = Math.ceil(ingredients.length / 2);
    const leftItems = ingredients.slice(0, midIndex);
    const rightItems = ingredients.slice(midIndex);

    return (
        <S.IngredientWrapper>
            <S.IngredientColumn>
                {leftItems.map((item, index) => (
                    <S.Ingredient key={index}>
                        <S.IngredientName>{item.materialName}</S.IngredientName>
                        <S.IngredientAmount>{item.amount}</S.IngredientAmount>
                        <S.IngredientAmount>{item.unit}</S.IngredientAmount>
                    </S.Ingredient>
                ))}
            </S.IngredientColumn>
            <S.IngredientColumn>
                {rightItems.map((item, index) => (
                    <S.Ingredient key={index}>
                        <S.IngredientName>{item.materialName}</S.IngredientName>
                        <S.IngredientAmount>{item.amount}</S.IngredientAmount>
                        <S.IngredientAmount>{item.unit}</S.IngredientAmount>
                    </S.Ingredient>
                ))}
            </S.IngredientColumn>
        </S.IngredientWrapper>
    );
}

RecipeIngredient.propTypes = {
    ingredients: PropTypes.array.isRequired,
};

export default RecipeIngredient;
