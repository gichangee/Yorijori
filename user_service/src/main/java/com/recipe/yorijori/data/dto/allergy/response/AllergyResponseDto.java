package com.recipe.yorijori.data.dto.allergy.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class AllergyResponseDto {
    private Long allergyId;
    private boolean status;
    private String commonCodeNum;
    private Long userId;

}
