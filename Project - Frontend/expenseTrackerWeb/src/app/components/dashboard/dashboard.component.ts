import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzGridModule } from 'ng-zorro-antd/grid';

import { StatsService } from '../../services/stats/stats.service';
import Chart from 'chart.js/auto';
import { CategoryScale } from 'chart.js';

Chart.register(CategoryScale);

@Component({
  standalone: true,
  selector: 'app-dashboard',
  imports: [
    NzTypographyModule,
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    NzFormModule,
    NzInputModule,
    NzButtonModule,
    NzCardModule,
    NzSelectModule,
    NzDatePickerModule,
    NzIconModule,
    NzGridModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  stats: any;
  expenses: any;
  incomes: any;

  gridStyle = {
    width: '25%',
    textAlign: 'center'
  };

  @ViewChild('incomeLineChartRef', { static: true }) private incomeLineChartRef!: ElementRef;
  @ViewChild('expenseLineChartRef', { static: true }) private expenseLineChartRef!: ElementRef;
  @ViewChild('budgetBarChartRef', { static: false }) private budgetBarChartRef!: ElementRef;
  @ViewChild('utilizationPieChartRef', { static: false }) private utilizationPieChartRef!: ElementRef;
  
  constructor(private statsService: StatsService) {}

  ngOnInit(): void {
    this.getStats();
    this.getChartData();
  }

  getStats(): void {
    this.statsService.getStats().subscribe(res => {
      this.stats = res;
      this.createBudgetCharts();
    });
  }

  getChartData(): void {
    this.statsService.getChart().subscribe(res => {
      if (res.expenseList && res.incomeList) {
        this.incomes = res.incomeList;
        this.expenses = res.expenseList;
        this.createLineChart();
      }
    });
  }

  getBudgetCategories(): string[] {
    if (!this.stats || !this.stats.budgetStats) {
      return [];
    }
    return Object.keys(this.stats.budgetStats);
  }
  
  createLineChart(): void {
    const incomeCtx = this.incomeLineChartRef.nativeElement.getContext('2d');
    new Chart(incomeCtx, {
      type: 'line',
      data: {
        labels: this.incomes.map(income => income.date),
        datasets: [{
          label: 'Income',
          data: this.incomes.map(income => income.amount),
          borderWidth: 2,
          backgroundColor: 'rgba(0, 128, 0, 0.2)',
          borderColor: 'green',
          fill: true
        }]
      },
      options: {
        scales: {
          y: { beginAtZero: true }
        }
      }
    });

    const expenseCtx = this.expenseLineChartRef.nativeElement.getContext('2d');
    new Chart(expenseCtx, {
      type: 'line',
      data: {
        labels: this.expenses.map(expense => expense.date),
        datasets: [{
          label: 'Expense',
          data: this.expenses.map(expense => expense.amount),
          borderWidth: 2,
          backgroundColor: 'rgba(255, 0, 0, 0.2)',
          borderColor: 'red',
          fill: true
        }]
      },
      options: {
        scales: {
          y: { beginAtZero: true }
        }
      }
    });
  }

  createBudgetCharts(): void {
    if (!this.stats || !this.stats.budgetStats) {
      return;
    }
    
    const categories = this.getBudgetCategories();
    const budgetAmounts = categories.map(cat => this.stats.budgetStats[cat].budgetAmount);
    const spentAmounts = categories.map(cat => this.stats.budgetStats[cat].currentSpending);
    
    // Colors for charts
    const backgroundColors = [
      'rgba(255, 99, 132, 0.6)',
      'rgba(54, 162, 235, 0.6)',
      'rgba(255, 206, 86, 0.6)',
      'rgba(75, 192, 192, 0.6)',
      'rgba(153, 102, 255, 0.6)'
    ];
    
    // Budget Allocation Bar Chart
    if (this.budgetBarChartRef) {
      const budgetCtx = this.budgetBarChartRef.nativeElement.getContext('2d');
      new Chart(budgetCtx, {
        type: 'bar',
        data: {
          labels: categories,
          datasets: [
            {
              label: 'Budget Allocated',
              data: budgetAmounts,
              backgroundColor: 'rgba(54, 162, 235, 0.7)',
              borderColor: 'rgba(54, 162, 235, 1)',
              borderWidth: 1
            },
            {
              label: 'Current Spending',
              data: spentAmounts,
              backgroundColor: 'rgba(255, 99, 132, 0.7)',
              borderColor: 'rgba(255, 99, 132, 1)',
              borderWidth: 1
            }
          ]
        },
        options: {
          indexAxis: 'y',  // This makes it a horizontal bar chart
          responsive: true,
          plugins: {
            legend: {
              position: 'top',
            },
            title: {
              display: true,
              text: 'Budget Allocation & Spending'
            }
          },
          scales: {
            x: {
              beginAtZero: true,
              title: {
                display: true,
                text: 'Amount (₹)'
              }
            }
          }
        }
      });
    }
    
    // Budget Utilization Pie Chart
    
    
  }
}