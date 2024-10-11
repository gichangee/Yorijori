package com.recipe.recipe_service.service;

import com.recipe.recipe_service.client.UserServiceClient;
import com.recipe.recipe_service.data.domain.RecipeReviews;
import com.recipe.recipe_service.data.dto.review.request.RecipeReviewRequestDto;
import com.recipe.recipe_service.data.dto.review.response.RecipeReviewResponseDto;
import com.recipe.recipe_service.data.dto.user.response.UserSimpleResponseDto;
import com.recipe.recipe_service.repository.RecipeReviewRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.List;

@Service
@AllArgsConstructor
@Slf4j
public class RecipeReviewService {

    private final RecipeReviewRepository reviewRepository;
    private final UserServiceClient userServiceClient;
    private final S3Uploader s3Uploader;

    public List<RecipeReviewResponseDto> getReviews(Long recipeId) {

        List<RecipeReviews> reviews = reviewRepository.findByRecipeId(recipeId);

        List<RecipeReviewResponseDto> responseDtos = reviews.stream()
                .map(review -> {
                    // 유저 정보를 가져옴
                    UserSimpleResponseDto userInfo = userServiceClient.getUserInfo(review.getUserId());

                    // 리뷰 정보를 RecipeReviewResponseDto로 변환
                    return RecipeReviewResponseDto.builder()
                            .userId(review.getUserId())
                            .nickname(userInfo.getNickname())
                            .profileImage(userInfo.getProfileImage())
                            .reviewImage(review.getImage()) // 레시피 리뷰 이미지
                            .rating(review.getRating())
                            .title(review.getTitle())
                            .content(review.getContent())
                            .build();
                })
                .toList();

        return responseDtos;
    }

    // 리뷰 생성
    @Transactional
    public void createReview(String authorization, Long recipeId, MultipartFile reviewImage, RecipeReviewRequestDto recipeReviewRequestDto) {

        Long userId = userServiceClient.getUserId(authorization);

        // 이미지 파일 처리 (S3에 저장)
        String imageUrl = null;
        // 이미지 파일이 있는 경우 S3에 업로드
        if (reviewImage != null && !reviewImage.isEmpty()) {
            try {
                imageUrl = s3Uploader.saveFile(reviewImage);
            } catch (IOException e) {
                throw new RuntimeException(e);
            }
        }

        // 리뷰 정보 생성
        RecipeReviews newReview = RecipeReviews.builder()
                .userId(userId)
                .recipeId(recipeId)
                .title(recipeReviewRequestDto.getTitle())
                .rating(recipeReviewRequestDto.getRating())
                .content(recipeReviewRequestDto.getContent())
                .image(imageUrl) // 레시피 리뷰 이미지
                .createdDate(LocalDateTime.now())
                .modifiedDate(LocalDateTime.now())
                .userStatus(true)
                .build();

        reviewRepository.save(newReview);
    }

    // 리뷰 삭제
    @Transactional
    public void deleteReview(Long reviewId, String authorization) {
        Long userId = userServiceClient.getUserId(authorization);

        RecipeReviews review = reviewRepository.findById(reviewId)
                .orElseThrow(() -> new EntityNotFoundException("리뷰가 존재하지 않습니다."));

        // 리뷰 작성자와 요청한 사용자가 일치하는지 확인
        if (!review.getUserId().equals(userId)) {
            throw new IllegalStateException("리뷰를 삭제할 권한이 없습니다.");
        }

        reviewRepository.deleteById(reviewId);
    }


}
