package com.recipe.yorijori.global.exception;

public class Unauthorized extends YorijoriException {
    private static final String MESSAGE = "리프레시 토큰이 없거나 유효하지 않습니다.";

    public Unauthorized() {
        super(MESSAGE);
    }

    @Override
    public int getStatusCode() {
        return 401;
    }
}
