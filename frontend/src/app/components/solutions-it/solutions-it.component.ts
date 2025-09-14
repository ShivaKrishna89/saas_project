import { Component } from '@angular/core';

@Component({
  selector: 'app-solutions-it',
  templateUrl: './solutions-it.component.html',
  styleUrls: ['./solutions-it.component.less']
})
export class SolutionsItComponent {
  startFreeTrial(): void {
    console.log('Starting free trial for IT teams');
    // Navigate to signup or trial page
  }

  scheduleDemo(): void {
    console.log('Scheduling demo for IT teams');
    // Open demo scheduling modal or navigate to demo page
  }
}