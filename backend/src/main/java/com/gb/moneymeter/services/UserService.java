package com.gb.moneymeter.services;

import com.gb.moneymeter.dto.LoginRequestDto;
import com.gb.moneymeter.dto.LoginResponseDto;
import com.gb.moneymeter.dto.user.UserRequestDto;
import com.gb.moneymeter.dto.user.UserResponseDto;

public interface UserService {
    UserResponseDto register(UserRequestDto dto);
    UserResponseDto update(Long id, UserRequestDto dto);
    void delete(Long id);
    LoginResponseDto login(LoginRequestDto dto);
}
