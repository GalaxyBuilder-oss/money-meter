package com.gb.moneymeter.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Category {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String description;

    private LocalDate createdAt;

    private LocalDate updatedAt;

    @OneToMany(mappedBy = "idCategory")
    private List<TransactionData> transactionDataList;

    @ManyToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private UserData userDataId;
}
