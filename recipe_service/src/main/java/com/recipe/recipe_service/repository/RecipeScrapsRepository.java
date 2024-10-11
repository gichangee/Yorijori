package com.recipe.recipe_service.repository;

import com.recipe.recipe_service.data.domain.RecipeLikes;
import com.recipe.recipe_service.data.domain.RecipeScraps;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface RecipeScrapsRepository extends JpaRepository<RecipeScraps, Integer> {
    Optional<RecipeScraps> findByRecipeIdAndUserId(Long recipeId, Long userId);

    List<RecipeScraps> findByUserIdAndStatusTrue(Long userId);

    List<RecipeScraps> findByRecipeId(Long recipeId);
}
