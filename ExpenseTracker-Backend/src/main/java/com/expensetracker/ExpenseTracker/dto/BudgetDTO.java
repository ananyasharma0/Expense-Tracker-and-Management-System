package com.expensetracker.ExpenseTracker.dto;

import lombok.Data;
import java.time.LocalDate;

@Data
public class BudgetDTO {
    private Long id;
    private String category;
    private Double amount;
    private String period;
    private LocalDate startDate;
    private LocalDate endDate;
    // Additional calculated fields for UI

}