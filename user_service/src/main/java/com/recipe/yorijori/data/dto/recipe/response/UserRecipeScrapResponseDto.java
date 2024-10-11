package com.recipe.yorijori.data.dto.recipe.response;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class UserRecipeScrapResponseDto {
    private Long id;
    private String title;
    private String name;
    private String intro;
    private String image;
    private Long viewCount;
    private Long servings;
    private Long time;
    private String level;
    private String cookingTools;
    private String type;
    private String situation;
    private String ingredients;
    private String method;
    private Long userId;
    private Long likeCount;
    private Long scrapCount;
    private Long commentCount;
    private String nickname = "";
    private String profileImage = "";

    public void setNickname(String nickname) {
        this.nickname = nickname;
    }

    public void setProfileImage(String profileImage) {
        this.profileImage = profileImage;
    }
}