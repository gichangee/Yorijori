package com.recipe.ingredient_service.data.domain;

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
@Table(name = "userlikematerials")
public class UserLikeMaterials {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_like_material_id")
    private Long id;

    @Column(name = "created_date")
    private LocalDateTime date;

    @Column(name = "user_id")
    private Long userId;

    @Column(name = "material_id")
    private Long ingredientId;
}
