package com.recipe.recipe_service.data.dto.recipe.request;

import lombok.Data;

@Data
public class RecipeOrdersRequestDto {
    private Long orderNum; // 레시피 설명 번호
    private String orderImg; // 레시피 이미지
    private String orderContent; // 레시피 설명 내용
}
