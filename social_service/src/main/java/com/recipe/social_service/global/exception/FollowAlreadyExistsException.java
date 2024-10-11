package com.recipe.social_service.global.exception;

public class FollowAlreadyExistsException extends YorijoriException {
    private static final String MESSAGE = "이미 팔로우 함";

    public FollowAlreadyExistsException() {
        super(MESSAGE);
    }

    @Override
    public int getStatusCode() {
        return 502;
    }
}
