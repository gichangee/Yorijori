package com.recipe.recipe_service.data.dto.recipe.request;

import lombok.Data;

@Data
public class RecipeMaterialsRequestDto {
    private String materialName;
    private String materialAmount;
    private String materialUnit;
    private String materialSubtitle;
    private Long materialId; // 재료 ID 추가
}
