package com.gb.moneymeter.repositories;

import com.gb.moneymeter.entities.TransactionData;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TransactionDataRepository extends JpaRepository<TransactionData, Long> {

    @Query("Select t from TransactionData t join UserData u on t.userDataId.id = u.id where u.hashEmail = :hashEmail")
    List<TransactionData> getTransactionByUserEmail(String hashEmail);
}
