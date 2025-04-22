import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { ExpenseService } from '../../services/expense/expense.service';
import { NzMessageModule, NzMessageService } from 'ng-zorro-antd/message';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzI18nService } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzIconService } from 'ng-zorro-antd/icon'; // Add this import

import { BudgetService } from '../../services/budget/budget.service';
import { Router } from '@angular/router';
import { 
  MessageOutline, 
  DollarOutline, 
  ClockCircleOutline, 
  CommentOutline, 
  EditFill, 
  DeleteFill 
} from '@ant-design/icons-angular/icons';
import { NzMenuDirective } from 'ng-zorro-antd/menu';

const icons = [
  MessageOutline, 
  DollarOutline, 
  ClockCircleOutline, 
  CommentOutline, 
  EditFill, 
  DeleteFill
];


@Component({
  selector: 'app-budget',
  standalone:true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NzFormModule,
    NzInputModule,
    NzButtonModule,
    NzCardModule,
    NzSelectModule,
    NzDatePickerModule,
    NzIconModule,
    NzMessageModule
  ],
  templateUrl: './budget.component.html',
  styleUrls: ['./budget.component.scss']
})
export class BudgetComponent {
  budgetForm: FormGroup;
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
  budgets: any;
  

  constructor(
    private fb: FormBuilder,
    private budgetService: BudgetService,
    private i18n: NzI18nService,
    private iconService: NzIconService ,
    private router: Router,
    private message: NzMessageService,
  ) {
    this.i18n.setLocale(en_US);
        // Register the icons
        this.iconService.addIcon(...icons);
  }

  ngOnInit(): void{
    this.getAllBudgets();
    this.budgetForm = this.fb.group({
      category: ['', Validators.required],
      amount: [0, [Validators.required, Validators.min(1)]],
      period: ['monthly', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required]
    });

  }

 
      submitForm(){
        this.budgetService.postBudget(this.budgetForm.value).subscribe(res=>{
          this.message.success("Budget added successfully",{nzDuration:5000});
          this.budgetForm.reset();          
        },
      error=>{
        this.message.error("Error while posting budget", {nzDuration:5000});
      });
  }

    getAllBudgets(){
      this.budgetService.getAllBudgets().subscribe(res=>{
        this.budgets = res;
        console.log(this.budgets);
      });
    }

    updateBudget(id:number){
      this.router.navigateByUrl(`/budgets/${id}/edit`);
    }

    deleteBudget(id:number){
      this.budgetService.deleteBudget(id).subscribe(res=>{
        this.message.success("Budget deleted successfully", { nzDuration: 5000});
        this.getAllBudgets();
      }, error=>{
        this.message.error("Error while deleting budget", {nzDuration: 5000});
      })
    }

}
