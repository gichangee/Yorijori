package com.recipe.recipe_service.data.dto.recommend.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public class RecipeRecommendResponseWrapperDto {
    private String message; // 추천 메시지
    private List<RecipeRecommendResponseDto> recipes; // 추천된 레시피 목록
}
