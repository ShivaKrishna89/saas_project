import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-user-profile',
  template: `
    <mat-card class="user-profile">
      <mat-card-header>
        <div mat-card-avatar class="user-avatar">
          <mat-icon>person</mat-icon>
        </div>
        <mat-card-title>{{ user?.fullName || user?.username }}</mat-card-title>
        <mat-card-subtitle>{{ user?.email }}</mat-card-subtitle>
      </mat-card-header>
      
      <mat-card-content>
        <div class="profile-actions">
          <button mat-button color="primary" (click)="viewProfile()">
            <mat-icon>person</mat-icon>
            View Profile
          </button>
          <button mat-button color="warn" (click)="logout()">
            <mat-icon>exit_to_app</mat-icon>
            Sign Out
          </button>
        </div>
      </mat-card-content>
    </mat-card>
  `,
  styles: [`
    .user-profile {
      max-width: 300px;
      margin: 16px;
    }
    .user-avatar {
      width: 60px;
      height: 60px;
      border-radius: 50%;
      background-color: #f5f5f5;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .profile-actions {
      display: flex;
      flex-direction: column;
      gap: 8px;
      margin-top: 16px;
    }
  `]
})
export class UserProfileComponent {
  @Input() user: any = null;
  @Output() profileClicked = new EventEmitter<void>();
  @Output() logoutClicked = new EventEmitter<void>();

  viewProfile() {
    this.profileClicked.emit();
  }

  logout() {
    this.logoutClicked.emit();
  }
}


