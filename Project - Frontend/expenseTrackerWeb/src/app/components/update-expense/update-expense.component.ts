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
import { ActivatedRoute, Route, Router } from '@angular/router';

const icons = [
  MessageOutline, 
  DollarOutline, 
  ClockCircleOutline, 
  CommentOutline, 
  EditFill, 
  DeleteFill
];
@Component({
  selector: 'app-update-expense',
  imports: [CommonModule,
    ReactiveFormsModule,
    NzFormModule,
    NzInputModule,
    NzButtonModule,
    NzCardModule,
    NzSelectModule,
    NzDatePickerModule,
    NzIconModule ],
  templateUrl: './update-expense.component.html',
  styleUrl: './update-expense.component.scss'
})
export class UpdateExpenseComponent {
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
  id!:number;


  constructor(
    private fb: FormBuilder,
    private expenseService: ExpenseService,
    private message: NzMessageService,
    private i18n: NzI18nService,
    private iconService: NzIconService ,
    private router: Router,
    private activatedRoute: ActivatedRoute

  ) {
    this.i18n.setLocale(en_US);
    // Register the icons
    this.iconService.addIcon(...icons);
  }

  ngOnInit() {
    this.id = Number(this.activatedRoute.snapshot.params['id'])
    this.expenseForm = this.fb.group({
      title: [null, Validators.required],
      amount: [null, Validators.required],
      date: [null, Validators.required],
      category: [null, Validators.required],
      description: [null, Validators.required]
    });
    this.getExpenseById();
  }

  
  getExpenseById(){
    this.expenseService.getExpenseById(this.id).subscribe(res=>{
      res.date = new Date(res.date);
      this.expenseForm.patchValue(res);
    },
    error=>{
      this.message.error("Something went wrong.", {nzDuration: 5000});
    })
  }


  submitForm(){
    this.expenseService.updateExpense(this.id, this.expenseForm.value).subscribe(res=>{
      this.message.success("Expense updated successfully", {nzDuration: 5000});
      this.router.navigateByUrl("/expense");
    }, error=>{
      this.message.error("Error while updating expense", {nzDuration: 5000});
    })

  }

}
