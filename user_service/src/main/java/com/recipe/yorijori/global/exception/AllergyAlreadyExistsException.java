package com.recipe.yorijori.global.exception;

public class AllergyAlreadyExistsException extends YorijoriException {
    private static final String MESSAGE = "이미 해당 회원이 해당 알러지를 가지고 있습니다.";

    public AllergyAlreadyExistsException() {
        super(MESSAGE);
    }

    @Override
    public int getStatusCode() {
        return 502;
    }
}
