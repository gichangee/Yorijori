package com.recipe.recipe_service.client;

import com.recipe.recipe_service.data.dto.ingredient.response.IngredientLikeResponseDto;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

@FeignClient(name = "ingredient-service")
public interface IngredientServiceClient {

    @GetMapping("/api/v1/ingredient/get-num/{name}")
    Long getIngredientIdByName(@PathVariable("name") String name);

    @GetMapping("/api/v1/ingredient/get-id/{id}")
    String getIngredientNameById(@PathVariable("id") Long materialId);

    @GetMapping("/api/v1/ingredient/get-allergy/{id}")
    String getIngredientAllergyById(@PathVariable("id") Long materialId);

    @GetMapping("/api/v1/ingredient/like")
    ResponseEntity<List<IngredientLikeResponseDto>> findUserLikeIngredientList(
            @RequestHeader("Authorization") String authorization);

}