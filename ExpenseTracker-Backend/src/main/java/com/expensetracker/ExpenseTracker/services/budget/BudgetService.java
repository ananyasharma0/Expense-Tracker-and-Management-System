package com.expensetracker.ExpenseTracker.services.budget;

import com.expensetracker.ExpenseTracker.dto.BudgetDTO;
import java.util.List;

public interface BudgetService {
    BudgetDTO createBudget(BudgetDTO budgetDTO);
    List<BudgetDTO> getAllBudgets();
    BudgetDTO getBudgetById(Long id);
    BudgetDTO updateBudget(Long id, BudgetDTO budgetDTO);
    void deleteBudget(Long id);
}