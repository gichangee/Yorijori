import PropTypes from "prop-types";
import * as S from "./RecipeOverview.styled";
import RecipeOverviewItem from "./RecipeOverviewItem";

function RecipeOverview({ recipe }) {
    const recipeDetails = [
        { icon: "⏰", label: "시간", detail: `${recipe.time}분` },
        { icon: "🔥", label: "난이도", detail: recipe.level },
        {
            icon: "🏋️‍♂️",
            label: "예상 칼로리 (100g)",
            detail: recipe.calorie ? `${recipe.calorie}Kal` : null,
        },
        {
            icon: "💸",
            label: "예상 가격",
            detail: recipe.price ? `${recipe.price}원` : null,
        },
    ].filter((item) => item.detail !== null);

    return (
        <S.Wrapper>
            {recipeDetails.map((item, index) => (
                <RecipeOverviewItem
                    key={index}
                    icon={item.icon}
                    label={item.label}
                    detail={item.detail}
                />
            ))}
        </S.Wrapper>
    );
}

RecipeOverview.propTypes = {
    recipe: PropTypes.shape({
        time: PropTypes.number,
        level: PropTypes.string,
        calorie: PropTypes.number,
        price: PropTypes.number,
    }).isRequired,
};

export default RecipeOverview;
