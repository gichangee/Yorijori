package com.recipe.yorijori.data.dto.user.request;

import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Getter
public class UserModifyRequestDto {
    private String nickname;
    private String summary;
}
