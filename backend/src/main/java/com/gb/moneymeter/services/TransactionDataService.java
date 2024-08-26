package com.gb.moneymeter.services;

import com.gb.moneymeter.dto.transaction.TransactionDataRequestDto;
import com.gb.moneymeter.dto.transaction.TransactionDataResponseDto;

import java.util.List;

public interface TransactionDataService {

    List<TransactionDataResponseDto> getAll();
    TransactionDataResponseDto add(TransactionDataRequestDto dto);
    TransactionDataResponseDto update(Long id, TransactionDataRequestDto dto);
    void delete(Long id);
}
