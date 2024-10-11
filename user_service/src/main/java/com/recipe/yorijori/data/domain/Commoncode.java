package com.recipe.yorijori.data.domain;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "commoncode")
@ToString
@Builder
public class Commoncode {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "common_code_id")
    private Long commonCodeId;

    @Column(name = "common_code_type")
    private String commonCodeType;

    @Column(name = "common_code_num")
    private String commonCodeNum;

    @Column(name = "common_code_name")
    private String commonCodeName;
}
