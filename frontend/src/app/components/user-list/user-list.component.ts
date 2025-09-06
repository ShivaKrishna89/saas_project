import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-user-list',
  template: `
    <mat-expansion-panel [expanded]="expanded" class="user-panel">
      <mat-expansion-panel-header>
        <mat-panel-title>
          <mat-icon>people</mat-icon>
          Direct Messages
        </mat-panel-title>
        <mat-panel-description>
          <button mat-icon-button (click)="addUser($event)" matTooltip="Start a DM">
            <mat-icon>add</mat-icon>
          </button>
        </mat-panel-description>
      </mat-expansion-panel-header>
      
      <mat-list dense>
        <mat-list-item *ngFor="let user of users" 
                       (click)="selectUser(user)"
                       [class.selected]="selectedUser?.id === user.id"
                       class="user-item">
          <div mat-list-icon class="user-avatar">
            <mat-icon>person</mat-icon>
            <div class="status-indicator" [class.online]="user.online"></div>
          </div>
          <div mat-line>{{ user.fullName || user.username }}</div>
                     <span class="unread-badge" *ngIf="user.unreadCount">{{ user.unreadCount }}</span>
        </mat-list-item>
      </mat-list>
    </mat-expansion-panel>
  `,
  styles: [`
    .user-panel {
      margin-bottom: 8px;
    }
    .user-item {
      cursor: pointer;
      border-radius: 4px;
      margin: 2px 0;
    }
    .user-item:hover {
      background-color: rgba(0, 0, 0, 0.04);
    }
    .user-item.selected {
      background-color: rgba(63, 81, 181, 0.1);
    }
    .user-avatar {
      position: relative;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background-color: #f5f5f5;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .status-indicator {
      position: absolute;
      bottom: 2px;
      right: 2px;
      width: 12px;
      height: 12px;
      border-radius: 50%;
      background-color: #ccc;
      border: 2px solid white;
    }
         .status-indicator.online {
       background-color: #4caf50;
     }
     
     .unread-badge {
       background-color: #ff4081;
       color: white;
       border-radius: 10px;
       padding: 2px 6px;
       font-size: 11px;
       font-weight: bold;
       min-width: 16px;
       text-align: center;
       margin-left: auto;
     }
  `]
})
export class UserListComponent {
  @Input() users: any[] = [];
  @Input() selectedUser: any = null;
  @Input() expanded: boolean = true;
  @Output() userSelected = new EventEmitter<any>();
  @Output() addUserClicked = new EventEmitter<void>();

  selectUser(user: any) {
    this.userSelected.emit(user);
  }

  addUser(event: Event) {
    event.stopPropagation();
    this.addUserClicked.emit();
  }
}
