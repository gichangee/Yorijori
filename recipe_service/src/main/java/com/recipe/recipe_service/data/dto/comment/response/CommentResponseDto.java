package com.recipe.recipe_service.data.dto.comment.response;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class CommentResponseDto {
    private String profileImage;
    private String nickname;
    private String content;
    private LocalDateTime createdDate;
    private LocalDateTime modifiedDate;
}
