import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.less']
})
export class DemoComponent {
  constructor(private router: Router) {}

  goHome() {
    this.router.navigate(['/home']);
  }

  navigateToLogin() {
    this.router.navigate(['/auth/login']);
  }

  navigateToRegister() {
    this.router.navigate(['/auth/register']);
  }

  talkToSales() {
    this.router.navigate(['/contact-sales']);
  }

  playVideo() {
    // In a real implementation, this would open a video modal or redirect to a video player
    alert('Demo video would play here. In a real implementation, this would open a video modal or redirect to a video player.');
  }
}
