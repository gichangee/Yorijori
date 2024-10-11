package com.recipe.recipe_service.controller;

import com.recipe.recipe_service.client.UserServiceClient;
import com.recipe.recipe_service.data.domain.RecipeComments;
import com.recipe.recipe_service.data.dto.comment.request.CommentRegisterRequestDto;
import com.recipe.recipe_service.data.dto.comment.response.CommentResponseDto;
import com.recipe.recipe_service.data.dto.user.response.UserSimpleResponseDto;
import com.recipe.recipe_service.repository.RecipeCommentsRepository;
import com.recipe.recipe_service.service.RecipeService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/v1/recipe")
@AllArgsConstructor
public class RecipeCommentsController {

    private final RecipeCommentsRepository recipeCommentsRepository;
    private final RecipeService recipeService;
    private final UserServiceClient userServiceClient;

    // 레시피 댓글 등록
    @PostMapping("/comment")
    public ResponseEntity<?> commentRecipe(
            @RequestHeader("Authorization") String authorization,
            @RequestParam("id") Long recipeId,
            @RequestBody CommentRegisterRequestDto content) {

        Long userId = userServiceClient.getUserId(authorization);

        recipeService.addComment(recipeId, userId, content.getContent());

        return ResponseEntity.status(HttpStatus.OK).build();
    }

    // 레시피 댓글 삭제
    @DeleteMapping("/comment")
    public ResponseEntity<?> deleteComment(
            @RequestHeader("Authorization") String authorization,
            @RequestParam("id") Long commentId) {

        Long userId = userServiceClient.getUserId(authorization);

        recipeService.deleteComment(commentId, userId);

        return ResponseEntity.status(HttpStatus.OK).build();
    }

    // 레시피 댓글 조회
    @GetMapping("/comment")
    public ResponseEntity<?> getComment(@RequestParam("id") Long recipeId) {

        List<RecipeComments> comments = recipeService.getCommentsByRecipeId(recipeId);

        List<CommentResponseDto> responseComments = comments.stream()
                .map(comment -> {
                    // 사용자 정보 조회 후 닉네임과 프로필 이미지 가져오기
                    UserSimpleResponseDto userInfo = userServiceClient.getUserInfo(comment.getUserId());

                    // 댓글 정보를 CommentResponseDto로 변환
                    return CommentResponseDto.builder()
                            .profileImage(userInfo.getProfileImage())
                            .nickname(userInfo.getNickname())
                            .content(comment.getCommentContent())
                            .createdDate(comment.getCreatedDate())
                            .modifiedDate(comment.getModifiedDate())
                            .build();
                })
                .collect(Collectors.toList());

        return ResponseEntity.status(HttpStatus.OK).body(responseComments);
    }
}
