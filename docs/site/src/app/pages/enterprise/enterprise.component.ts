import {Component, OnInit} from "@angular/core";
import { take } from "rxjs/operators";
import { PlansService } from "src/app/services/plans.service";
import {fly, flyOne} from "../animations";
@Component({
  selector: "app-enterprise",
  templateUrl: "./enterprise.component.html",
  styleUrls: ["./enterprise.component.scss"],
  animations: [fly("fly"), flyOne("flyOne")]
})
export class EnterpriseComponent implements OnInit {
  comparePlans: any;
  constructor(private planService: PlansService) {}

  ngOnInit() {
    this.planService
    .getPlans()
    .pipe(take(1))
    .subscribe((plans) => {
      console.log(plans);
      this.comparePlans = plans;
      console.log(this.comparePlans.shared);
    });
  }
}
