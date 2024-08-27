package com.gb.moneymeter.services;

import com.gb.moneymeter.constants.TransactionType;
import com.gb.moneymeter.dto.transaction.TransactionDataRequestDto;
import com.gb.moneymeter.dto.transaction.TransactionDataResponseDto;
import com.gb.moneymeter.entities.TransactionData;
import com.gb.moneymeter.entities.UserData;
import com.gb.moneymeter.repositories.CategoryRepository;
import com.gb.moneymeter.repositories.TransactionDataRepository;
import com.gb.moneymeter.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class TransactionDataServiceImpl implements TransactionDataService {

    @Autowired
    private TransactionDataRepository transactionRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private UserRepository userRepository;

    @Override
    public List<TransactionDataResponseDto> getAll() {
        try {

            return transactionRepository.findAll().stream().map(this::modelToDto).toList();
        } catch (Error e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage());
        }
    }

    @Override
    public List<TransactionDataResponseDto> getAllByUserEmail(String email) {
        try {

            return transactionRepository.getTransactionByUserEmail(email).stream().map(this::modelToDto).toList();
        } catch (Error e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage());
        }
    }

    private TransactionDataResponseDto modelToDto(TransactionData transactionData) {
        return new TransactionDataResponseDto(transactionData.getId(), transactionData.getTransactionValue(), transactionData.getUserDataId(), transactionData.getDescription(), transactionData.getDate(), transactionData.getTransactionType(), transactionData.getIdCategory());
    }

    @Override
    public TransactionDataResponseDto add(TransactionDataRequestDto dto) {
        try {
            TransactionData model = new TransactionData();
            UserData userData = userRepository.findById(dto.getIdUser()).orElse(null);
            if (userData == null) throw new ResponseStatusException(HttpStatus.NOT_FOUND, "User Not Found");
            Long balance = userData.getBalance();
            if (dto.getTransactionType().equalsIgnoreCase(TransactionType.DEBIT)) {
                balance += dto.getTransactionValue();
            } else if (dto.getTransactionType().equalsIgnoreCase(TransactionType.CREDIT)) {
                balance -= dto.getTransactionValue();
            } else throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Transaction Type Invalid");
            userData.setBalance(balance);
            model.setUserDataId(userData);
            model.setTransactionValue(dto.getTransactionValue());
            model.setDescription(dto.getDescription());
            model.setDate(dto.getDate());
            model.setTransactionType(dto.getTransactionType());
            return modelToDto(transactionRepository.save(model));
        } catch (Error e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Something Error");
        }
    }

    @Override
    public TransactionDataResponseDto update(Long id, TransactionDataRequestDto dto) {
        TransactionData model = transactionRepository.findById(id).orElse(null);
        try {
            if (model == null) throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Transaction Not Found");
            model.setDescription(dto.getDescription());
            model.setDate(dto.getDate());
            return modelToDto(transactionRepository.save(model));
        } catch (Error e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Something Error");
        }
    }

    @Override
    public void delete(Long id) {
        try {
            transactionRepository.deleteById(id);
        } catch (Error e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Transaction Not Found");
        }
    }
}
