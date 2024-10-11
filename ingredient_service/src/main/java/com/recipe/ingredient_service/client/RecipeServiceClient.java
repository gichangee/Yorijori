package com.recipe.ingredient_service.client;

import com.recipe.ingredient_service.data.dto.recipe.response.RecipeResponseDto;
import com.recipe.ingredient_service.data.dto.user.UserSimpleResponseDto;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@FeignClient(name = "recipe-service")
public interface RecipeServiceClient {

    @PostMapping("/api/v1/recipe/list")
    List<RecipeResponseDto> getRecipeList(@RequestBody List<Long> recipeIds);

}