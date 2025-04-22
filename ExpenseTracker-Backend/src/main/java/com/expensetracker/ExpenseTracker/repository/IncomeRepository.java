package com.expensetracker.ExpenseTracker.repository;


import com.expensetracker.ExpenseTracker.entity.Expense;
import com.expensetracker.ExpenseTracker.entity.Income;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface IncomeRepository extends JpaRepository<Income, Long> {

    List<Income> findByDateBetween(LocalDate startDate, LocalDate endDate);

//    method to calculate total income
    @Query("SELECT SUM(i.amount) FROM Income i")
    Double sumAllAmounts();

    Optional<Income> findFirstByOrderByDateDesc();

    @Query("SELECT MIN(amount) FROM Income")
    Optional<Double> findMinAmount();

    @Query("SELECT MAX(amount) FROM Income")
    Optional<Double> findMaxAmount();
}
