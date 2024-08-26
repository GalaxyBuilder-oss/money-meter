package com.gb.moneymeter.repositories;

import com.gb.moneymeter.entities.UserData;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<UserData, Long> {
}
