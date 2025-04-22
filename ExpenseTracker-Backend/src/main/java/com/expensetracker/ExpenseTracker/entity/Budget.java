package com.expensetracker.ExpenseTracker.entity;

import com.expensetracker.ExpenseTracker.dto.BudgetDTO;
import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;
import com.expensetracker.ExpenseTracker.dto.IncomeDTO;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;

import java.time.LocalDate;

@Entity
@Data
@Table(name = "budgets")
public class Budget {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String category;

    @Column(nullable = false)
    private Double amount;

    @Column(nullable = false)
    private String period; // "weekly", "monthly", "yearly"

    @Column(nullable = false)
    private LocalDate startDate;

    private LocalDate endDate;

    // Optional: Add user association if you have multi-user support
    // @ManyToOne
    // @JoinColumn(name = "user_id")
    // private User user;

    // Mapping method to convert Budget entity to BudgetDTO
    public BudgetDTO getBudgetDTO() {
        BudgetDTO budgetDTO = new BudgetDTO();

        budgetDTO.setId(id);
        budgetDTO.setCategory(category);
        budgetDTO.setAmount(amount);
        budgetDTO.setPeriod(period);
        budgetDTO.setStartDate(startDate);
        budgetDTO.setEndDate(endDate);

        return budgetDTO;
    }

    // Additional helper methods
    public boolean isActive() {
        LocalDate today = LocalDate.now();
        return (endDate == null || today.isBefore(endDate)) &&
                today.isAfter(startDate) || today.isEqual(startDate);
    }

    public boolean isExceeded(Double currentSpending) {
        return currentSpending != null && currentSpending >= amount;
    }
}