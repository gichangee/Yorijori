import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { getRelatedRecipe } from "../../../api/ingredientApi";
import IntroCard from "../../Card/IntroCard/IntroCard";
import styled from "styled-components";
import { flexStartStyle } from "../../../styles/common";
import Title from "../../Title/Title";

export const RelatedRecipe = ({ like }) => {
    const [recipes, setRecipes] = useState([]);
    useEffect(() => {
        const fetchRecipes = async () => {
            const result = like.map(({ id, name }) => ({ id, name }));
            const data = await getRelatedRecipe(result);
            setRecipes(data);
        };
        fetchRecipes();
    }, [like]);
    return (
        <Wrapper>
            <TitleWrapper>
                <TitleLayout>
                    <Title title={"관련 레시피"} />
                </TitleLayout>
                <IngredientWrapper>
                    <Ingredient>
                        {like.length > 0 ? (
                            like.map((item) => (
                                <IngredientLabel key={item.id}>
                                    {item.name}
                                </IngredientLabel>
                            ))
                        ) : (
                            <p>좋아요한 재료가 없습니다.</p>
                        )}
                    </Ingredient>
                    <div> 포함</div>
                </IngredientWrapper>
            </TitleWrapper>
            <RecipeWrapper>
                {recipes.length > 0 &&
                    recipes.map((recipe, index) => (
                        <IntroCard
                            key={`${recipe.id}-${index}`}
                            recipe={{ ...recipe, recipeId: recipe.id }}
                        />
                    ))}
            </RecipeWrapper>
            {recipes.length === 0 && <p>관련된 레시피가 존재하지 않습니다. </p>}
        </Wrapper>
    );
};

const TitleLayout = styled.div``;
const TitleWrapper = styled.div`
    ${flexStartStyle}
    width: 100%;
`;
const IngredientLabel = styled.div`
    font-family: ${({ theme }) => theme.fontWeight.bold};
    font-size: ${({ theme }) => theme.fontSize.text};
    border-bottom: 1px solid ${({ theme }) => theme.color.green};
    margin-right: 0.3rem;
`;
const IngredientWrapper = styled.div`
    text-align: center;
    ${flexStartStyle}
`;
const Ingredient = styled.div`
    display: flex;
`;
const RecipeWrapper = styled.div`
    width: 100%;
    ${flexStartStyle}
`;
const Wrapper = styled.div`
    width: 100%;
    ${flexStartStyle}
    flex-direction: column;
`;
RelatedRecipe.propTypes = {
    like: PropTypes.array.isRequired,
};
export default RelatedRecipe;
