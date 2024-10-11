package com.recipe.ingredient_service.data.dto.ingredient.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class IngredientPopularResponseDto {
    private Long id;
    private String name;
    private String ingredientImage;
    private int price;
    private Long likeCount;
}
