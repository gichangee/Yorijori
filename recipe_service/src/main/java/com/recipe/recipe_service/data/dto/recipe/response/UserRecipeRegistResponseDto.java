package com.recipe.recipe_service.data.dto.recipe.response;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class UserRecipeRegistResponseDto {
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
    private Long likeCount;
    private Long scrapCount;
    private Long commentCount;
}
