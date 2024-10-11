package com.recipe.recipe_service.repository;

import com.recipe.recipe_service.data.domain.RecipeReviews;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RecipeReviewRepository extends JpaRepository<RecipeReviews, Long> {

    List<RecipeReviews> findByRecipeId(Long recipeId);
}
