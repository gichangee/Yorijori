import { Container, RecipeList } from "./RecipeList.styled"; // 스타일드 컴포넌트 가져오기
import RecipeCard from "./../Card/RecipeCard/RecipeCard";
import { PropTypes } from "prop-types";

const RecipeListComponent = ({ Recipes }) => {
    return (
        <Container>
            <RecipeList>
                {Recipes.map((recipe) => (
                    <RecipeCard
                        key={recipe.id}
                        recipeId={recipe.recipe_id}
                        imgUrl={recipe.image}
                        title={recipe.title}
                        text={recipe.intro}
                        showProfile={recipe.user_status}
                        profileImgUrl={recipe.profileImgUrl}
                        author={recipe.author}
                    />
                ))}
            </RecipeList>
        </Container>
    );
};

RecipeListComponent.propTypes = {
    Recipes: PropTypes.arrayOf(
        PropTypes.shape({
            recipe_id: PropTypes.number.isRequired,
            recipe_image: PropTypes.string.isRequired,
            recipe_title: PropTypes.string.isRequired,
            recipe_intro: PropTypes.string.isRequired,
            user_status: PropTypes.bool.isRequired,
            profileImgUrl: PropTypes.string, // optional
            author: PropTypes.string, // optional
        }),
    ).isRequired,
};

export default RecipeListComponent;
