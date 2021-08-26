import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ParentPlan } from '../interface/partner';

@Injectable({
  providedIn: 'root',
})
export class PlansService {
  constructor(private http: HttpClient) {}

  getPlans(): Observable<ParentPlan> {
    return this.http.get<ParentPlan>('/assets/plans.json');
  }
}
