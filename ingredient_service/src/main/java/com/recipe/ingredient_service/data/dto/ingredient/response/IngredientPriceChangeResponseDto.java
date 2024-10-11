package com.recipe.ingredient_service.data.dto.ingredient.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class IngredientPriceChangeResponseDto {
    private Long id;
    private String name;
    private String currentPrice;
    private String yesterdayPrice;
    private int priceGap;
}
