package com.recipe.social_service.controller;

import com.recipe.social_service.client.UserServiceClient;
import com.recipe.social_service.service.SocialService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/social")
public class SocialController {

    private final UserServiceClient userServiceClient;
    private final SocialService socialService;

    @GetMapping("/{userId}/follower")
    public ResponseEntity<List<Long>> getFollowers(@PathVariable("userId") Long userId) {
        List<Long> followers = socialService.getFollowers(userId);
        return ResponseEntity.status(HttpStatus.OK).body(followers);
    }

    @GetMapping("/{userId}/following")
    public ResponseEntity<List<Long>> getFollowings(@PathVariable("userId") Long userId) {
        List<Long> followings = socialService.getFollowings(userId);
        return ResponseEntity.status(HttpStatus.OK).body(followings);
    }


    @PostMapping("/follow/{partnerId}")
    public ResponseEntity<?> follow(@RequestHeader("Authorization") String authorization, @PathVariable("partnerId") Long partnerId) {
        Long userId = userServiceClient.getUserId(authorization);
        socialService.followUser(userId, partnerId);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping("/follow/{partnerId}")
    public ResponseEntity<?> unfollow(@RequestHeader("Authorization") String authorization, @PathVariable("partnerId") Long partnerId) {
        Long userId = userServiceClient.getUserId(authorization);
        socialService.unfollowUser(userId, partnerId);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
