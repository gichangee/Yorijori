package com.recipe.yorijori.global.exception;

public class AlreadyEmailException extends YorijoriException {
    private static final String MESSAGE = "해당 이메일 존재";

    public AlreadyEmailException() {
        super(MESSAGE);
    }

    @Override
    public int getStatusCode() {
        return 502;
    }
}
