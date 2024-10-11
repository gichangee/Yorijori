package com.recipe.recipe_service.data.dto.recommend.response;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class RecipeRecommendResponseDto {
    private Long recipeId;
    private String title;
    private String image;
    private String intro;
}
