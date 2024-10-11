package com.recipe.recipe_service.data.dto.recipe.response;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class RecipeOrdersResponseDto {

    private Long orderNum; // 레시피 설명 번호
    private String orderImg; // 레시피 이미지
    private String orderContent; // 레시피 설명 내용
}
