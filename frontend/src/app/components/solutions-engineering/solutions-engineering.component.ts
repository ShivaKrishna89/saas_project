import { Component } from '@angular/core';

@Component({
  selector: 'app-solutions-engineering',
  templateUrl: './solutions-engineering.component.html',
  styleUrls: ['./solutions-engineering.component.less']
})
export class SolutionsEngineeringComponent {
  startFreeTrial(): void {
    console.log('Starting free trial for engineering teams');
    // Navigate to signup or trial page
  }

  scheduleDemo(): void {
    console.log('Scheduling demo for engineering teams');
    // Open demo scheduling modal or navigate to demo page
  }
}