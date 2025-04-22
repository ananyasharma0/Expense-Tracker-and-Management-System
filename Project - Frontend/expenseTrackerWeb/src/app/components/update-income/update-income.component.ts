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
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { IncomeService } from '../../services/income/income.service';

@Component({
  standalone:true,
  selector: 'app-update-income',
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    NzFormModule,
    NzInputModule,
    NzButtonModule,
    NzCardModule,
    NzSelectModule,
    NzDatePickerModule,
    NzIconModule
  ],
  templateUrl: './update-income.component.html',
  styleUrl: './update-income.component.scss'
})
export class UpdateIncomeComponent {

  id!: number;
  incomeForm!: FormGroup;
  listOfCategory: any[] = ["Salary", "Freelancing", "Investments", "Stocks",
    "Bitcoin", "Bank Transfer", "Youtube", "Other" ];

  constructor(private fb: FormBuilder,
    private message: NzMessageService,
    private router: Router,
    private i18n: NzI18nService,
    private iconService: NzIconService,
    private incomeService: IncomeService,
    private activatedRoute: ActivatedRoute
  ){ this.i18n.setLocale(en_US);
      // Register the icons
      }
      
  ngOnInit(){   
    this.id = this.activatedRoute.snapshot.params['id'];
    this.incomeForm = this.fb.group({
      title: [null, Validators.required],
      amount: [null, Validators.required],
      date: [null, Validators.required],
      category: [null, Validators.required],
      description: [null, Validators.required],
    });
    this.getIncomeById();
  }


  getIncomeById(){
    this.incomeService.getIncomeById(this.id).subscribe(res=>{
      this.incomeForm.patchValue(res);
    }, error=>{
      this.message.error("Something went wrong", {nzDuration: 5000});
    })
  }

  
  submitForm(){
    this.incomeService.updateIncome(this.id, this.incomeForm.value).subscribe(res=>{
      this.message.success("Income updated successfully", {nzDuration: 5000});
      this.router.navigateByUrl("/income")
    },
    error=>{
      this.message.error("Error while updating income", { nzDuration: 5000});

    })

  }




}
