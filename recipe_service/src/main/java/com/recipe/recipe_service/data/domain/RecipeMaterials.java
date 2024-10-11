package com.recipe.recipe_service.data.domain;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "recipematerials")
public class RecipeMaterials {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "recipe_material_id")
    private Long id;

    @Column(name = "recipe_material_amount")
    private String amount;

    @Column(name = "recipe_material_unit")
    private String unit;

    @Column(name = "recipe_subtitle")
    private String subtitle;

    @Column(name = "recipe_id")
    private Long recipeId;

    @Column(name = "material_id")
    private Long materialId;


}
