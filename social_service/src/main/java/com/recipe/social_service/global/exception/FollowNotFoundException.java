package com.recipe.social_service.global.exception;

public class FollowNotFoundException extends YorijoriException {
    private static final String MESSAGE = "팔로우 관계가 없음";

    public FollowNotFoundException() {
        super(MESSAGE);
    }

    @Override
    public int getStatusCode() {
        return 502;
    }
}
