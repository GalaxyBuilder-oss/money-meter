package com.gb.moneymeter.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@AllArgsConstructor
public class GeneralResponses<T> {

    private boolean ok;
    private String responseMessage;
    private T data;

    public static <T> GeneralResponses<T> empty() {
        return success(null, "");
    }

    public static <T> GeneralResponses<T> success(T data, String responseMessage) {

        return GeneralResponses.<T>builder().responseMessage(responseMessage).data(data).ok(true).build();
    }

    public static <T> GeneralResponses<T> error(String responseMessage) {

        return GeneralResponses.<T>builder().responseMessage(responseMessage).ok(false).build();
    }
}
