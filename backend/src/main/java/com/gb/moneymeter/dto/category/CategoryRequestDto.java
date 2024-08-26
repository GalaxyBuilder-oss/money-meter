package com.gb.moneymeter.dto.category;

import lombok.Data;

@Data
public class CategoryRequestDto {

    private String name;
    private String description;
    private Long userId;
}
