package com.expensetracker.ExpenseTracker.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BudgetStatsDTO {
    private Double budgetAmount;
    private Double currentSpending;
    private Double remainingAmount;
    private Double percentageUsed;
    private Boolean exceeded;



    public static BudgetStatsDTO build(
            Double budgetAmount,
            Double currentSpending,
            Double remainingAmount,
            Double percentageUsed,
            Boolean exceeded
    ) {
        return new BudgetStatsDTO(budgetAmount, currentSpending, remainingAmount, percentageUsed, exceeded);
    }
}
