package com.recipe.yorijori.data.dto.recipe.response;

import lombok.Data;

@Data
public class RecipeResponseDto {
    private String title;
    private String name;
    private String intro;
    private Long userId;
}
