package com.recipe.yorijori.global.exception;

public class AlreadyNicknameException extends YorijoriException {
    private static final String MESSAGE = "해당 닉네임 존재";

    public AlreadyNicknameException() {
        super(MESSAGE);
    }

    @Override
    public int getStatusCode() {
        return 502;
    }
}
