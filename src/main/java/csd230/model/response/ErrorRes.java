package csd230.model.response;

import org.springframework.http.HttpStatus;

public class ErrorRes {
    private HttpStatus httpStatus;
    private String message;

    public ErrorRes(HttpStatus httpStatus, String message) {
        this.httpStatus = httpStatus;
        this.message = message;
    }

    public HttpStatus getHttpStatus() {
        return httpStatus;
    }

    public String getMessage() {
        return message;
    }
}