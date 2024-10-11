package com.recipe.yorijori.data.dto.user.response;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class FollowerResponseDto {
    private Long id;
    private String nickname;
    private String profileImage;
}
