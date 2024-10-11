package com.recipe.yorijori.data.dto.recipe.response;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class UserSimpleResponseDto {
    private Long userId;
    private String profileImage;
    private String nickname;
    private String summary;
}
