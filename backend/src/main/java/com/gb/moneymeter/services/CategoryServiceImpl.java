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
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Something Error");
        }
    }

    @Override
    public List<CategoryResponseDto> getAllByUserEmail(String email) {
        try {

            return repository.findCategoryByUserEmail(email).stream().map(this::modelToDto).toList();
        } catch (Error e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Something Error");
        }
    }

    private CategoryResponseDto modelToDto(Category category) {

        return new CategoryResponseDto(category.getId(), category.getName(), category.getDescription(), category.getCreatedAt(), category.getUpdatedAt());
    }


    @Override
    public CategoryResponseDto add(CategoryRequestDto dto) {
        try {

            if (repository.findAll().stream().anyMatch(category -> category.getName().equalsIgnoreCase(dto.getName()) && category.getUserDataId().getId().equals(dto.getUserId())))
                throw new ResponseStatusException(HttpStatus.CONFLICT, "Category Is Exist, Please Change It");
            UserData userData = userRepository.findById(dto.getUserId()).orElse(null);
            if (userData == null) throw new ResponseStatusException(HttpStatus.NOT_FOUND, "User Not Found");
            if (dto.getName().isEmpty() || dto.getName().isBlank())
                throw new ResponseStatusException(HttpStatus.NOT_ACCEPTABLE, "Name Must Be Included");

            Category model = repository.save(new Category(null, dto.getName(), dto.getDescription(), LocalDate.now(), null, null, userData));
            return new CategoryResponseDto(model.getId(), model.getName(), model.getDescription(), model.getCreatedAt(), model.getUpdatedAt());
        } catch (Error e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Error Adding Category");
        }
    }

    @Override
    public CategoryResponseDto update(Long id, CategoryRequestDto dto) {
        try {
            Category model = repository.findById(id).orElse(null);
            if (model == null) throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Category Not Found");
            if (dto.getName().isBlank() || dto.getName().isEmpty())
                throw new ResponseStatusException(HttpStatus.NOT_ACCEPTABLE, "Name Cannot Empty");

            model.setName(dto.getName());
            if (!dto.getDescription().isBlank() || !dto.getDescription().isEmpty())
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
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Something Error");
        }
    }
}
