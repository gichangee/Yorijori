package com.recipe.ingredient_service.data.dto.ingredient.request;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class IngredientRequestDto {
    private Long id;
    private String name;
}
