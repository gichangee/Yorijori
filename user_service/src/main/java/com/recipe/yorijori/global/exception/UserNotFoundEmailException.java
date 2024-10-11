package com.recipe.yorijori.global.exception;

public class UserNotFoundEmailException extends YorijoriException {
    private static final String MESSAGE = "해당 Email를 가진 유저를 찾을 수 없습니다.";

    public UserNotFoundEmailException() {
        super(MESSAGE);
    }

    @Override
    public int getStatusCode() {
        return 502;
    }
}
