import { Component, OnInit } from '@angular/core';
import { ParentPlan } from 'src/app/interface/partner';
import { PlansService } from 'src/app/services/plans.service';

@Component({
  selector: 'app-compare-plans',
  templateUrl: './compare-plans.component.html',
  styleUrls: ['./compare-plans.component.scss'],
})
export class ComparePlansComponent implements OnInit {
  public comparePlans: ParentPlan;

  constructor(public planService: PlansService) {}

  ngOnInit(): void {
    this.planService.getPlans().subscribe((plans) => {
      console.log(plans);
      this.comparePlans = plans;
      console.log(this.comparePlans.shared);
    });
  }
}
