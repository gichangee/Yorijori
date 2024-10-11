package com.recipe.recipe_service.repository;

import com.recipe.recipe_service.data.domain.RecipeOrders;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RecipeOrdersRepository extends JpaRepository<RecipeOrders, Integer> {
    List<RecipeOrders> findByRecipeId(Long recipeId);
}
