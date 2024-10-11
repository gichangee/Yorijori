package com.recipe.recipe_service.controller;

import com.recipe.recipe_service.client.UserServiceClient;
import com.recipe.recipe_service.service.RecipeLikeService;
import com.recipe.recipe_service.service.RecipeService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/recipe")
@AllArgsConstructor
@Slf4j
public class RecipeLikesController {

    private final UserServiceClient userServiceClient;
    private final RecipeLikeService recipeLikeService;

    // 레시피 좋아요 등록
    @PostMapping("/like")
    public ResponseEntity<?> likeRecipe(
            @RequestHeader("Authorization") String authorization,
            @RequestParam("id") Long recipeId) {

        Long userId = userServiceClient.getUserId(authorization);

        recipeLikeService.likeRecipe(recipeId, userId);

        return ResponseEntity.status(HttpStatus.OK).build();
    }

    // 레시피 좋아요 취소
    @PatchMapping("/unlike")
    public ResponseEntity<?> unlikeRecipe(
            @RequestHeader("Authorization") String authorization,
            @RequestParam("id") Long recipeId) {

        Long userId = userServiceClient.getUserId(authorization);

        recipeLikeService.unlikeRecipe(recipeId, userId);

        return ResponseEntity.status(HttpStatus.OK).build();
    }
}
