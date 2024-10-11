package com.recipe.yorijori.global.exception;

public class NoAllergyException extends YorijoriException {
    private static final String MESSAGE = "해당 알러지를 찾을 수 없습니다.";

    public NoAllergyException() {
        super(MESSAGE);
    }

    @Override
    public int getStatusCode() {
        return 502;
    }
}
