package com.recipe.yorijori.data.domain;


import com.recipe.yorijori.data.enums.Role;
import com.recipe.yorijori.data.enums.SocialType;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.security.crypto.password.PasswordEncoder;


@Entity
@Getter
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "Users")
@ToString
@Builder
public class User extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    private Long userId;

    @Column(name = "user_email")
    private String email;

    @Column(name = "user_nickname")
    private String nickname;

    @Column(name = "user_image")
    private String profileImage;

    @Builder.Default
    @Column(name = "user_summary")
    private String summary = "";

    @Column(name = "user_name")
    private String name;

    @Builder.Default
    @Column(name = "user_score")
    private Long score = 0L;

    @Builder.Default
    @Column(name = "user_status")
    private boolean status = true;

    @Enumerated(EnumType.STRING)
    @Column(name = "user_role")
    private Role role;

    @Enumerated(EnumType.STRING)
    @Column(name = "user_social_type")
    private SocialType socialType;

    @Column(name = "user_social_id")
    private String socialId;

    @Column(name = "user_password")
    private String password; // 비밀번호

    @Column(name = "user_refresh_token")
    private String refreshToken;

    public void passwordEncode(PasswordEncoder passwordEncoder) {
        this.password = passwordEncoder.encode(this.password);
    }

    public void updateRefreshToken(String updateRefreshToken) {
        this.refreshToken = updateRefreshToken;
    }

    public void setNickname(String nickname) {
        this.nickname = nickname;
    }

    public void setSummary(String summary) {
        this.summary = summary;
    }

    public void setProfileImage(String profileImageUrl) {
        this.profileImage = profileImageUrl;
    }

    public void plusScore(Long points) {
        this.score += points;
    }
}