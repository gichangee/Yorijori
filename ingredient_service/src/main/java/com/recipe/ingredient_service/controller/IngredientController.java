package com.recipe.ingredient_service.controller;

import com.recipe.ingredient_service.client.RecipeServiceClient;
import com.recipe.ingredient_service.client.UserServiceClient;
import com.recipe.ingredient_service.data.domain.Ingredient;
import com.recipe.ingredient_service.data.dto.ingredient.request.IngredientRequestDto;
import com.recipe.ingredient_service.data.dto.ingredient.response.*;
import com.recipe.ingredient_service.data.dto.recipe.response.RecipeResponseDto;
import com.recipe.ingredient_service.global.config.LevenshteinDistance;
import com.recipe.ingredient_service.repository.IngredientRepository;
import com.recipe.ingredient_service.service.IngredientService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/v1/ingredient")
@AllArgsConstructor
@Slf4j
public class IngredientController {

    private final UserServiceClient userServiceClient;
    private final IngredientService ingredientService;
    private final RecipeServiceClient recipeServiceClient;
    private final IngredientRepository ingredientRepository;


    @GetMapping("/get-num/{name}")
    public Long getIngredientsNum(@PathVariable("name") String name) {
        return ingredientService.findSimilarName(name).getId();
    }

    @GetMapping("/get-id/{id}")
    public String getIngredientNameById(@PathVariable("id") Long materialId) {
        return ingredientService.findById(materialId).getName();
    }

    @GetMapping("/get-allergy/{id}")
    public String getIngredientAllergyById(@PathVariable("id") Long materialId) {
        return ingredientService.findAllergyById(materialId).getAllergyNum();
    }

    @GetMapping("/search")
    public ResponseEntity<?> getIngredientData(
            @RequestParam("keyword") String keyword) {
        IngredientsSearchResponseDto responseDto = ingredientService.findIngredientData(keyword);

        if (responseDto.getId() == null) {
            String correctedWord = searchTypo(keyword);
            responseDto = ingredientService.findIngredientData(correctedWord);
        }

        // 검색 결과를 반환
        return ResponseEntity.status(HttpStatus.OK).body(responseDto);
    }

    @GetMapping("/change")
    public ResponseEntity<List<IngredientPriceChangeResponseDto>> getIngredientPrice() {
        return ResponseEntity.status(HttpStatus.OK).body(ingredientService.findAllIngredientPriceData());
    }

    @GetMapping("")
    public ResponseEntity<IngredientPriceDetailsResponseDto> getIngredientAllDayPrice(@RequestParam("id") Long ingredientId) {
        return ResponseEntity.status(HttpStatus.OK).body(ingredientService.findAllDayIngredientPriceData(ingredientId));
    }

    @PostMapping("/recipe")
    public ResponseEntity<List<RecipeResponseDto>> getIngredientRecipe(@RequestBody List<IngredientRequestDto> ingredients) {

        // 재료 ID 리스트를 추출
        List<Long> ingredientIds = ingredients.stream()
                .map(IngredientRequestDto::getId)
                .collect(Collectors.toList());

        List<Long> recipeIds = ingredientService.getRecipeIdByIngredients(ingredientIds);

        List<RecipeResponseDto> recipeList = recipeServiceClient.getRecipeList(recipeIds);
        return ResponseEntity.status(HttpStatus.OK).body(recipeList);
    }


    @GetMapping("/popular/week")
    public ResponseEntity<List<IngredientPopularResponseDto>> getPopularWeeklyIngredients() {
        return ResponseEntity.status(HttpStatus.OK).body(ingredientService.findPopularIngredients(7));
    }

    @GetMapping("/popular/month")
    public ResponseEntity<List<IngredientPopularResponseDto>> getPopularMonthlyIngredients() {
        return ResponseEntity.status(HttpStatus.OK).body(ingredientService.findPopularIngredients(30));
    }

    @PostMapping("/like")
    public ResponseEntity<?> addUserLikeIngredient(
            @RequestHeader("Authorization") String authorization,
            @RequestParam("id") Long ingredientId) {
        Long userId = userServiceClient.getUserId(authorization);
        ingredientService.addUserIngredientLike(userId, ingredientId);
        return ResponseEntity.status(HttpStatus.OK).build();
    }

    @DeleteMapping("/like")
    public ResponseEntity<?> deleteUserLikeIngredient(
            @RequestHeader("Authorization") String authorization,
            @RequestParam("id") Long ingredientId) {
        Long userId = userServiceClient.getUserId(authorization);
        ingredientService.removeUserIngredientLike(userId, ingredientId);
        return ResponseEntity.status(HttpStatus.OK).build();
    }

    @GetMapping("/like")
    public ResponseEntity<List<IngredientUserLikeDto>> findUserLikeIngredientList(@RequestHeader("Authorization") String authorization) {
        Long userId = userServiceClient.getUserId(authorization);
        return ResponseEntity.status(HttpStatus.OK).body(ingredientService.findUserLikeIngredients(userId));
    }

    @PostMapping("/test/add")
    public ResponseEntity<Ingredient> addTestIngredient(@RequestParam String name) {
        return ResponseEntity.status(HttpStatus.OK).body(ingredientService.addIngredient(name));
    }

    @GetMapping("/low")
    public ResponseEntity<List<LowestPriceDto>> getLowestPriceResult(@RequestParam String query, @RequestParam String display, @RequestParam String start, @RequestParam String sort) throws Exception {
        return new ResponseEntity<>(ingredientService.getLowestPriceResult(query, display, start, sort), HttpStatus.OK);
    }

    private String searchTypo(String query) {
        List<String> recipeNames = ingredientRepository.findAllIngredientNames(); // DB에서 모든 레시피 이름 가져오기
        return getMostSimilarWord(query, recipeNames);
    }

    private String getMostSimilarWord(String query, List<String> wordDictionary) {
        String closestWord = query;
        int minDistance = Integer.MAX_VALUE;

        for (String word : wordDictionary) {
            int distance = LevenshteinDistance.computeLevenshteinDistance(query, word);
            if (distance < minDistance) {
                minDistance = distance;
                closestWord = word;
            }
        }
        return closestWord;
    }


    @GetMapping("/autocomplete")
    public ResponseEntity<List<String>> autocompleteRecipe(
            @RequestParam("keyword") String keyword) {

        Pageable pageable = PageRequest.of(0, 5);  // 첫 페이지에서 최대 5개의 결과를 가져오도록 설정
        List<String> recipeSuggestions = ingredientRepository.findIngredientNamesByKeyword(keyword, pageable);

        return ResponseEntity.status(HttpStatus.OK).body(recipeSuggestions);
    }

}
