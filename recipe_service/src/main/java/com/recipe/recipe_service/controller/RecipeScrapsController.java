package com.recipe.recipe_service.controller;

import com.recipe.recipe_service.client.IngredientServiceClient;
import com.recipe.recipe_service.client.UserServiceClient;
import com.recipe.recipe_service.service.RecipeScrapService;
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
public class RecipeScrapsController {

    private final RecipeScrapService recipeScrapService;
    private final UserServiceClient userServiceClient;

    // 레시피 스크랩 등록
    @PostMapping("/scrap")
    public ResponseEntity<?> scrapRecipe(
            @RequestHeader("Authorization") String authorization,
            @RequestParam("id") Long recipeId) {

        Long userId = userServiceClient.getUserId(authorization);

        recipeScrapService.scrapRecipe(recipeId, userId);

        return ResponseEntity.status(HttpStatus.OK).build();
    }

    // 레시피 스크랩 취소
    @PatchMapping("/unscrap")
    public ResponseEntity<?> unscrapRecipe(
            @RequestHeader("Authorization") String authorization,
            @RequestParam("id") Long recipeId) {

        Long userId = userServiceClient.getUserId(authorization);

        recipeScrapService.unscrapRecipe(recipeId, userId);

        return ResponseEntity.status(HttpStatus.OK).build();
    }
}
