package com.gb.moneymeter.dto.user;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserResponseDto {

    private Long id;
    private String name;
    private String gender;
    private String hashEmail;
    private String emailDomain;
    private String password;
    private LocalDate joinAt;
    private LocalDate lastUpdated;
    private List<LocalDate> lastLogin;
    private String color;
}
