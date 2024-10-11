package com.recipe.yorijori.service;


import com.recipe.yorijori.data.domain.Allergys;
import com.recipe.yorijori.data.dto.allergy.request.AllergyRequestDto;
import com.recipe.yorijori.data.dto.allergy.response.AllergyResponseDto;
import com.recipe.yorijori.global.exception.AllergyAlreadyExistsException;
import com.recipe.yorijori.global.exception.NoAllergyException;
import com.recipe.yorijori.repository.AllergyRespository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AllergyService {

    private final AllergyRespository allergyRepository;


    public List<AllergyResponseDto> getAllergiesByUserId(Long userId) {
        List<Allergys> allergies = allergyRepository.findAllByUserId(userId);
        return allergies.stream()
                .map(allergy -> new AllergyResponseDto(
                        allergy.getAllergyId(),
                        allergy.isStatus(),
                        allergy.getCommonCodeNum(),
                        allergy.getUserId()))
                .collect(Collectors.toList());
    }

    public AllergyResponseDto addAllergy(Long userId, AllergyRequestDto requestDto) {
        boolean exists = allergyRepository.existsByCommonCodeNumAndUserId(requestDto.getCommonCodeNum(), userId);

        if (exists) {
            throw new AllergyAlreadyExistsException();
        }

        Allergys newAllergy = Allergys.builder()
                .userId(userId)
                .commonCodeNum(requestDto.getCommonCodeNum())
                .build();
        Allergys savedAllergy = allergyRepository.save(newAllergy);

        return new AllergyResponseDto(
                savedAllergy.getAllergyId(),
                savedAllergy.isStatus(),
                savedAllergy.getCommonCodeNum(),
                savedAllergy.getUserId()
        );
    }

    public void deleteAllergyByCommonCodeNum(String commonCodeNum, Long userId) {
        Allergys allergy = allergyRepository.findByCommonCodeNumAndUserId(commonCodeNum, userId)
                .orElseThrow(NoAllergyException::new);

        allergyRepository.delete(allergy);
    }
}