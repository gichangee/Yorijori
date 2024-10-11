package com.recipe.yorijori.data.domain;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "allergys")
@ToString
@Builder
public class Allergys extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "allergy_id")
    private Long allergyId;

    @Builder.Default
    @Column(name = "user_status")
    private boolean status = true;

    @Column(name = "common_code_num")
    private String commonCodeNum;

    @Column(name = "user_id")
    private Long userId;

}
