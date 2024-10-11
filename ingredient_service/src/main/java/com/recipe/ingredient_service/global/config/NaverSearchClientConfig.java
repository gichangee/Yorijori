package com.recipe.ingredient_service.global.config;

import feign.RequestInterceptor;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;

@RequiredArgsConstructor
public class NaverSearchClientConfig {

    @Bean
    public RequestInterceptor requestInterceptor(@Value("${ocr.api.key}") String apiKey, @Value("${ocr.api.secret}") String apiSecretKey) {
        return requestTemplate -> {
            requestTemplate.header("X-Naver-Client-Id", apiKey);
            requestTemplate.header("X-Naver-Client-Secret", apiSecretKey);
        };
    }
}
