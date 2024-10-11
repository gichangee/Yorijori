package com.recipe.ingredient_service.data.domain;

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
@Table(name = "materials")
public class Ingredient {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "material_id")
    private Long id;

    @Column(name = "material_name")
    private String name;

    @Column(name = "material_price_status")
    private boolean priceStatus = false;

    @Column(name = "material_img")
    private String ingredientImage;

    @Column(name = "material_allergy_num")
    private String allergyNum;


}
