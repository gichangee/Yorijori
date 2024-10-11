package com.recipe.recipe_service.data.domain;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "recipereviews")
public class RecipeReviews {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "recipe_review_id")
    private Long id;

    @Column(name = "recipe_review_title")
    private String title;

    @Column(name = "recipe_review_rating")
    private Long rating;

    @Column(name = "recipe_review_image")
    private String image;

    @Column(name = "recipe_review_content")
    private String content;

    @Column(name = "created_date", updatable = false)
    private LocalDateTime createdDate;

    @Column(name = "modified_date")
    private LocalDateTime modifiedDate;

    @Column(name = "user_status")
    private Boolean userStatus = true;

    @Column(name = "user_id")
    private Long userId;

    @Column(name = "recipe_id")
    private Long recipeId;
}
