package com.gb.moneymeter.dto.category;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CategoryResponseDto {
    private Long id;

    private String name;

    private String description;

    private LocalDate createdAt;

    private LocalDate updatedAt;
}
