package com.expensetracker.ExpenseTracker.services.stats;

import com.expensetracker.ExpenseTracker.dto.GraphDTO;
import com.expensetracker.ExpenseTracker.dto.StatsDTO;

public interface StatsService {
    GraphDTO getChartData();
    StatsDTO getStats();
}
