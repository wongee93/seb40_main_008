package main008.BED.exception;

import lombok.Getter;


public enum ExceptionCode {
    USER_NOT_FOUND(404, "User not found"),
    USER_EXISTS(409, "User(Email) exists"),
    BAD_PRICE(400, "1,000원 단위로 입력해주세요."),
    OVER_PRICE(400, "50,000원 이하로 입력해주세요."),
    UNAUTHORIZED(401, "본 사용자는 해당 기능에 대해 권한이 없습니다."),

    /*Review*/
    BAD_STAR_RATE(400, "별점은 1~5 사이의 정수 값을 입력해주세요."),

    /*Contents*/
    CONTENTS_NOT_FOUND(404, "Contents Not Found"),

    /*Chapter*/
    CHAPTER_NOT_FOUND(404, "Chapter Not Found"),

    /*UploadClass*/
    UPLOAD_CLASS_NOT_FOUND(404, "UploadClass Not Found")
    ;


    @Getter
    private final int statusCode;

    @Getter
    private final String message;

    ExceptionCode(int statusCode, String message) {
        this.statusCode = statusCode;
        this.message = message;
    }
}
