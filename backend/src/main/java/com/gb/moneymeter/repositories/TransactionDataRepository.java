package com.gb.moneymeter.repositories;

import com.gb.moneymeter.entities.TransactionData;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TransactionDataRepository extends JpaRepository<TransactionData, Long> {
}
