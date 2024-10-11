package com.recipe.recipe_service.data.dto.ingredient.response;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class RecipeMaterialsResponseDto {
    private Long materialId;
    private String materialName; // 재료 이름
    private String amount; // 양
    private String unit; // 단위
    private String subtitle; // 서브 타이틀
}
