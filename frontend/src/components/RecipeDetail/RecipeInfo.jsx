import PropTypes from "prop-types";
import AllergyAlert from "./AllergyAlert/AllergyAlert";
import * as S from "./RecipeInfo.styled";
import RecipeIngredient from "./RecipeIngredient/RecipeIngredient";
import RecipeOverview from "./RecipeOverview/RecipeOverview";
const RecipeInfo = ({ recipe }) => {
    return (
        <S.Wrapper>
            <S.Thumbnail src={recipe.image} />
            <S.Layout>
                <S.RecipeIngredientLabel>
                    <S.Title>재료</S.Title>
                    <AllergyAlert materials={recipe.materials} />
                </S.RecipeIngredientLabel>
                <RecipeIngredient ingredients={recipe.materials} />
                <RecipeOverview recipe={recipe} />
            </S.Layout>
        </S.Wrapper>
    );
};
RecipeInfo.propTypes = {
    recipe: PropTypes.shape({
        image: PropTypes.string.isRequired,
        materials: PropTypes.array.isRequired,
    }).isRequired,
    allergies: PropTypes.array.isRequired,
};
export default RecipeInfo;
