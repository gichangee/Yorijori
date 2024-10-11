package com.recipe.ingredient_service.global.exception;

public class AlreadyLikedException extends YorijoriException {
    private static final String MESSAGE = "이미 좋아요한 재료입니다";

    public AlreadyLikedException() {
        super(MESSAGE);
    }

    @Override
    public int getStatusCode() {
        return 502;
    }
}
