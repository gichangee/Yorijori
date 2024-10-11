import PropTypes from "prop-types";
import Tag from "../../Tag/Tag";
import * as S from "./RecipeHeader.styled";
import ActionToggleGroup from "../../Toggle/ActionToggleGroup/ActionToggleGroup";
import { useTagStore } from "../../../store/tagStore";
import { useEffect } from "react";
import { getCommonCode } from "../../../api/userApi";

function RecipeHeader({ recipe }) {
    const tags = useTagStore((state) => state.tags);
    const setTags = useTagStore((state) => state.setTags);

    useEffect(() => {
        const fetchCommonCode = async () => {
            const data = await getCommonCode();
            setTags(data);
        };
        if (!tags) fetchCommonCode();
    }, [setTags, tags]);

    return (
        <S.RecipeHeaderContainer>
            <S.TagWrapper>
                {tags && (
                    <>
                        <Tag tag={tags[recipe.type]} />
                        <Tag tag={tags[recipe.situation]} />
                        <Tag tag={tags[recipe.ingredients]} />
                        <Tag tag={tags[recipe.method]} />
                    </>
                )}
            </S.TagWrapper>
            <S.TopSection>
                <S.Title>{recipe.title}</S.Title>

                <S.RecipeStats>
                    <ActionToggleGroup recipe={recipe} />
                </S.RecipeStats>
            </S.TopSection>

            <S.RecipeDescription>{recipe.intro}</S.RecipeDescription>
        </S.RecipeHeaderContainer>
    );
}

RecipeHeader.propTypes = {
    recipe: PropTypes.shape({
        title: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired,
        situation: PropTypes.string.isRequired,
        ingredients: PropTypes.array.isRequired,
        method: PropTypes.string.isRequired,
        intro: PropTypes.string.isRequired,
    }).isRequired,
};

export default RecipeHeader;
