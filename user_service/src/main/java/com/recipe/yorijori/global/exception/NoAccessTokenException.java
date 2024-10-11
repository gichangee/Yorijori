package com.recipe.yorijori.global.exception;

public class NoAccessTokenException extends YorijoriException {
    private static final String MESSAGE = "AccessToken이 존재하지 않습니다.";

    public NoAccessTokenException() {
        super(MESSAGE);
    }

    @Override
    public int getStatusCode() {
        return 401;
    }
}
