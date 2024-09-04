package com.gb.moneymeter.controllers;

import com.gb.moneymeter.constants.MessagesConstant;
import com.gb.moneymeter.dto.GeneralResponses;
import com.gb.moneymeter.dto.LoginRequestDto;
import com.gb.moneymeter.dto.user.UserRequestDto;
import com.gb.moneymeter.services.UserService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

@Tag(name = "Account")
@Slf4j
@CrossOrigin(origins = {"http://localhost:5173", "http://money-meter.vercel.app", "https://money-meter.vercel.app"})
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public ResponseEntity<Object> register(@RequestBody UserRequestDto dto) {

        try {

            return ResponseEntity.ok().body(GeneralResponses.success(userService.register(dto), MessagesConstant.SUCCESS));
        } catch (ResponseStatusException e) {

            return ResponseEntity.badRequest().body(GeneralResponses.error(e.getMessage()));
        } catch (Error e) {
            log.error(e.getMessage());
            return ResponseEntity.internalServerError().body(GeneralResponses.error(MessagesConstant.INTERNAL_ERROR));
        }
    }

    @SecurityRequirement(name = "Bearer Authentication")
    @GetMapping("/get-by-email")
    public ResponseEntity<Object> getByEmail(@RequestParam String email) {

        try {

            return ResponseEntity.ok().body(GeneralResponses.success(userService.getByEmail(email), MessagesConstant.SUCCESS));
        } catch (ResponseStatusException e) {

            return ResponseEntity.badRequest().body(GeneralResponses.error(e.getMessage()));
        } catch (Error e) {
            log.error(e.getMessage());
            return ResponseEntity.internalServerError().body(GeneralResponses.error(MessagesConstant.INTERNAL_ERROR));
        }
    }

    @SecurityRequirement(name = "Bearer Authentication")
    @PutMapping("/update/{id}")
    public ResponseEntity<Object> update(@PathVariable Long id, @RequestBody UserRequestDto dto) {
        try {

            return ResponseEntity.ok().body(GeneralResponses.success(userService.update(id, dto), MessagesConstant.SUCCESS));
        } catch (ResponseStatusException e) {

            return ResponseEntity.badRequest().body(GeneralResponses.error(e.getMessage()));
        } catch (Error e) {

            log.error(e.getMessage());
            return ResponseEntity.internalServerError().body(GeneralResponses.error(MessagesConstant.INTERNAL_ERROR));
        }
    }

    @SecurityRequirement(name = "Bearer Authentication")
    @PutMapping("/delete/{id}")
    public ResponseEntity<Object> delete(@PathVariable Long id) {
        try {
            userService.delete(id);
            return ResponseEntity.ok().body(GeneralResponses.success(null, MessagesConstant.SUCCESS));
        } catch (ResponseStatusException e) {

            return ResponseEntity.badRequest().body(GeneralResponses.error(e.getMessage()));
        } catch (Error e) {

            log.error(e.getMessage());
            return ResponseEntity.internalServerError().body(GeneralResponses.error(MessagesConstant.INTERNAL_ERROR));
        }
    }

    @PostMapping("/login")
    public ResponseEntity<Object> login(@RequestBody LoginRequestDto dto) {

        try {

            return ResponseEntity.ok().body(GeneralResponses.success(userService.login(dto), MessagesConstant.SUCCESS));
        } catch (ResponseStatusException e) {

            return ResponseEntity.badRequest().body(GeneralResponses.error(e.getMessage()));
        } catch (Error e) {
            log.error(e.getMessage());
            return ResponseEntity.internalServerError().body(GeneralResponses.error(MessagesConstant.INTERNAL_ERROR));
        }
    }


}
