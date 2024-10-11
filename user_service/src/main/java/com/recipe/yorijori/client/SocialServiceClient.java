package com.recipe.yorijori.client;


import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;

@FeignClient(name = "social-service")
public interface SocialServiceClient {

    @GetMapping("/api/v1/social/{userId}/follower")
    List<Long> getFollowers(@PathVariable("userId") Long userId);

    @GetMapping("/api/v1/social/{userId}/following")
    List<Long> getFollowings(@PathVariable("userId") Long userId);
}
