package com.recipe.yorijori.data.dto.common.response;


import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class CommonResponseDto {
    private Long commonCodeId;
    private String commonCodeType;
    private String commonCodeNum;
    private String commonCodeName;
}
