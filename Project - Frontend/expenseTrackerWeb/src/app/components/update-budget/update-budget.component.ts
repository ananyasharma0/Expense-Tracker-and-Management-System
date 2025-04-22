import { Component , OnInit} from '@angular/core';
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
import { ActivatedRoute, Router } from '@angular/router';
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
  selector: 'app-update-budget',
  standalone:true,
  imports: [CommonModule,
    ReactiveFormsModule,
    NzFormModule,
    NzInputModule,
    NzButtonModule,
    NzCardModule,
    NzSelectModule,
    NzDatePickerModule,
    NzIconModule],
  templateUrl: './update-budget.component.html',
  styleUrl: './update-budget.component.scss'
})
export class UpdateBudgetComponent {
  id: number;
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

  constructor(
    private fb: FormBuilder,
    private expenseService: ExpenseService,
    private message: NzMessageService,
    private i18n: NzI18nService,
    private iconService: NzIconService ,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private budgetService: BudgetService

  ) {
    this.i18n.setLocale(en_US);
    // Register the icons
    this.iconService.addIcon(...icons);
  }

  ngOnInit(){
    this.id = Number(this.activatedRoute.snapshot.params['id'])
    this.budgetForm = this.fb.group({
      category: ['', Validators.required],
      amount: [0, [Validators.required, Validators.min(1)]],
      period: ['monthly', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required]
    });
    this.getBudgetById();

  }

  getBudgetById(){
    this.budgetService.getBudgetById(this.id).subscribe(res=>{
      res.date = new Date(res.date);
      this.budgetForm.patchValue(res);
    },
    error=>{
      this.message.error("Something went wrong.", {nzDuration: 5000});
    })
  }

  submitForm(){
    this.budgetService.updateBudget(this.id, this.budgetForm.value).subscribe(res=>{
      this.message.success("Budget updated successfully", {nzDuration: 5000});
      this.router.navigateByUrl("/budget");
    }, error=>{
      this.message.error("Error while updating budget", {nzDuration: 5000});
    })

  }




}
