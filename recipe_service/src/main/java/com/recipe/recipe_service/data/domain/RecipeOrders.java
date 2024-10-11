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
@Table(name = "recipeorders")
public class RecipeOrders {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "recipe_order_id")
    private Long id;

    @Column(name = "recipe_order_content")
    private String content;

    @Column(name = "recipe_order_num")
    private Long orderNum;

    @Column(name = "recipe_order_img")
    private String image;

    @Column(name = "recipe_id")
    private Long recipeId;

}
