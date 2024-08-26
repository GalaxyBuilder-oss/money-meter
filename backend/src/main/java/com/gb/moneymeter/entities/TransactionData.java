package com.gb.moneymeter.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class TransactionData {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long transactionValue;

    @ManyToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private UserData userDataId;

    private String description;

    private LocalDate date;

    private String transactionType;

    @ManyToOne
    @JoinColumn(name = "category_id", referencedColumnName = "id")
    private Category idCategory;
}
