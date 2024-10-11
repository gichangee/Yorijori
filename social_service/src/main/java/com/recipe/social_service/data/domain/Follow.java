package com.recipe.social_service.data.domain;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "follow")
@ToString
@Builder
public class Follow {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "follow_id")
    private Long followId;


    @Column(name = "follower_id")
    private Long followerId;

    @Column(name = "following_id")
    private Long followingId;

    @Builder.Default
    @Column(name = "follower_status")
    private Boolean followerStatus = true;

    @Builder.Default
    @Column(name = "following_status")
    private Boolean followingStatus = true;


}
