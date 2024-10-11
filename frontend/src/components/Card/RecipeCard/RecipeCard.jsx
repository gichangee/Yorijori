import ActionToggleGroup from "../../Toggle/ActionToggleGroup/ActionToggleGroup";
import UserProfileImage from "../../UserProfile/UserProfileImage/UserProfileImage";
import * as S from "./RecipeCard.styled";
import PropTypes from "prop-types";

const RecipeCard = ({ recipe, showProfile, onClick }) => {
    const placeholderImage = "/images/placeholder-img.jpg";

    return (
        <S.RecipeCard onClick={() => onClick(recipe.id)}>
            <S.Thumnail
                src={recipe.image || placeholderImage}
                onError={(e) =>
                    (e.target.src = e.target.src = placeholderImage)
                }
            />
            <S.TextArea>
                <ActionToggleGroup recipe={recipe} />
                <S.Title>{recipe.title}</S.Title>
                <S.Text>{recipe.intro}</S.Text>
            </S.TextArea>
            {showProfile ? (
                <S.Profile>
                    <UserProfileImage
                        imageUrl={recipe.profileImage}
                        size="1.838rem"
                    />
                    {recipe.nickname}
                </S.Profile>
            ) : null}
        </S.RecipeCard>
    );
};

RecipeCard.propTypes = {
    recipe: PropTypes.shape({
        image: PropTypes.string,
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        intro: PropTypes.string,
        profileImage: PropTypes.string,
        nickname: PropTypes.string,
    }).isRequired,
    showProfile: PropTypes.bool.isRequired,
    onClick: PropTypes.func.isRequired,
};

export default RecipeCard;
