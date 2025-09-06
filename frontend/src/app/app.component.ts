import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  template: `
    <div class="app-container">
      <app-scroll-to-top></app-scroll-to-top>
      <router-outlet></router-outlet>
    </div>
  `,
  styles: [`
    .app-container {
      min-height: 100vh;
      width: 100%;
      overflow-x: hidden;
      overflow-y: auto;
    }
  `]
})
export class AppComponent implements OnInit {
  title = 'CollabX';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    // Public routes allowed; auth-only routes are guarded
  }
}
