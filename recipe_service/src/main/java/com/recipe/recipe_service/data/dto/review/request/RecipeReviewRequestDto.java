package com.recipe.recipe_service.data.dto.review.request;

import lombok.Data;

@Data
public class RecipeReviewRequestDto {
    private Long rating;
    private String title;
    private String content;
}
