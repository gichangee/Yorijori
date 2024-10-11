package com.recipe.recipe_service.data.dto.recipe.request;

import lombok.Data;

import java.util.List;

@Data
public class RecipeRegisterRequestDto {
    private String title;
    private String name;
    private String intro;
    private String image;
    private Long servings; // 레시피 용량
    private Long time; // 레시피 소요 시간(분단위)
    private String level; // 레시피 난이도(아무나, 초급, 중급, 상급)
    private String cookingTools; // 버너,국자 (콤마로 구분하는 형식)
    private String type;
    private String situation;
    private String ingredients;
    private String method;


    // 재료 정보
    private List<RecipeMaterialsRequestDto> recipeMaterials;

    // 요리 순서
    private List<RecipeOrdersRequestDto> recipeOrders;

}
