package com.recipe.yorijori.service;


import com.recipe.yorijori.data.domain.Commoncode;
import com.recipe.yorijori.data.dto.common.response.CommonResponseDto;
import com.recipe.yorijori.repository.CommonRespository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CommonService {

    private final CommonRespository commonRepository;


    public List<CommonResponseDto> getAllCommonCodes() {
        List<Commoncode> commonCodes = commonRepository.findAll();
        return commonCodes.stream()
                .map(code -> new CommonResponseDto(
                        code.getCommonCodeId(),
                        code.getCommonCodeType(),
                        code.getCommonCodeNum(),
                        code.getCommonCodeName()))
                .collect(Collectors.toList());
    }
}