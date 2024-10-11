package com.recipe.social_service.client;


import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;


@FeignClient(name = "user-service")
public interface UserServiceClient {
    @GetMapping("/api/v1/users/id")
    Long getUserId(@RequestHeader("Authorization") String authorization);
}
