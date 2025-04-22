package com.expensetracker.ExpenseTracker.dto;
//Data Transfer objects - for transfer of data between layers
import lombok.Data;

import java.time.LocalDate;

@Data //used to generate getters and setters
public class ExpenseDTO {
    private Long id;

    private String title;

    private String description;

    private String category;

    private LocalDate date;

    private Integer amount;




}
