package com.recipe.ingredient_service.data.dto.ingredient;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class IngredientCountDto {

    private Long ingredientId;  // 재료 ID
    private Long count;         // 재료가 몇 번 중복되었는지
}
