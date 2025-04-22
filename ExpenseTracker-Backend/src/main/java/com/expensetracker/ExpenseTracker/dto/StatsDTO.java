package com.expensetracker.ExpenseTracker.dto;

import com.expensetracker.ExpenseTracker.entity.Expense;
import com.expensetracker.ExpenseTracker.entity.Income;
import lombok.Data;

import java.util.Map;

@Data
public class StatsDTO {

    private Double income;

    private Double expense;

    private Income latestIncome;
    private Expense latestExpense;

    private Double balance;

    private Double minIncome;

    private Double maxIncome;

    private Double minExpense;

    private Double maxExpense;

    private Map<String, BudgetStatsDTO> budgetStats;

}
