package com.recipe.social_service.service;

import com.recipe.social_service.data.domain.Follow;
import com.recipe.social_service.global.exception.FollowAlreadyExistsException;
import com.recipe.social_service.global.exception.FollowNotFoundException;
import com.recipe.social_service.global.exception.SameFollowException;
import com.recipe.social_service.repository.SocialRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
@RequiredArgsConstructor
public class SocialService {

    private final SocialRepository socialRepository;


    public List<Long> getFollowers(Long userId) {
        return socialRepository.findFollowerIdsByFollowingId(userId);
    }


    public List<Long> getFollowings(Long userId) {
        return socialRepository.findFollowingIdsByFollowerId(userId);
    }


    public void followUser(Long followerId, Long followingId) {
        Follow existingFollow = socialRepository.findByFollowerIdAndFollowingId(followerId, followingId);
        if (existingFollow != null) {
            throw new FollowAlreadyExistsException();
        }

        if (followerId.equals(followingId)) {
            throw new SameFollowException();
        }

        Follow follow = Follow.builder()
                .followerId(followerId)
                .followingId(followingId)
                .followerStatus(true)
                .followingStatus(true)
                .build();
        socialRepository.save(follow);
    }

    public void unfollowUser(Long followerId, Long followingId) {
        Follow follow = socialRepository.findByFollowerIdAndFollowingId(followerId, followingId);
        if (follow == null) {
            throw new FollowNotFoundException();
        }

        if (followerId.equals(followingId)) {
            throw new SameFollowException();
        }
        socialRepository.delete(follow);
    }
}
