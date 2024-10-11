import PropTypes from "prop-types";
import * as S from "./LikeIngredient.styled";
import { useState } from "react";
const IngredientLike = ({ ingredients, onClick, onLike }) => {
    const [selectedIndex, setSelectedIndex] = useState(0);
    const placeholderImage = "/images/placeholder-img.jpg";

    const handleClick = (idx) => {
        setSelectedIndex(idx);
        onClick(idx);
    };

    const handleRemove = (event, ingredient) => {
        event.stopPropagation();
        onLike(ingredient);
        if (
            selectedIndex !== null &&
            ingredients[selectedIndex].id === ingredient.id
        ) {
            setSelectedIndex(null);
        }
    };
    return (
        <S.Wrapper>
            {ingredients &&
                ingredients.map((ingredient, idx) => {
                    return (
                        <S.Info
                            onClick={() => handleClick(idx)}
                            key={ingredient.id}
                            isSelected={selectedIndex === idx}
                        >
                            <S.Remove
                                onClick={(event) =>
                                    handleRemove(event, ingredient)
                                }
                            >
                                ✖
                            </S.Remove>
                            <S.Img
                                src={
                                    ingredient.ingredientImage ||
                                    placeholderImage
                                }
                            />
                            <S.Name>{ingredient.name}</S.Name>

                            <S.PriceWrapper>
                                {ingredient.price !== 0 && (
                                    <S.Price>{ingredient.price}원</S.Price>
                                )}
                                <S.PriceLabel>
                                    {ingredient.price ? "(100g)" : "정보 없음"}
                                </S.PriceLabel>
                            </S.PriceWrapper>
                        </S.Info>
                    );
                })}
        </S.Wrapper>
    );
};

IngredientLike.propTypes = {
    ingredients: PropTypes.array.isRequired,
    onClick: PropTypes.func.isRequired,
    onLike: PropTypes.func.isRequired,
};

export default IngredientLike;
