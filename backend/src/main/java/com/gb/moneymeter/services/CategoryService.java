package com.gb.moneymeter.services;

import com.gb.moneymeter.dto.category.CategoryRequestDto;
import com.gb.moneymeter.dto.category.CategoryResponseDto;

import java.util.List;

public interface CategoryService {

    List<CategoryResponseDto> getAll();
    List<CategoryResponseDto> getAllByUserEmail(String email);
    CategoryResponseDto add(CategoryRequestDto dto);
    CategoryResponseDto update(Long id, CategoryRequestDto dto);
    void delete(Long id);
}
