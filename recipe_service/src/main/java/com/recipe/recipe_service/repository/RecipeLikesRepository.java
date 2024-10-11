package com.recipe.recipe_service.repository;

import com.recipe.recipe_service.data.domain.RecipeLikes;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface RecipeLikesRepository extends JpaRepository<RecipeLikes, Long> {
    // 특정 유저와 레시피에 대해 좋아요가 존재하는지 확인
    Optional<RecipeLikes> findByRecipeIdAndUserId(Long recipeId, Long userId);


    List<RecipeLikes> findByUserIdAndStatusTrue(Long userId);

    List<RecipeLikes> findByRecipeId(Long recipeId);
}
