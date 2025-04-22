package com.expensetracker.ExpenseTracker.repository;

import com.expensetracker.ExpenseTracker.entity.Budget;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.time.LocalDate;
import java.util.List;

public interface BudgetRepository extends JpaRepository<Budget, Long> {
    List<Budget> findByCategory(String category);

    List<Budget> findByPeriod(String period);

    @Query("SELECT b FROM Budget b WHERE " +
            "(b.endDate IS NULL OR b.endDate >= :date) AND b.startDate <= :date")
    List<Budget> findActiveBudgets(LocalDate date);

    // If you implement user-specific budgets
    // List<Budget> findByUserId(Long userId);
}