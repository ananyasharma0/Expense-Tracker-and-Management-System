package com.expensetracker.ExpenseTracker.controller;

import com.expensetracker.ExpenseTracker.dto.IncomeDTO;
import com.expensetracker.ExpenseTracker.entity.Income;
import com.expensetracker.ExpenseTracker.services.income.IncomeService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController //to create REST APIs
@RequestMapping("/api/income")
@RequiredArgsConstructor
@CrossOrigin("*")
public class IncomeController {

    private final IncomeService incomeService;
    @PostMapping
    public ResponseEntity<?> postIncome(@RequestBody IncomeDTO incomeDTO){
        Income createdIncome = incomeService.postIncome(incomeDTO);

        if(createdIncome != null){
            return ResponseEntity.status(HttpStatus.CREATED).body(createdIncome);
        }
        else{
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }

    @GetMapping("/all")
    public ResponseEntity<?> getAllIncomes(){
        return ResponseEntity.ok(incomeService.getAllIncomes());
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateIncome(@PathVariable Long id, @RequestBody IncomeDTO incomeDTO){
        try{
            return ResponseEntity.ok(incomeService.updateIncome(id, incomeDTO));
        }
        catch (EntityNotFoundException ex){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ex.getMessage());
        }
        catch(Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Something went wrong");
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getIncomeById(@PathVariable Long id){
        try{
            return ResponseEntity.ok(incomeService.getIncomeById(id));

        }
        catch (EntityNotFoundException ex){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ex.getMessage());
        }
        catch(Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Something went wrong");
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteIncome(@PathVariable Long id){
        try{
            incomeService.deleteIncome(id);
            return ResponseEntity.ok(null);

        }
        catch (EntityNotFoundException ex){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ex.getMessage());
        }
        catch(Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Something went wrong");
        }
    }

}
