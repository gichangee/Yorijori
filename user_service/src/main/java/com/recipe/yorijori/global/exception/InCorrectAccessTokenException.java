package com.recipe.yorijori.global.exception;

public class InCorrectAccessTokenException extends YorijoriException {
    private static final String MESSAGE = "유효하지 않은 AccessToken입니다.";

    public InCorrectAccessTokenException() {
        super(MESSAGE);
    }

    @Override
    public int getStatusCode() {
        return 502;
    }
}
