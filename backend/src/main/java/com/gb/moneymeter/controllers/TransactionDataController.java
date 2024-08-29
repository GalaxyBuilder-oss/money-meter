package com.gb.moneymeter.controllers;

import com.gb.moneymeter.constants.MessagesConstant;
import com.gb.moneymeter.dto.GeneralResponses;
import com.gb.moneymeter.dto.transaction.TransactionDataRequestDto;
import com.gb.moneymeter.services.TransactionDataService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

@Tag(name = "Transaction")
@Slf4j
@CrossOrigin(origins = {"http://localhost:5173","http://money-meter.vercel.app"})
@RestController
@RequestMapping("/api/transaction")
public class TransactionDataController {

    @Autowired
    private TransactionDataService transactionDataService;

    @SecurityRequirement(name = "Bearer Authentication")
    @GetMapping()
    public ResponseEntity<Object> getAll() {

        try {

            return ResponseEntity.ok().body(GeneralResponses.success(transactionDataService.getAll(), MessagesConstant.SUCCESS));
        } catch (ResponseStatusException e) {

            return ResponseEntity.badRequest().body(GeneralResponses.error(e.getMessage()));
        } catch (Error e) {
            log.error(e.getMessage());
            return ResponseEntity.internalServerError().body(GeneralResponses.error(MessagesConstant.INTERNAL_ERROR));
        }
    }

    @SecurityRequirement(name = "Bearer Authentication")
    @GetMapping("/by-email")
    public ResponseEntity<Object> getAllByEmail(@RequestParam String email) {

        try {

            return ResponseEntity.ok().body(GeneralResponses.success(transactionDataService.getAll(), MessagesConstant.SUCCESS));
        } catch (ResponseStatusException e) {

            return ResponseEntity.badRequest().body(GeneralResponses.error(e.getMessage()));
        } catch (Error e) {
            log.error(e.getMessage());
            return ResponseEntity.internalServerError().body(GeneralResponses.error(MessagesConstant.INTERNAL_ERROR));
        }
    }

    @SecurityRequirement(name = "Bearer Authentication")
    @PostMapping()
    public ResponseEntity<Object> add(@RequestBody TransactionDataRequestDto dto) {

        try {

            return ResponseEntity.ok().body(GeneralResponses.success(transactionDataService.add(dto), "Success"));
        } catch (ResponseStatusException e) {

            return ResponseEntity.badRequest().body(GeneralResponses.error(e.getMessage()));
        } catch (Error e) {
            log.error(e.getMessage());
            return ResponseEntity.internalServerError().body(GeneralResponses.error(MessagesConstant.INTERNAL_ERROR));
        }
    }
}
