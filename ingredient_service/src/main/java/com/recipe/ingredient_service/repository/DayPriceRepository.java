package com.recipe.ingredient_service.repository;

import com.recipe.ingredient_service.data.domain.DayPrice;
import feign.Param;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface DayPriceRepository extends JpaRepository<DayPrice, Long> {

    DayPrice findTopByIngredientIdAndPriceGreaterThanOrderByDayDesc(Long ingredientId, int price);

    @Query(value = "SELECT ranked.material_id, ranked.day_price FROM (" +
            "SELECT dp.material_id, dp.day_price, ROW_NUMBER() OVER (PARTITION BY dp.material_id ORDER BY dp.day_price_day DESC) as row_num " +
            "FROM dayprice dp WHERE dp.day_price != 0 AND dp.material_id IN :ingredientIds" +
            ") ranked WHERE ranked.row_num <= 2", nativeQuery = true)
    List<Object[]> findIngredientPriceChanges(@Param("ingredientIds") List<Long> ingredientIds);

    @Query("SELECT d FROM DayPrice d WHERE d.ingredientId = :ingredientId AND d.day <= :today AND d.price != 0 ORDER BY d.day DESC")
    List<DayPrice> findRecentDays(@Param("ingredientId") Long ingredientId, @Param("today") LocalDateTime today, Pageable pageable);


    @Query(value = "SELECT WEEK(d.day_price_day) AS week_num, AVG(d.day_price) AS avg_price " +
            "FROM dayprice d " +
            "WHERE d.material_id = :ingredientId AND d.day_price_day <= :endDate AND d.day_price != 0 " +
            "GROUP BY WEEK(d.day_price_day) " +
            "ORDER BY week_num DESC", nativeQuery = true)
    List<Object[]> findWeeklyAveragePriceInPast(@Param("ingredientId") Long ingredientId, @Param("endDate") LocalDateTime endDate);

    @Query(value = "SELECT MONTH(d.day_price_day) AS month_num, AVG(d.day_price) AS avg_price " +
            "FROM dayprice d " +
            "WHERE d.material_id = :ingredientId AND d.day_price_day <= :endDate AND d.day_price != 0 " +
            "GROUP BY MONTH(d.day_price_day) " +
            "ORDER BY month_num DESC", nativeQuery = true)
    List<Object[]> findMonthlyAveragePriceInPast(@Param("ingredientId") Long ingredientId, @Param("endDate") LocalDateTime endDate);

}
