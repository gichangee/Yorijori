package com.recipe.yorijori.global.exception;

public class UserNotFoundException extends YorijoriException {
    private static final String MESSAGE = "해당 ID를 가진 유저를 찾을 수 없습니다.";

    public UserNotFoundException() {
        super(MESSAGE);
    }

    @Override
    public int getStatusCode() {
        return 502;
    }
}
