package com.gb.moneymeter.services;

import com.gb.moneymeter.utils.HashUtil;
import com.gb.moneymeter.dto.LoginRequestDto;
import com.gb.moneymeter.dto.LoginResponseDto;
import com.gb.moneymeter.dto.user.UserRequestDto;
import com.gb.moneymeter.dto.user.UserResponseDto;
import com.gb.moneymeter.entities.UserData;
import com.gb.moneymeter.repositories.UserRepository;
import com.gb.moneymeter.utils.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtil jwtUtil;

    @Override
    public UserResponseDto register(UserRequestDto dto) {
        if (userRepository.findAll().stream().anyMatch(data -> HashUtil.compareStringToHash(dto.getEmail(), data.getHashEmail())))
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Email Was Registered, Use Different Email For Register");
        try {

            UserData userData = new UserData(null, dto.getName(), dto.getGender(), dto.getBalance(), null, null, dto.getPassword(), null, null, null, null, null);
            userData.setJoinAt(LocalDate.now());
            userData.setHashEmail(HashUtil.hashString(dto.getEmail()));
            userData.setEmailDomain(emailConvert(dto.getEmail()));
            userData.setPassword(passwordEncoder.encode(dto.getPassword()));
            return modelToDto(userRepository.save(userData));
        } catch (Error e) {

            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Something error");
        }
    }

    private String emailConvert(String email) {
        return email.split("@")[0].substring(0, 3).concat("***@") + email.split("@")[1];
    }

    private UserResponseDto modelToDto(UserData model) {
        return new UserResponseDto(model.getId(), model.getName(), model.getGender(), model.getBalance(), model.getHashEmail(), model.getEmailDomain(), model.getPassword(), model.getJoinAt(), model.getLastUpdated(), model.getLastLogin());
    }

    @Override
    public UserResponseDto update(Long id, UserRequestDto dto) {
        UserData user = userRepository.findById(id).orElse(null);
        try {

            if (user == null) throw new ResponseStatusException(HttpStatus.NOT_FOUND, "User Not Found");
            if (!passwordEncoder.matches(dto.getPassword(), user.getPassword()))
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Password Incorrect");

            user.setName(dto.getName());
            user.setGender(dto.getGender());
            user.setBalance(dto.getBalance());
            user.setLastUpdated(LocalDate.now());
            return modelToDto(userRepository.save(user));
        } catch (Error e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Error In Our System");
        }
    }

    @Override
    public void delete(Long id) {
        try {

            userRepository.deleteById(id);
        } catch (Error e) {

            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Something Error");
        }
    }

    @Override
    public LoginResponseDto login(LoginRequestDto dto) {
        try {
            UserData userData = userRepository.findAll().stream().filter(user -> HashUtil.compareStringToHash(dto.getEmail(), user.getHashEmail()) && passwordEncoder.matches(dto.getPassword(), user.getPassword())).findAny().orElse(null);
            if (userData == null) throw new ResponseStatusException(HttpStatus.NOT_FOUND, "User Not Found");
            List<LocalDate> dates = userData.getLastLogin() == null ? new ArrayList<>() : userData.getLastLogin();
            if (dates.stream().noneMatch(date -> date.equals(LocalDate.now()))) {
                dates.add(LocalDate.now());
                userData.setLastLogin(dates);
                userRepository.save(userData);
            }
            return new LoginResponseDto(emailConvert(dto.getEmail()), jwtUtil.generateToken(userData));
        } catch (Error e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage());
        }
    }
}
