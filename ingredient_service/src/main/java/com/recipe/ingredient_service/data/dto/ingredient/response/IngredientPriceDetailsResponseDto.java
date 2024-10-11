package com.recipe.ingredient_service.data.dto.ingredient.response;

import com.recipe.ingredient_service.data.dto.ingredient.DayDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;


@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class IngredientPriceDetailsResponseDto {

    private List<DayDto> monthPrice;

    private List<DayDto> weekPrice;

    private List<DayDto> dayPrice;


    public void setDayPriceData(List<DayDto> dayPrice) {
        this.dayPrice = dayPrice;
    }

    public void setWeekPriceData(List<DayDto> weekPrice) {
        this.weekPrice = weekPrice;
    }

    public void setMonthPriceData(List<DayDto> monthPrice) {
        this.monthPrice = monthPrice;
    }

}