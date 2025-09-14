import { Component } from '@angular/core';

@Component({
  selector: 'app-solutions-marketing',
  templateUrl: './solutions-marketing.component.html',
  styleUrls: ['./solutions-marketing.component.less']
})
export class SolutionsMarketingComponent {
  startFreeTrial(): void {
    console.log('Starting free trial for marketing teams');
    // Navigate to signup or trial page
  }

  scheduleDemo(): void {
    console.log('Scheduling demo for marketing teams');
    // Open demo scheduling modal or navigate to demo page
  }
}