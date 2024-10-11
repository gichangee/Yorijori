package com.recipe.recipe_service.data.dto.recipe.response;

import com.recipe.recipe_service.data.dto.ingredient.response.RecipeMaterialsAllergyResponseDto;
import com.recipe.recipe_service.data.dto.ingredient.response.RecipeMaterialsResponseDto;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class RecipeDetailsAllergyResponseDto {
    private Long id; // 레시피 ID
    private String title;
    private String name;
    private String intro;
    private String image;
    private Long viewCount;
    private Long servings; // 레시피 용량
    private Long time; // 레시피 소요 시간(분단위)
    private String level; // 레시피 난이도(아무나, 초급, 중급, 상급)
    private String cookingTools; // 버너,국자 (콤마로 구분하는 형식)
    private String type;
    private String situation;
    private String ingredients;
    private String method;

    private Long userId; // 레시피 등록한 회원 ID
    private String nickname;
    private String profileImage;
    private String summary;

    private Long likeCount;
    private Long scrapCount;
    private Long commentCount;

    private Long calorie; // 예상 칼로리
    private Long price; // 에상 가격

    // 재료 목록
    private List<RecipeMaterialsAllergyResponseDto> materials;

    // 요리 순서
    private List<RecipeOrdersResponseDto> recipeOrders;
}
