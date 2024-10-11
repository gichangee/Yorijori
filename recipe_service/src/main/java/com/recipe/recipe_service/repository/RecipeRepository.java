package com.recipe.recipe_service.repository;

import com.recipe.recipe_service.data.domain.Recipe;
import com.recipe.recipe_service.data.dto.recipe.response.RecipeDetailsResponseDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface RecipeRepository extends JpaRepository<Recipe, Long> {

    List<Recipe> findByUserId(Long userId);

    Page<Recipe> findAll(Pageable pageable);

    Optional<Recipe> findById(Long recipeId);

    @Query("SELECT r FROM Recipe r WHERE r.title LIKE %:keyword% OR r.name LIKE %:keyword%")
    Page<Recipe> searchByKeyword(@Param("keyword") String keyword, Pageable pageable);

    void deleteById(Long recipeId);

    List<Recipe> findByIdIn(List<Long> ids);

    @Query("SELECT r.name FROM Recipe r")
    List<String> findAllRecipeNames();

    @Query("SELECT r.name FROM Recipe r WHERE LOWER(r.name) LIKE LOWER(CONCAT('%', :keyword, '%'))")
    List<String> findRecipeNamesByKeyword(@Param("keyword") String keyword, Pageable pageable);

    @Query("SELECT r FROM Recipe r JOIN RecipeMaterials rm ON r.id = rm.recipeId " +
            "WHERE rm.materialId IN :ingredientIds " +
            "GROUP BY r.id " +
            "HAVING COUNT(rm.materialId) >= :minMatchCount")
    List<Recipe> findRecipesByIngredients(
            @Param("ingredientIds") List<Long> ingredientIds,
            @Param("minMatchCount") long minMatchCount);

    @Query("SELECT r FROM Recipe r ORDER BY r.likeCount DESC")
    List<Recipe> findTopByOrderByLikeCountDesc(Pageable pageable);

    // 카테고리별 검색
    @Query("SELECT r FROM Recipe r WHERE "
            + "( :codeB IS NULL OR r.type = :codeB ) AND "
            + "( :codeC IS NULL OR r.situation = :codeC ) AND "
            + "( :codeD IS NULL OR r.ingredients LIKE %:codeD% ) AND "
            + "( :codeE IS NULL OR r.method LIKE %:codeE% )")
    Page<Recipe> findRecipesByCategory(@Param("codeB") String codeB,
                                       @Param("codeC") String codeC,
                                       @Param("codeD") String codeD,
                                       @Param("codeE") String codeE,
                                       Pageable pageable);
}