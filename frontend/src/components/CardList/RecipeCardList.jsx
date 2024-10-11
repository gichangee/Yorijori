import * as S from "./CardList.styled";
import RecipeCard from "../Card/RecipeCard/RecipeCard";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

const RecipeCardList = ({ recipes, showProfile }) => {
    const navigate = useNavigate();
    const handleCardClick = (id) => {
        navigate(`/recipe/${id}`);
    };
    return (
        <S.CardList>
            {recipes.map((recipe) => {
                return (
                    <RecipeCard
                        key={recipe.id}
                        showProfile={showProfile}
                        recipe={recipe}
                        onClick={handleCardClick}
                    />
                );
            })}
        </S.CardList>
    );
};

RecipeCardList.propTypes = {
    recipes: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
                .isRequired,
            image: PropTypes.string.isRequired,
            title: PropTypes.string.isRequired,
            intro: PropTypes.string.isRequired,
            showProfile: PropTypes.bool.isRequired,
            profileImage: PropTypes.string,
            nickname: PropTypes.string.isRequired,
        }).isRequired,
    ).isRequired,
    showProfile: PropTypes.bool.isRequired,
};

export default RecipeCardList;
