import { Component, OnInit } from '@angular/core';
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
import { NzIconService } from 'ng-zorro-antd/icon';
import { Router, RouterModule } from '@angular/router';
import { IncomeService } from '../../services/income/income.service';

// Add this interface at the top of your file, before the @Component decorator


@Component({
  standalone: true,
  selector: 'app-income',
  imports: [CommonModule,
    ReactiveFormsModule,
    NzFormModule,
    RouterModule,
    NzInputModule,
    NzButtonModule,
    NzCardModule,
    NzSelectModule,
    NzDatePickerModule,
    NzIconModule],
  templateUrl: './income.component.html',
  styleUrl: './income.component.scss'
})
export class IncomeComponent implements OnInit {

  incomes: any;
  incomeForm!: FormGroup;
  listOfCategory: any[] = ["Salary", "Freelancing", "Investments", "Stocks",
    "Bitcoin", "Bank Transfer", "Youtube", "Other" ];

  constructor(private fb: FormBuilder,
    private message: NzMessageService,
    private router: Router,
    private i18n: NzI18nService,
    private iconService: NzIconService,
    private incomeService: IncomeService,
  ){ this.i18n.setLocale(en_US);
      // Register the icons
      }
      
    ngOnInit(){
    this.getAllIncomes();
    this.incomeForm = this.fb.group({
      title: [null, Validators.required],
      amount: [null, Validators.required],
      date: [null, Validators.required],
      category: [null, Validators.required],
      description: [null, Validators.required],
    });

  }


  submitForm(){
    this.incomeService.postIncome(this.incomeForm.value).subscribe(res=>{
      this.message.success("Income added successfully", {nzDuration: 5000});
      this.getAllIncomes();
    }, error=>{
      this.message.error("Error while posting income", {nzDuration:5000});
    } )
  }

  getAllIncomes(){
    this.incomeService.getAllIncomes().subscribe(res=>{
      this.incomes=res;
    }, error=>{
    this.message.error("Error fetching incomes",{nzDuration:5000});
   })
 }

  deleteIncome(id:number){
    this.incomeService.deleteIncome(id).subscribe(res=>{
      this.message.success("Income deleted successfully", {nzDuration: 500});
      this.getAllIncomes();
    },
    error=>{
      this.message.error("Error while deleting income", {nzDuration: 5000});

    })
  }
}
