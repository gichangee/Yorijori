package com.recipe.recipe_service.data.dto.user.response;

import lombok.Data;

@Data
public class UserAllergyResponseDto {
    private Long allergyId;
    private boolean status;
    private String commonCodeNum;
    private Long userId;
}
