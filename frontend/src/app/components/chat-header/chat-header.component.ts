import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-chat-header',
  template: `
    <mat-toolbar class="chat-header">
      <div class="chat-info">
        <mat-icon class="chat-icon">#</mat-icon>
        <span class="chat-name">{{ chatName }}</span>
        <span class="chat-topic" *ngIf="chatTopic">{{ chatTopic }}</span>
      </div>
      
      <div class="chat-actions">
        <button mat-icon-button matTooltip="Search">
          <mat-icon>search</mat-icon>
        </button>
        <button mat-icon-button matTooltip="Notifications">
          <mat-icon>notifications</mat-icon>
        </button>
        <button mat-icon-button matTooltip="More options" [matMenuTriggerFor]="menu">
          <mat-icon>more_vert</mat-icon>
        </button>
        
        <mat-menu #menu="matMenu">
          <button mat-menu-item>
            <mat-icon>info</mat-icon>
            <span>Channel info</span>
          </button>
          <button mat-menu-item>
            <mat-icon>settings</mat-icon>
            <span>Settings</span>
          </button>
          <mat-divider></mat-divider>
          <button mat-menu-item>
            <mat-icon>archive</mat-icon>
            <span>Archive channel</span>
          </button>
        </mat-menu>
      </div>
    </mat-toolbar>
  `,
  styles: [`
    .chat-header {
      background-color: white;
      border-bottom: 1px solid #e0e0e0;
      padding: 0 16px;
    }
    .chat-info {
      display: flex;
      align-items: center;
      flex: 1;
    }
    .chat-icon {
      margin-right: 8px;
      color: rgba(0, 0, 0, 0.54);
    }
    .chat-name {
      font-weight: 600;
      font-size: 16px;
      color: #333;
    }
    .chat-topic {
      margin-left: 8px;
      color: rgba(0, 0, 0, 0.54);
      font-size: 14px;
    }
    .chat-actions {
      display: flex;
      align-items: center;
    }
  `]
})
export class ChatHeaderComponent {
  @Input() chatName: string = '';
  @Input() chatTopic: string = '';
  @Output() searchClicked = new EventEmitter<void>();
  @Output() notificationsClicked = new EventEmitter<void>();
  @Output() settingsClicked = new EventEmitter<void>();
}


