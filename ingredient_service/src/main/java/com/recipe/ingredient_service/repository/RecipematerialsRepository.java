package com.recipe.ingredient_service.repository;


import com.recipe.ingredient_service.data.domain.Recipematerials;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface RecipematerialsRepository extends JpaRepository<Recipematerials, Long> {

    @Query("SELECT rm.recipeId FROM Recipematerials rm WHERE rm.materialId IN :ingredientIds " +
            "GROUP BY rm.recipeId " +
            "HAVING COUNT(DISTINCT rm.materialId) = :ingredientCount")
    List<Long> findRecipeIdsByAtLeastIngredientIds(@Param("ingredientIds") List<Long> ingredientIds,
                                                   @Param("ingredientCount") Long ingredientCount,
                                                   Pageable pageable);
}