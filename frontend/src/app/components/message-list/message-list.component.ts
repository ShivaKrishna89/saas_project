import { Component, Input, Output, EventEmitter, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';

@Component({
  selector: 'app-message-list',
  template: `
    <div class="message-container" #messageContainer>
      <div class="message-list">
        <div *ngFor="let message of messages" class="message-item">
          <div class="message-avatar">
            <mat-icon>person</mat-icon>
          </div>
          <div class="message-content">
            <div class="message-header">
              <span class="message-author">{{ message.user?.fullName || message.user?.username }}</span>
              <span class="message-time">{{ message.timestamp | date:'shortTime' }}</span>
            </div>
            <div class="message-text">{{ message.content }}</div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .message-container {
      height: 100%;
      overflow-y: auto;
      padding: 16px;
    }
    .message-list {
      max-width: 800px;
      margin: 0 auto;
    }
    .message-item {
      display: flex;
      margin-bottom: 16px;
      padding: 8px 0;
    }
    .message-avatar {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      background-color: #f5f5f5;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-right: 12px;
      flex-shrink: 0;
    }
    .message-content {
      flex: 1;
    }
    .message-header {
      display: flex;
      align-items: center;
      margin-bottom: 4px;
    }
    .message-author {
      font-weight: 600;
      color: #333;
      margin-right: 8px;
    }
    .message-time {
      color: rgba(0, 0, 0, 0.54);
      font-size: 12px;
    }
    .message-text {
      color: #333;
      line-height: 1.4;
      font-size: 14px;
    }
  `]
})
export class MessageListComponent implements AfterViewChecked {
  @Input() messages: any[] = [];
  @ViewChild('messageContainer') messageContainer!: ElementRef;

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  private scrollToBottom(): void {
    try {
      const element = this.messageContainer.nativeElement;
      element.scrollTop = element.scrollHeight;
    } catch (err) {}
  }
}


