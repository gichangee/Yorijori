package com.recipe.ingredient_service.data.domain;


import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "recipematerials")
@ToString
@Builder
public class Recipematerials {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "recipe_material_id")
    private Long recipeMaterialId;

    @Column(name = "recipe_ material_amout")
    private String recipeMaterialAmout;

    @Column(name = "recipe_material_unit")
    private String recipeMaterialUnit;

    @Column(name = "recipe_subtitle")
    private String recipeSubtitle;

    @Column(name ="recipe_id")
    private Long recipeId;

    @Column(name = "material_id")
    private Long materialId;
}
