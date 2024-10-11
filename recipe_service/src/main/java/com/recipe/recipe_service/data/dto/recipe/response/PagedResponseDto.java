package com.recipe.recipe_service.data.dto.recipe.response;

import java.util.List;

public class PagedResponseDto<T> {
    private List<T> data;
    private long totalCount;

    public PagedResponseDto(List<T> data, long totalCount) {
        this.data = data;
        this.totalCount = totalCount;
    }

    // Getter와 Setter
    public List<T> getData() {
        return data;
    }

    public void setData(List<T> data) {
        this.data = data;
    }

    public long getTotalCount() {
        return totalCount;
    }

    public void setTotalCount(long totalCount) {
        this.totalCount = totalCount;
    }
}
