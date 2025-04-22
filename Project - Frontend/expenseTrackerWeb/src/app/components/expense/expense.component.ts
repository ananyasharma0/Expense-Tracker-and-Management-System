import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { ExpenseService } from '../../services/expense/expense.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzI18nService } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzIconService } from 'ng-zorro-antd/icon'; // Add this import

import { 
  MessageOutline, 
  DollarOutline, 
  ClockCircleOutline, 
  CommentOutline, 
  EditFill, 
  DeleteFill 
} from '@ant-design/icons-angular/icons';
import { Route, Router } from '@angular/router';

const icons = [
  MessageOutline, 
  DollarOutline, 
  ClockCircleOutline, 
  CommentOutline, 
  EditFill, 
  DeleteFill
];

@Component({
  selector: 'app-expense',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NzFormModule,
    NzInputModule,
    NzButtonModule,
    NzCardModule,
    NzSelectModule,
    NzDatePickerModule,
    NzIconModule 
  ],
  templateUrl: './expense.component.html',
  styleUrls: ['./expense.component.scss']
})
export class ExpenseComponent {
  expenseForm!: FormGroup;
  listOfCategory: any[] = [
    "Education",
    "Groceries",
    "Health",
    "Subscriptions",
    "Takeaways",
    "Clothing",
    "Travelling",
    "Other"
  ];

  expenses:any; //variable to store expenses(All expenses)

  constructor(
    private fb: FormBuilder,
    private expenseService: ExpenseService,
    private message: NzMessageService,
    private i18n: NzI18nService,
    private iconService: NzIconService ,
    private router: Router
  ) {
    this.i18n.setLocale(en_US);
    // Register the icons
    this.iconService.addIcon(...icons);
  }

  ngOnInit(): void {
    this.getAllExpenses();
    this.expenseForm = this.fb.group({
      title: [null, Validators.required],
      amount: [null, Validators.required],
      date: [null, Validators.required],
      category: [null, Validators.required],
      description: [null, Validators.required]
    });
  }

  // method to call apis
  submitForm(){
    this.expenseService.postExpense(this.expenseForm.value).subscribe(res=>{
      this.message.success("Expense posted successfully", {nzDuration: 5000});
      this.getAllExpenses(); // Refresh the expense list
      this.expenseForm.reset(); // Reset the form after submission
    }, error=>{
      this.message.error("Error while posting expense", { nzDuration: 5000});
    });
  }

  getAllExpenses(){
    this.expenseService.getAllExpenses().subscribe(res=>{
      this.expenses = res;
      console.log(this.expenses);
    });
  }

  updateExpense(id:number){
    this.router.navigateByUrl(`/expense/${id}/edit`);
  }

  deleteExpense(id:number){
    this.expenseService.deleteExpense(id).subscribe(res=>{
      this.message.success("Expense deleted successfully", { nzDuration: 5000});
      this.getAllExpenses();
    }, error=>{
      this.message.error("Error while deleting expense", {nzDuration: 5000});
    })
  }
}