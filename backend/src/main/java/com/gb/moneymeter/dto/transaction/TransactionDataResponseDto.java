package com.gb.moneymeter.dto.transaction;

import com.gb.moneymeter.entities.Category;
import com.gb.moneymeter.entities.UserData;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TransactionDataResponseDto {

    private Long id;
    private Long transactionValue;
    private UserData userDataId;
    private String description;
    private LocalDate date;
    private String transactionType;
    private Category idCategory;
}
