package com.recipe.social_service.global.exception;


import lombok.Getter;

import java.util.HashMap;
import java.util.Map;

@Getter
public abstract class YorijoriException extends RuntimeException {

    private final Map<String, String> validation = new HashMap<String, String>();

    public YorijoriException(String message) {
        super(message);
    }

    public YorijoriException(String message, Throwable cause) {
        super(message, cause);
    }

    public abstract int getStatusCode();

    public void addValidation(String fieldName, String message) {
        validation.put(fieldName, message);
    }

}
