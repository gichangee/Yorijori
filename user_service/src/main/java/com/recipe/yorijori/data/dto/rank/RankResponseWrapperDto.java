package com.recipe.yorijori.data.dto.rank;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class RankResponseWrapperDto {
    private Long totalUserCount; // 전체 유저 수
    private List<RankResponseDto> rankList; // 랭킹 목록
}
