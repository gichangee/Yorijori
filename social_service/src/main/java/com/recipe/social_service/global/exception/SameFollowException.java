package com.recipe.social_service.global.exception;

public class SameFollowException extends YorijoriException {
    private static final String MESSAGE = "자기자신은 팔로우 불가";

    public SameFollowException() {
        super(MESSAGE);
    }

    @Override
    public int getStatusCode() {
        return 502;
    }
}
