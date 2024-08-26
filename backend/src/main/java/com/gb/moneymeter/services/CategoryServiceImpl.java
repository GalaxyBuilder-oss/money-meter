package com.gb.moneymeter.services;

import com.gb.moneymeter.dto.category.CategoryRequestDto;
import com.gb.moneymeter.dto.category.CategoryResponseDto;
import com.gb.moneymeter.entities.Category;
import com.gb.moneymeter.entities.UserData;
import com.gb.moneymeter.repositories.CategoryRepository;
import com.gb.moneymeter.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDate;
import java.util.List;

@Service
public class CategoryServiceImpl implements CategoryService {

    @Autowired
    private CategoryRepository repository;

    @Autowired
    private UserRepository userRepository;

    @Override
    public List<CategoryResponseDto> getAll() {
        try {

            return repository.findAll().stream().map(this::modelToDto).toList();
        } catch (Error e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Error In System");
        }
    }

    private CategoryResponseDto modelToDto(Category category) {

        return new CategoryResponseDto(category.getId(), category.getName(), category.getDescription(), category.getCreatedAt(), category.getUpdatedAt());
    }


    @Override
    public CategoryResponseDto add(CategoryRequestDto dto) {
        try {
            UserData userData = userRepository.findById(dto.getUserId()).orElse(null);
            if (userData == null) throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "User Not Found");
            Category model = repository.save(new Category(null, dto.getName(), dto.getDescription(), LocalDate.now(), LocalDate.now(), null, userData));
            userData.setCategoryList(repository.findAll().stream().filter(category -> category.getUserDataId().equals(userData)).toList());
            return new CategoryResponseDto(model.getId(), model.getName(), model.getDescription(), model.getCreatedAt(), model.getUpdatedAt());
        } catch (Error e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Error Adding Category");
        }
    }

    @Override
    public CategoryResponseDto update(Long id, CategoryRequestDto dto) {
        try {
            Category model = repository.findById(id).orElse(null);
            if (model == null) throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Category Not Found");

            model.setName(dto.getName());
            model.setDescription(dto.getDescription());
            model.setUpdatedAt(LocalDate.now());
            Category temp = repository.save(model);
            return new CategoryResponseDto(temp.getId(), temp.getName(), temp.getDescription(), temp.getCreatedAt(), temp.getUpdatedAt());
        } catch (Error e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Error Update Category");
        }
    }

    @Override
    public void delete(Long id) {
        try {
            repository.deleteById(id);
        } catch (Error e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Id Not Found");
        }
    }
}
