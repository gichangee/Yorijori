package com.recipe.recipe_service.service;

import com.recipe.recipe_service.data.domain.Recipe;
import com.recipe.recipe_service.data.domain.RecipeScraps;
import com.recipe.recipe_service.repository.RecipeLikesRepository;
import com.recipe.recipe_service.repository.RecipeRepository;
import com.recipe.recipe_service.repository.RecipeScrapsRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@AllArgsConstructor
@Slf4j
public class RecipeScrapService {

    private final RecipeScrapsRepository recipeScrapsRepository;
    private final RecipeRepository recipeRepository;


    @Transactional
    public void scrapRecipe(Long recipeId, Long userId) {
        Optional<RecipeScraps> existingScrap = recipeScrapsRepository.findByRecipeIdAndUserId(recipeId, userId);

        if (existingScrap.isPresent()) {
            RecipeScraps recipeScraps = existingScrap.get();
            if (!recipeScraps.getStatus()) {
                // status false -> true (스크랩 등록)
                recipeScraps.setStatus(true);
                // 스크랩 수 Recipe table에 반영
                Recipe recipe = recipeRepository.findById(recipeId)
                        .orElseThrow(() -> new EntityNotFoundException("해당 레시피가 존재하지 않습니다."));
                recipe.setScrapCount(recipe.getScrapCount() + 1);
            }
            return;
        }

        // 새로운 스크랩 등록
        RecipeScraps newScrap = RecipeScraps.builder()
                .recipeId(recipeId)
                .userId(userId)
                .status(true)
                .build();
        recipeScrapsRepository.save(newScrap);

        // 스크랩 수 Recipe table에 반영
        Recipe recipe = recipeRepository.findById(recipeId)
                .orElseThrow(() -> new EntityNotFoundException("해당 레시피가 존재하지 않습니다."));
        recipe.setScrapCount(recipe.getScrapCount() + 1);

    }

    @Transactional
    public void unscrapRecipe(Long recipeId, Long userId) {
        Optional<RecipeScraps> existingScrap = recipeScrapsRepository.findByRecipeIdAndUserId(recipeId, userId);

        if (existingScrap.isPresent()) {
            RecipeScraps recipeScraps = existingScrap.get();
            if (recipeScraps.getStatus()) {
                // status true -> false (스크랩 취소)
                recipeScraps.setStatus(false);
                // 스크랩 수 Recipe table에 반영
                Recipe recipe = recipeRepository.findById(recipeId)
                        .orElseThrow(() -> new EntityNotFoundException("해당 레시피가 존재하지 않습니다."));
                recipe.setScrapCount(recipe.getScrapCount() - 1);

            }
        } else {
            throw new IllegalStateException("스크랩이 등록되지 않은 상태입니다.");
        }
    }
}
