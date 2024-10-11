package com.recipe.ingredient_service.repository;

import com.recipe.ingredient_service.data.domain.UserLikeMaterials;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface UserLikeMaterialsRepository extends JpaRepository<UserLikeMaterials, Long> {

    @Query("SELECT u.ingredientId, COUNT(u.ingredientId) AS cnt " +
            "FROM UserLikeMaterials u " +
            "WHERE u.date >= :startDate AND u.ingredientId BETWEEN 1 AND 101" +
            "GROUP BY u.ingredientId " +
            "ORDER BY cnt DESC")
    List<Object[]> findTop3LikedIngredients(@Param("startDate") LocalDateTime startDate, Pageable pageable);


    @Modifying
    @Query("DELETE FROM UserLikeMaterials u WHERE u.userId = :userId AND u.ingredientId = :ingredientId")
    void deleteByUserIdAndIngredientId(@Param("userId") Long userId, @Param("ingredientId") Long ingredientId);

    @Query("SELECT u.ingredientId FROM UserLikeMaterials u WHERE u.userId = :userId")
    List<Long> findIngredientIdsByUserId(@Param("userId") Long userId);

    boolean existsByUserIdAndIngredientId(Long userId, Long ingredientId);

}
