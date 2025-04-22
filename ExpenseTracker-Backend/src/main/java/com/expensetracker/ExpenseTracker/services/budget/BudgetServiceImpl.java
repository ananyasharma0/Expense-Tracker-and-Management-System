package com.expensetracker.ExpenseTracker.services.budget;

import com.expensetracker.ExpenseTracker.dto.BudgetDTO;
import com.expensetracker.ExpenseTracker.entity.Budget;
import com.expensetracker.ExpenseTracker.repository.BudgetRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class BudgetServiceImpl implements BudgetService {

    private final BudgetRepository budgetRepository;

    @Override
    public BudgetDTO createBudget(BudgetDTO budgetDTO) {
        Budget budget = new Budget();
        mapDTOToEntity(budgetDTO, budget);
        Budget savedBudget = budgetRepository.save(budget);
        return savedBudget.getBudgetDTO();
    }

    @Override
    public List<BudgetDTO> getAllBudgets() {
        return budgetRepository.findAll().stream()
                .map(Budget::getBudgetDTO)
                .collect(Collectors.toList());
    }

    @Override
    public BudgetDTO getBudgetById(Long id) {
        Budget budget = budgetRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Budget not found"));
        return budget.getBudgetDTO();
    }

    @Override
    public BudgetDTO updateBudget(Long id, BudgetDTO budgetDTO) {
        Budget budget = budgetRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Budget not found"));
        mapDTOToEntity(budgetDTO, budget);
        Budget updatedBudget = budgetRepository.save(budget);
        return updatedBudget.getBudgetDTO();
    }

    @Override
    public void deleteBudget(Long id) {
        budgetRepository.deleteById(id);
    }

    private void mapDTOToEntity(BudgetDTO dto, Budget entity) {
        entity.setCategory(dto.getCategory());
        entity.setAmount(dto.getAmount());
        entity.setPeriod(dto.getPeriod());
        entity.setStartDate(dto.getStartDate());
        entity.setEndDate(dto.getEndDate());
    }
}