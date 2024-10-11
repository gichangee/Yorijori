package com.recipe.yorijori.repository;

import com.recipe.yorijori.data.domain.User;
import com.recipe.yorijori.data.enums.SocialType;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;


public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByEmail(String email);

    Optional<User> findByNickname(String nickname);

    Optional<User> findByRefreshToken(String refreshToken);


    Optional<User> findBySocialTypeAndSocialId(SocialType socialType, String socialId);
}

