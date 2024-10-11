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
@Table(name = "dayprice")
public class DayPrice {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "day_price_id")
    private Long id;

    @Column(name = "day_price_day")
    private LocalDateTime day;

    @Column(name = "day_price")
    private int price;

    @Column(name = "material_id")
    private Long ingredientId;
}
