package com.gb.moneymeter.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
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
public class UserData {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String gender;
    private String hashEmail;
    private String emailDomain;
    private String password;
    private LocalDate joinAt;
    private LocalDate lastUpdated;
    private List<LocalDate> lastLogin;
    private String color;

    @JsonIgnore
    @OneToMany(mappedBy = "userDataId")
    private List<Category> categoryList;

    @JsonIgnore
    @OneToMany(mappedBy = "userDataId")
    private List<TransactionData> transactionDataList;
}
