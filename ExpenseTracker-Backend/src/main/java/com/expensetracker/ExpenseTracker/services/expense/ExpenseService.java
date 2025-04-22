package com.expensetracker.ExpenseTracker.services.expense;

import com.expensetracker.ExpenseTracker.dto.ExpenseDTO;
import com.expensetracker.ExpenseTracker.entity.Expense;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface ExpenseService {
    Expense postExpense(ExpenseDTO expenseDTO);
    List<Expense> getAllExpenses();
    Expense getExpenseById(Long id);
    Expense updateExpense(Long id, ExpenseDTO expenseDTO);
    void deleteExpense(Long id);
}
