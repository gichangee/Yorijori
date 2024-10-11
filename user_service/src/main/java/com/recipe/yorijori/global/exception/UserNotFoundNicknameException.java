package com.recipe.yorijori.global.exception;

public class UserNotFoundNicknameException extends YorijoriException {
    private static final String MESSAGE = "해당 닉네임를 가진 유저를 찾을 수 없습니다.";

    public UserNotFoundNicknameException() {
        super(MESSAGE);
    }

    @Override
    public int getStatusCode() {
        return 502;
    }
}
