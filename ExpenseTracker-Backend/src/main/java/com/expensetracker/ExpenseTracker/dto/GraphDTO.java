package com.expensetracker.ExpenseTracker.dto;

import com.expensetracker.ExpenseTracker.entity.Expense;
import com.expensetracker.ExpenseTracker.entity.Income;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public class GraphDTO {

    private List<Expense> expenseList;

    private List<Income> incomeList;

}
