package com.recipe.yorijori.data.dto.recipe.response;

import lombok.Data;

import java.util.List;

@Data
public class UserRecipeResponseDto {

    private String email;
    private String nickname;
    private String profileImage;
    private String name;

    private List<RecipeResponseDto> recipes;
}
