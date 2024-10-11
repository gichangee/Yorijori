package com.recipe.ingredient_service.data.dto.ingredient.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class IngredientUserLikeDto {

    private Long id;
    private String name;
    private boolean priceStatus;
    private String ingredientImage;
    private String allergyName;
    private int price;

}
