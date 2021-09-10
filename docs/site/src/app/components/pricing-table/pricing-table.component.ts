import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'pricing-table',
  templateUrl: './pricing-table.component.html',
  styleUrls: ['./pricing-table.component.scss']
})
export class PricingTableComponent implements OnInit {

  @Input() comparePlans;
  constructor() { }

  ngOnInit(): void {
  }

}
