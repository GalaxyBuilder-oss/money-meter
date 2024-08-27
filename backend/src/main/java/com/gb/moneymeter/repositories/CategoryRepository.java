package com.gb.moneymeter.repositories;

import com.gb.moneymeter.entities.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Long> {

    @Query("Select c from Category c join UserData u on c.userDataId.id = u.id where u.hashEmail = :hashEmail")
    List<Category> findCategoryByUserEmail(String hashEmail);
}
