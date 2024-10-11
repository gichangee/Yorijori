package com.recipe.yorijori.data.dto.user.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class UserResponseDto {
    private long id;
    private String email;
    private String nickname;
    private String profileImage;
    private String name;
    private Long score;
    private String summary;

    private List<FollowerResponseDto> followers;
    private List<FollowingResponseDto> followings;
}