package com.recipe.ingredient_service.data.dto.ingredient.response;

import lombok.Data;

import java.util.Map;

@Data
public class LowestPriceDto {

    private String title;
    private String link;
    private String image;
    private String lprice;
    private String hprice;
    private String mallName;
    private String productId;
    private String productType;
    private String brand;
    private String maker;
    private String category1;
    private String category2;
    private String category3;
    private String category4;


    public static LowestPriceDto from(Map<String, Object> mapData) {


        LowestPriceDto dto = new LowestPriceDto();
        dto.title = (String) mapData.getOrDefault("title", "");
        dto.link = (String) mapData.getOrDefault("link", "");
        dto.image = (String) mapData.getOrDefault("image", "");
        dto.lprice = (String) mapData.getOrDefault("lprice", "");
        dto.hprice = (String) mapData.getOrDefault("hprice", "");
        dto.mallName = (String) mapData.getOrDefault("mallName", "");
        dto.productId = (String) mapData.getOrDefault("productId", "");
        dto.productType = (String) mapData.getOrDefault("productType", "");
        dto.brand = (String) mapData.getOrDefault("brand", "");
        dto.maker = (String) mapData.getOrDefault("maker", "");
        dto.category1 = (String) mapData.getOrDefault("category1", "");
        dto.category2 = (String) mapData.getOrDefault("category2", "");
        dto.category3 = (String) mapData.getOrDefault("category3", "");
        dto.category4 = (String) mapData.getOrDefault("category4", "");
        return dto;
    }
}
