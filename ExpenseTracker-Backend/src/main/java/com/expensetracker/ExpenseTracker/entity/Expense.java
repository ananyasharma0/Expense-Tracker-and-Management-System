package com.expensetracker.ExpenseTracker.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Data;
import jakarta.persistence.GenerationType;


import jakarta.persistence.GeneratedValue;

import java.time.LocalDate;

@Entity
@Data

public class Expense {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String description;
    private String category;
    private LocalDate date;
    private Integer amount;
}
