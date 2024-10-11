package com.recipe.ingredient_service.repository;

import com.recipe.ingredient_service.data.domain.Ingredient;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface IngredientRepository extends JpaRepository<Ingredient, Long> {

    Optional<Ingredient> findByNameIgnoreCase(String name);

    Optional<Ingredient> findByName(String name);


    Page<Ingredient> findAll(Pageable pageable);

    @Query("SELECT i.id FROM Ingredient i WHERE i.priceStatus = true")
    List<Long> findMaterialIdsWithPriceStatusTrue();

    @Query("SELECT i FROM Ingredient i WHERE i.id IN :ingredientIds")
    List<Ingredient> findByIds(@Param("ingredientIds") List<Long> ingredientIds);

    @Query("SELECT r.name FROM Ingredient r")
    List<String> findAllIngredientNames();

    @Query("SELECT r.name FROM Ingredient r WHERE LOWER(r.name) LIKE LOWER(CONCAT('%', :keyword, '%'))")
    List<String> findIngredientNamesByKeyword(String keyword, Pageable pageable);
}
