package com.recipe.recipe_service.client;

import com.recipe.recipe_service.data.dto.user.response.UserAllergyResponseDto;
import com.recipe.recipe_service.data.dto.user.response.UserSimpleResponseDto;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestHeader;

import java.util.List;

@FeignClient(name = "user-service")
public interface UserServiceClient {

    @GetMapping("/api/v1/users/id")
    Long getUserId(@RequestHeader("Authorization") String authorization);

    @GetMapping("/api/v1/users/simple/{userId}")
    UserSimpleResponseDto getUserInfo(@PathVariable("userId") Long userId);

    // 회원 알러지 조회
    @GetMapping("/api/v1/users/allergys")
    ResponseEntity<List<UserAllergyResponseDto>> getUserAllergies(@RequestHeader("Authorization") String authorization);


    @GetMapping("/api/v1/users/point/{userId}")
    ResponseEntity<?> plusPoint(@RequestHeader("Authorization") String authorization, @PathVariable("userId") Long userId);

}
