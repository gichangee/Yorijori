import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import RecipeUser from "../../components/RecipeDetail/RecipeUser/RecipeUser";
import RecipeHeader from "../../components/RecipeDetail/RecipeHeader/RecipeHeader";
import RecipeStep from "../../components/RecipeStep/RecipeStep";
import RecipeInfo from "../../components/RecipeDetail/RecipeInfo";
import Comments from "../../components/Comment/Comments";
import Review from "../../components/Review/Review";
import * as S from "./RecipeDetail.styled";
import { getRecipe } from "../../api/recipe";

const RecipeDetail = () => {
    const [recipe, setRecipe] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        const fetchRecipe = async () => {
            const data = await getRecipe(id);
            setRecipe(data);
        };

        fetchRecipe(id);
    }, [id]);

    return (
        recipe && (
            <S.Container>
                <S.InfoSection>
                    <RecipeHeader recipe={recipe} />
                    <RecipeInfo recipe={recipe} />
                </S.InfoSection>
                <S.StepSection>
                    <RecipeStep recipe={recipe.recipeOrders} />
                </S.StepSection>
                <S.UserSection>
                    <RecipeUser
                        user={{
                            nickname: recipe.nickname,
                            profileImage: recipe.profileImage,
                            id: recipe.userId,
                            summary: recipe.summary,
                        }}
                    />
                </S.UserSection>
                <Review recipe={recipe} />
                <S.CommentSection>
                    <Comments id={id} />
                </S.CommentSection>
            </S.Container>
        )
    );
};

export default RecipeDetail;
