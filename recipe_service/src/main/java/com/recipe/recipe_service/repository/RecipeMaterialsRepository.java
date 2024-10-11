package com.recipe.recipe_service.repository;

import com.recipe.recipe_service.data.domain.RecipeMaterials;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RecipeMaterialsRepository extends JpaRepository<RecipeMaterials, Integer> {
    List<RecipeMaterials> findByRecipeId(Long recipeId);
}
