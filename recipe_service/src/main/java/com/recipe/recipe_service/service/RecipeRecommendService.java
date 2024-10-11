package com.recipe.recipe_service.service;

import com.recipe.recipe_service.data.domain.Recipe;
import com.recipe.recipe_service.data.dto.recommend.response.RecipeRecommendResponseDto;
import com.recipe.recipe_service.repository.RecipeRepository;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Slf4j
@AllArgsConstructor
public class RecipeRecommendService {

    private final RecipeRepository recipeRepository;

    public List<RecipeRecommendResponseDto> getRecipesByIngredients(List<Long> ingredientIds) {

        long minMatchCount = ingredientIds.size() >= 3 ? 3 : 1;

        // 조건에 맞는 레시피 조회
        List<Recipe> recipes = recipeRepository.findRecipesByIngredients(ingredientIds, minMatchCount);

        return recipes.stream()
                .map(recipe -> RecipeRecommendResponseDto.builder()
                        .recipeId(recipe.getId())
                        .title(recipe.getTitle())
                        .image(recipe.getImage())
                        .intro(recipe.getIntro())
                        .build())
                .limit(20)
                .toList();
    }

    // 좋아요를 많이 받은 레시피 순으로 조회
    public List<RecipeRecommendResponseDto> getPopularRecipes(int limit) {
        Pageable pageable = PageRequest.of(0, limit); // limit 개수만큼 상위 레시피 조회
        List<Recipe> popularRecipes = recipeRepository.findTopByOrderByLikeCountDesc(pageable);

        return popularRecipes.stream()
                .map(recipe -> RecipeRecommendResponseDto.builder()
                        .recipeId(recipe.getId())
                        .title(recipe.getTitle())
                        .image(recipe.getImage())
                        .intro(recipe.getIntro())
                        .build())
                .toList();
    }

    // 주어진 ID 몰골게 해당하는 레시피 가져오기
    public List<RecipeRecommendResponseDto> getRecipesByIds(List<Long> recipeIds) {
        List<Recipe> recipes = recipeRepository.findAllById(recipeIds);

        return recipes.stream()
                .map(recipe -> RecipeRecommendResponseDto.builder()
                        .recipeId(recipe.getId())
                        .title(recipe.getTitle())
                        .image(recipe.getImage())
                        .intro(recipe.getIntro())
                        .build())
                .toList();
    }
}
