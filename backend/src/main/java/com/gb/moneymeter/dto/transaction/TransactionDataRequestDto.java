package com.gb.moneymeter.dto.transaction;

import lombok.Data;

import java.time.LocalDate;

@Data
public class TransactionDataRequestDto {

    private Long transactionValue;
    private Long idUser;
    private String description;
    private LocalDate date;
    private String transactionType;
    private Long idCategory;
}
