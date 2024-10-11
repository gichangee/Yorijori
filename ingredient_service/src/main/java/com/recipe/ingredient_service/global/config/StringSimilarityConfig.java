package com.recipe.ingredient_service.global.config;

import info.debatty.java.stringsimilarity.JaroWinkler;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class StringSimilarityConfig {

    @Bean
    public JaroWinkler jaroWinkler() {
        return new JaroWinkler();
    }
}
