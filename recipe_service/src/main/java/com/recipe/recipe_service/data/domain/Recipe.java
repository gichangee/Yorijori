package com.recipe.recipe_service.data.domain;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "recipes")
public class Recipe {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "recipe_id")
    private Long id;


    @Column(name = "recipe_title")
    private String title;

    @Column(name = "recipe_name")
    private String name;

    @Column(name = "recipe_intro")
    private String intro; // 레시피 소개

    @Column(name = "recipe_image")
    private String image;

    @Column(name = "recipe_view_count")
    private Long viewCount;

    @Column(name = "recipe_servings")
    private Long servings;

    @Column(name = "recipe_time")
    private Long time;

    @Column(name = "recipe_level")
    private String level;

    @Column(name = "recipe_cooking_tools")
    private String cookingTools;

    @Column(name = "recipe_type")
    private String type;

    @Column(name = "recipe_situation")
    private String situation;

    @Column(name = "recipe_ingredients")
    private String ingredients;

    @Column(name = "recipe_method")
    private String method;

    @Column(name = "created_date", updatable = false)
    private LocalDateTime createdDate;

    @Column(name = "modified_date")
    private LocalDateTime modifiedDate;

    @Column(name = "user_status")
    private Boolean userStatus = true;

    @Column(name = "user_id")
    private Long userId;

    @Builder.Default
    @Setter
    @Column(name = "recipe_like_count")
    private Long likeCount = 0L;

    @Builder.Default
    @Setter
    @Column(name = "recipe_scrap_count")
    private Long scrapCount = 0L;

    @Builder.Default
    @Column(name = "recipe_comment_count")
    private Long commentCount = 0L;

    @Builder.Default
    @Column(name = "recipe_kcal")
    private Long kcal = 0L;

    // 데이터가 저장되기 전 자동으로 현재 시간과 기본값 설정
    @PrePersist
    protected void onCreate() {
        this.createdDate = LocalDateTime.now();
        this.modifiedDate = LocalDateTime.now();
        if (this.userStatus == null) {
            this.userStatus = true;
        }
    }

    // 데이터가 수정되기 전 자동으로 수정 시간 설정
    @PreUpdate
    protected void onUpdate() {
        this.modifiedDate = LocalDateTime.now();
    }

}
