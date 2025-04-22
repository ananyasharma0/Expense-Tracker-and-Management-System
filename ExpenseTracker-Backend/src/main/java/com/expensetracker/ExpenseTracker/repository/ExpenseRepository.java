package com.expensetracker.ExpenseTracker.repository;

import com.expensetracker.ExpenseTracker.entity.Expense;
import com.expensetracker.ExpenseTracker.entity.Income;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface ExpenseRepository extends JpaRepository<Expense, Long> {
    List<Expense> findByDateBetween(LocalDate startDate, LocalDate endDate);

    @Query("SELECT SUM(e.amount) FROM Expense e")
    Double sumAllAmounts();

    Optional<Expense> findFirstByOrderByDateDesc();

    @Query("SELECT COALESCE(SUM(e.amount), 0.0) FROM Expense e WHERE " +
            "e.category = :category AND " +
            "e.date BETWEEN :startDate AND :endDate")
    Double sumAmountByCategoryAndDateRange(
            @Param("category") String category,
            @Param("startDate") LocalDate startDate,
            @Param("endDate") LocalDate endDate
    );

    @Query("SELECT MIN(e.amount) FROM Expense e")
    Optional<Double> findMinAmount();

    @Query("SELECT MAX(e.amount) FROM Expense e")
    Optional<Double> findMaxAmount();

    @Query("SELECT e.category, SUM(e.amount) FROM Expense e " +
            "WHERE e.date BETWEEN :startDate AND :endDate " +
            "GROUP BY e.category")
    List<Object[]> sumAmountsByCategoryForPeriod(
            @Param("startDate") LocalDate startDate,
            @Param("endDate") LocalDate endDate
    );

    @Query("SELECT e FROM Expense e WHERE e.category = :category " +
            "ORDER BY e.amount DESC LIMIT 1")
    Optional<Expense> findLargestExpenseInCategory(
            @Param("category") String category
    );

}
