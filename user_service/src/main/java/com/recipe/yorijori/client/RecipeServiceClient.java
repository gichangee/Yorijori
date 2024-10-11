package com.recipe.yorijori.client;

import com.recipe.yorijori.data.dto.recipe.response.RecipeResponseDto;
import com.recipe.yorijori.data.dto.recipe.response.UserRecipeLikeResponseDto;
import com.recipe.yorijori.data.dto.recipe.response.UserRecipeRegistResponseDto;
import com.recipe.yorijori.data.dto.recipe.response.UserRecipeScrapResponseDto;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;

@FeignClient(name = "recipe-service")
public interface RecipeServiceClient {

    @GetMapping("/api/v1/recipe/{userId}/recipes")
    List<RecipeResponseDto> getRecipes(@PathVariable("userId") Long userId);

    @GetMapping("/api/v1/recipe/user/{userId}")
    List<UserRecipeRegistResponseDto> getUserRecipes(@PathVariable("userId") Long userId);

    @GetMapping("/api/v1/recipe/user/like/{userId}")
    List<UserRecipeLikeResponseDto> getUserLikeRecipes(@PathVariable("userId") Long userId);

    @GetMapping("/api/v1/recipe/user/scrap/{userId}")
    List<UserRecipeScrapResponseDto> getUserScrapRecipes(@PathVariable("userId") Long userId);

}
