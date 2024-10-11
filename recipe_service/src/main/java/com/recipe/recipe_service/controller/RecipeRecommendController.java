package com.recipe.recipe_service.controller;

import com.recipe.recipe_service.client.IngredientServiceClient;
import com.recipe.recipe_service.client.UserServiceClient;
import com.recipe.recipe_service.data.dto.ingredient.response.IngredientLikeResponseDto;
import com.recipe.recipe_service.data.dto.recommend.response.RecipeRecommendResponseDto;
import com.recipe.recipe_service.data.dto.recommend.response.RecipeRecommendResponseWrapperDto;
import com.recipe.recipe_service.data.dto.user.response.UserAllergyResponseDto;
import com.recipe.recipe_service.service.RecipeRecommendService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/v1/recipe")
@AllArgsConstructor
@Slf4j
public class RecipeRecommendController {

    private final RecipeRecommendService recipeRecommendService;
    private final UserServiceClient userServiceClient;
    private final IngredientServiceClient ingredientServiceClient;

    // 레시피 추천(모든 유저)
    @GetMapping("/recommend/common")
    public ResponseEntity<?> getRecommendations() {
        // 조회수 기준으로 레시피 20개 추천
        List<RecipeRecommendResponseDto> recommendedRecipes = recipeRecommendService.getPopularRecipes(20);

        // 결과를 RecipeRecommendResponseWrapperDto로 감싸서 반환
        String message = "오늘은 이러한 요리 만들어 보는건 어떠신가요?";
        RecipeRecommendResponseWrapperDto responseWrapper = new RecipeRecommendResponseWrapperDto(message, recommendedRecipes);
        return ResponseEntity.status(HttpStatus.OK).body(responseWrapper);
    }

    // 사용자 알러지, 선호재료 기반 레시피 추천 (로그인한 사람만)
    @GetMapping("/recommend")
    public ResponseEntity<RecipeRecommendResponseWrapperDto> getUserRecommendations(
            @RequestHeader("Authorization") String authorization) {

        Long userId = userServiceClient.getUserId(authorization);

        // 1. 사용자 알러지 정보 조회
        List<UserAllergyResponseDto> userAllergies = userServiceClient.getUserAllergies(authorization).getBody();

        // 2. 사용자 선호 재료 조회
        List<IngredientLikeResponseDto> likedIngredients = ingredientServiceClient.findUserLikeIngredientList(authorization).getBody();

        // 알러지에 해당하는 재료는 제외한 재료 목록 생성
        List<Long> safeIngredientIds = likedIngredients.stream()
                .filter(likedIngredient ->
                        userAllergies.stream().noneMatch(allergy -> allergy.getCommonCodeNum().equals(likedIngredient.getAllergyNum())))
                .map(IngredientLikeResponseDto::getId)
                .collect(Collectors.toList());

        // 사용자 선호 재료 기반 레시피 추천
        List<RecipeRecommendResponseDto> recommendedRecipes = recipeRecommendService.getRecipesByIngredients(safeIngredientIds);


        String message;
        if (recommendedRecipes.size() >= 4) {
            // 레시피가 4개 이상이면 사용자 선호 재료 기반 추천
            message = "사용자 선호 재료를 기반으로 레시피를 추천했어요";

            // 레시피가 8개 미만일 경우 인기순으로 채우기
            if (recommendedRecipes.size() < 20) {
                List<RecipeRecommendResponseDto> popularRecipes = recipeRecommendService.getPopularRecipes(20 - recommendedRecipes.size());
                recommendedRecipes.addAll(popularRecipes);
            }
        } else {
            // 레시피가 4개 미만일 경우 가장 인기가 많은 레시피 추천
            message = "가장 인기가 많은 레시피를 추천했어요";
            recommendedRecipes = recipeRecommendService.getPopularRecipes(20);
        }

        // 결과를 RecipeRecommendResponseWrapperDto로 감싸서 반환
        RecipeRecommendResponseWrapperDto responseWrapper = new RecipeRecommendResponseWrapperDto(message, recommendedRecipes);
        return ResponseEntity.status(HttpStatus.OK).body(responseWrapper);
    }

    // 계절별 레시피 추천
    @GetMapping("/recommend/season")
    public ResponseEntity<RecipeRecommendResponseWrapperDto> getSeasonRecommendations() {
        // 고정된 recipe_id 목록
        List<Long> recipeIds = List.of(
                250122L, 250123L, 250125L, 250126L, 250127L, 250128L, 250129L,
                250130L, 250131L, 250133L, 250134L, 250135L, 250136L, 250137L,
                250138L, 250139L, 250141L, 250142L, 250143L, 250145L
//                250146L,
//                250148L, 250149L, 250150L, 250151L, 250152L, 250153L, 250154L,
//                250155L, 250156L, 250157L, 250158L, 250159L, 250160L, 250161L,
//                250162L, 250163L, 250165L, 250166L, 250167L, 250168L, 250169L,
//                250170L, 250171L, 250172L, 250173L, 250174L, 250175L, 250176L,
//                250177L, 250178L, 250179L, 250180L, 250181L
        );

        // 해당 레시피 ID 목록을 기반으로 레시피 가져오기
        List<RecipeRecommendResponseDto> recommendedRecipes = recipeRecommendService.getRecipesByIds(recipeIds);

        // 메시지 설정
        String message = "가을에 맞는 레시피 추천해드릴게요!";

        // 결과를 RecipeRecommendResponseWrapperDto로 감싸서 반환
        RecipeRecommendResponseWrapperDto responseWrapper = new RecipeRecommendResponseWrapperDto(message, recommendedRecipes);
        return ResponseEntity.status(HttpStatus.OK).body(responseWrapper);
    }


}
