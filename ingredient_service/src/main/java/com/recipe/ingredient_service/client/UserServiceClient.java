package com.recipe.ingredient_service.client;

import com.recipe.ingredient_service.data.dto.user.UserSimpleResponseDto;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestHeader;

@FeignClient(name = "user-service")
public interface UserServiceClient {

    @GetMapping("/api/v1/users/id")
    Long getUserId(@RequestHeader("Authorization") String authorization);

    @GetMapping("/api/v1/users/simple/{userId}")
    UserSimpleResponseDto getUserInfo(@PathVariable("userId") Long userId);
}