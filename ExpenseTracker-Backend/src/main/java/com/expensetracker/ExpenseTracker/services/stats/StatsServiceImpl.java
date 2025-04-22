package com.expensetracker.ExpenseTracker.services.stats;

import com.expensetracker.ExpenseTracker.dto.*;
import com.expensetracker.ExpenseTracker.entity.*;
import com.expensetracker.ExpenseTracker.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class StatsServiceImpl implements StatsService {

    private final IncomeRepository incomeRepository;
    private final ExpenseRepository expenseRepository;
    private final BudgetRepository budgetRepository;

    @Override
    public GraphDTO getChartData() {
        LocalDate endDate = LocalDate.now();
        LocalDate startDate = endDate.minusDays(27);

        return new GraphDTO(
                expenseRepository.findByDateBetween(startDate, endDate),
                incomeRepository.findByDateBetween(startDate, endDate)
        );
    }

    @Override
    public StatsDTO getStats() {
        StatsDTO stats = new StatsDTO();

        // Core financial stats
        calculateCoreStats(stats);

        // Budget utilization
        if (!budgetRepository.findAll().isEmpty()) {
            stats.setBudgetStats(calculateBudgetStats());
        }

        return stats;
    }

    private void calculateCoreStats(StatsDTO stats) {
        // Income/Expense totals
        Double totalIncome = incomeRepository.sumAllAmounts();
        Double totalExpense = expenseRepository.sumAllAmounts();
        stats.setIncome(totalIncome);
        stats.setExpense(totalExpense);
        stats.setBalance(totalIncome - totalExpense);

        // Latest transactions
        incomeRepository.findFirstByOrderByDateDesc().ifPresent(stats::setLatestIncome);
        expenseRepository.findFirstByOrderByDateDesc().ifPresent(stats::setLatestExpense);

        // Min/Max values
        calculateMinMaxStats(stats);
    }

    private void calculateMinMaxStats(StatsDTO stats) {
        stats.setMinIncome(incomeRepository.findMinAmount().orElse(0.0));
        stats.setMaxIncome(incomeRepository.findMaxAmount().orElse(0.0));
        stats.setMinExpense(expenseRepository.findMinAmount().orElse(0.0));
        stats.setMaxExpense(expenseRepository.findMaxAmount().orElse(0.0));
    }

    private Map<String, BudgetStatsDTO> calculateBudgetStats() {
        LocalDate now = LocalDate.now();

        return budgetRepository.findAll().stream()
                .filter(budget -> isActive(budget, now))
                .collect(Collectors.toMap(
                        Budget::getCategory,
                        this::calculateBudgetUtilization
                ));
    }

    private boolean isActive(Budget budget, LocalDate date) {
        return !date.isBefore(budget.getStartDate()) &&
                (budget.getEndDate() == null || !date.isAfter(budget.getEndDate()));
    }

    private BudgetStatsDTO calculateBudgetUtilization(Budget budget) {
        Double spending = expenseRepository.sumAmountByCategoryAndDateRange(
                budget.getCategory(),
                budget.getStartDate(),
                Optional.ofNullable(budget.getEndDate()).orElse(LocalDate.now())
        );

        // Define actualSpending here
        Double actualSpending = spending != null ? spending : 0.0;

        return new BudgetStatsDTO(
                budget.getAmount(),
                actualSpending,
                budget.getAmount() - actualSpending,
                (actualSpending / budget.getAmount()) * 100,
                actualSpending > budget.getAmount()
        );
    }

}