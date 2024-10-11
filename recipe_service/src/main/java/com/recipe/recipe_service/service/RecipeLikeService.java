package com.recipe.recipe_service.service;

import com.recipe.recipe_service.data.domain.Recipe;
import com.recipe.recipe_service.data.domain.RecipeLikes;
import com.recipe.recipe_service.repository.RecipeLikesRepository;
import com.recipe.recipe_service.repository.RecipeRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@Slf4j
@AllArgsConstructor
public class RecipeLikeService {

    private final RecipeLikesRepository recipeLikesRepository;
    private final RecipeRepository recipeRepository;

    @Transactional
    public void likeRecipe(Long recipeId, Long userId) {
        Optional<RecipeLikes> existingLike = recipeLikesRepository.findByRecipeIdAndUserId(recipeId, userId);

        if (existingLike.isPresent()) {
            RecipeLikes recipeLikes = existingLike.get();
            if (!recipeLikes.getStatus()) {
                // status false -> true
                recipeLikes.setStatus(true);
                // 좋아요 카운트 증가
                Recipe recipe = recipeRepository.findById(recipeId)
                        .orElseThrow(() -> new EntityNotFoundException("해당 레시피가 존재하지 않습니다."));
                recipe.setLikeCount(recipe.getLikeCount() + 1);
            }
            return;
        }

        // 새로운 좋아요 등록
        RecipeLikes newLikes = RecipeLikes.builder()
                .recipeId(recipeId)
                .userId(userId)
                .status(true) // 좋아요 상태로 설정
                .build();

        recipeLikesRepository.save(newLikes);

        // recipes table의 like_count 업데이트 (좋아요 + 1)
        Recipe recipe = recipeRepository.findById(recipeId)
                .orElseThrow(() -> new EntityNotFoundException("해당 레시피가 존재하지 않습니다."));
        recipe.setLikeCount(recipe.getLikeCount() + 1);

    }

    @Transactional
    public void unlikeRecipe(Long recipeId, Long userId) {
        Optional<RecipeLikes> existingLike = recipeLikesRepository.findByRecipeIdAndUserId(recipeId, userId);

        if (existingLike.isPresent()) {
            RecipeLikes recipeLikes = existingLike.get();
            if (recipeLikes.getStatus()) {
                // status true -> false (좋아요 취소)
                recipeLikes.setStatus(false);
                Recipe recipe = recipeRepository.findById(recipeId)
                        .orElseThrow(() -> new EntityNotFoundException("해당 레시피가 존재하지 않습니다."));
                recipe.setLikeCount(recipe.getLikeCount() - 1);
            }
        } else {
            throw new IllegalStateException("좋아요가 등록되지 않은 상태입니다.");
        }

    }
}
