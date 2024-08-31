package com.gb.moneymeter.dto.user;

import lombok.Data;

@Data
public class UserRequestDto {

    private String name;
    private String gender;
    private String email;
    private String password;
    private String color;
}
