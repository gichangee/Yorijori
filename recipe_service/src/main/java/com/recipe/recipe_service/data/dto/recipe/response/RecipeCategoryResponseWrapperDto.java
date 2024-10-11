package com.recipe.recipe_service.data.dto.recipe.response;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class RecipeCategoryResponseWrapperDto {
    private List<RecipeCategoryResponseDto> recipes; // 레시피 목록
    private long totalCount; // 전체 레시피 개수
}
