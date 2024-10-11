package com.recipe.recipe_service.data.dto.ingredient.response;

import lombok.Data;

@Data
public class IngredientLikeResponseDto {

    private Long id;
    private String name;
    private String img;
    private String allergyNum;
}
