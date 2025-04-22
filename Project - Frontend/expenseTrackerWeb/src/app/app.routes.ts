// app.routes.ts
import { Routes } from '@angular/router';
import { ExpenseComponent } from './components/expense/expense.component';
import { UpdateExpenseComponent } from './components/update-expense/update-expense.component';
import { IncomeComponent } from './components/income/income.component';
import { UpdateIncomeComponent } from './components/update-income/update-income.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { BudgetComponent } from './components/budget/budget.component';
import { UpdateBudgetComponent } from './components/update-budget/update-budget.component';



export const routes: Routes = [
//   { path: '', redirectTo: 'expense', pathMatch: 'full' }, // redirect root
  // {path: '', redirectTo:'income', pathMatch:'full'},


  { path: "expense", component: ExpenseComponent },
  { path: "income", component: IncomeComponent },
  {path: "expense/:id/edit", component: UpdateExpenseComponent},
  {path:"income/:id/edit", component:UpdateIncomeComponent},
  {path:"budget", component:BudgetComponent},
  {path:"budgets/:id/edit", component:UpdateBudgetComponent},
 {path:"", component:DashboardComponent}
  
];
