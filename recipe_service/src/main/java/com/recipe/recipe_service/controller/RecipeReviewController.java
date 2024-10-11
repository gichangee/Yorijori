package com.recipe.recipe_service.controller;

import com.recipe.recipe_service.data.dto.review.request.RecipeReviewRequestDto;
import com.recipe.recipe_service.data.dto.review.response.RecipeReviewResponseDto;
import com.recipe.recipe_service.service.RecipeReviewService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/v1/recipe")
@AllArgsConstructor
@Slf4j
public class RecipeReviewController {

    private final RecipeReviewService recipeReviewService;

    // 리뷰 조회
    @GetMapping("/review")
    public ResponseEntity<List<RecipeReviewResponseDto>> getReviews(
            @RequestParam("id") Long recipeId) {

        List<RecipeReviewResponseDto> reviews = recipeReviewService.getReviews(recipeId);
        return ResponseEntity.status(HttpStatus.OK).body(reviews);
    }

    // 리뷰 등록
    @PostMapping("/review")
    public ResponseEntity<?> createReview(
            @RequestHeader("Authorization") String authorization,
            @RequestParam("id") Long recipeId,
            @RequestPart(value = "reviewImage", required = false) MultipartFile reviewImage,
            @RequestPart("review") RecipeReviewRequestDto requestDto) {

        recipeReviewService.createReview(authorization, recipeId, reviewImage, requestDto);
        return ResponseEntity.status(HttpStatus.OK).build();
    }

    // 리뷰 삭제
    @DeleteMapping("/review")
    public ResponseEntity<?> deleteReview(
            @RequestParam("id") Long reviewId,
            @RequestHeader("Authorization") String authorization) {

        recipeReviewService.deleteReview(reviewId, authorization);
        return ResponseEntity.status(HttpStatus.OK).build();
    }
}
