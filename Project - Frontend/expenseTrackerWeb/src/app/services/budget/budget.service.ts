import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const BASIC_URL = "http://localhost:8080/";

@Injectable({
  providedIn: 'root'
})
export class BudgetService {

  constructor(private http: HttpClient) { }

  postBudget(budgetDTO: any): Observable<any> {
      return this.http.post(BASIC_URL + "api/budgets", budgetDTO);
    }

  getAllBudgets(): Observable<any> {
      return this.http.get(BASIC_URL + "api/budgets/all");
      }

  getBudgetById(id: number): Observable<any> {
      return this.http.get(BASIC_URL + `api/budgets/${id}`);
    }

  deleteBudget(id:number): Observable<any>{
      return this.http.delete(BASIC_URL + `api/budgets/${id}`);
    }

  updateBudget(id: number, budgetDTO:any): Observable<any> {
      return this.http.put(BASIC_URL + `api/budgets/${id}`, budgetDTO);
    }
}
