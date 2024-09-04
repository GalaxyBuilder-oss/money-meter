package com.gb.moneymeter.controllers;

import com.gb.moneymeter.constants.MessagesConstant;
import com.gb.moneymeter.dto.GeneralResponses;
import com.gb.moneymeter.dto.category.CategoryRequestDto;
import com.gb.moneymeter.services.CategoryService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

@Tag(name = "Category")
@Slf4j
@CrossOrigin(origins = {"http://localhost:5173","http://money-meter.vercel.app", "https://money-meter.vercel.app"})
@RestController
@RequestMapping("/api/category")
public class CategoryController {

    @Autowired
    private CategoryService service;

    @SecurityRequirement(name = "Bearer Authentication")
    @GetMapping()
    public ResponseEntity<Object> getAll() {

        try {

            return ResponseEntity.ok().body(GeneralResponses.success(service.getAll(), MessagesConstant.SUCCESS));
        } catch (ResponseStatusException e) {

            return ResponseEntity.badRequest().body(GeneralResponses.error(e.getMessage()));
        } catch (Error e) {
            log.error(e.getMessage());
            return ResponseEntity.internalServerError().body(GeneralResponses.error(MessagesConstant.INTERNAL_ERROR));
        }
    }
    @SecurityRequirement(name = "Bearer Authentication")
    @GetMapping("/by-email")
    public ResponseEntity<Object> getAllByUserEmail(@RequestParam String email) {

        try {

            return ResponseEntity.ok().body(GeneralResponses.success(service.getAllByUserEmail(email), MessagesConstant.SUCCESS));
        } catch (ResponseStatusException e) {

            return ResponseEntity.badRequest().body(GeneralResponses.error(e.getMessage()));
        } catch (Error e) {
            log.error(e.getMessage());
            return ResponseEntity.internalServerError().body(GeneralResponses.error(MessagesConstant.INTERNAL_ERROR));
        }
    }

    @SecurityRequirement(name = "Bearer Authentication")
    @PostMapping()
    public ResponseEntity<Object> add(@RequestBody CategoryRequestDto dto) {

        try {

            return ResponseEntity.ok().body(GeneralResponses.success(service.add(dto), MessagesConstant.SUCCESS));
        } catch (ResponseStatusException e) {

            return ResponseEntity.badRequest().body(GeneralResponses.error(e.getMessage()));
        } catch (Error e) {
            log.error(e.getMessage());
            return ResponseEntity.internalServerError().body(GeneralResponses.error(MessagesConstant.INTERNAL_ERROR));
        }
    }

    @SecurityRequirement(name = "Bearer Authentication")
    @PutMapping("/{id}")
    public ResponseEntity<Object> update(@PathVariable Long id, @RequestBody CategoryRequestDto dto) {

        try {

            return ResponseEntity.ok().body(GeneralResponses.success(service.update(id, dto), MessagesConstant.SUCCESS));
        } catch (ResponseStatusException e) {

            return ResponseEntity.badRequest().body(GeneralResponses.error(e.getMessage()));
        } catch (Error e) {
            log.error(e.getMessage());
            return ResponseEntity.internalServerError().body(GeneralResponses.error(MessagesConstant.INTERNAL_ERROR));
        }
    }

    @SecurityRequirement(name = "Bearer Authentication")
    @DeleteMapping("/{id}")
    public ResponseEntity<Object> delete(@PathVariable Long id) {

        try {
            service.delete(id);
            return ResponseEntity.ok().body(GeneralResponses.success(null, MessagesConstant.SUCCESS));
        } catch (ResponseStatusException e) {

            return ResponseEntity.badRequest().body(GeneralResponses.error(e.getMessage()));
        } catch (Error e) {
            log.error(e.getMessage());
            return ResponseEntity.internalServerError().body(GeneralResponses.error(MessagesConstant.INTERNAL_ERROR));
        }
    }
}
