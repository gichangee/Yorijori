package com.recipe.yorijori.repository;

import com.recipe.yorijori.data.domain.Allergys;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;


public interface AllergyRespository extends JpaRepository<Allergys, Long> {
    List<Allergys> findAllByUserId(Long userId);

    Optional<Allergys> findByCommonCodeNumAndUserId(String commonCodeNum, Long userId);

    boolean existsByCommonCodeNumAndUserId(String commonCodeNum, Long userId);
}

