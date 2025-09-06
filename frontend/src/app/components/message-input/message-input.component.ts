import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-message-input',
  template: `
    <div class="message-input-container">
      <mat-card class="input-card">
        <mat-card-content>
          <div class="input-wrapper">
            <button mat-icon-button class="input-action" matTooltip="Add files">
              <mat-icon>attach_file</mat-icon>
            </button>
            
            <mat-form-field class="message-field" appearance="outline">
              <textarea matInput 
                        [(ngModel)]="messageText"
                        (keydown.enter)="sendMessage($event)"
                        placeholder="Message {{ placeholder }}"
                        rows="1"
                        #messageTextarea
                        cdkTextareaAutosize
                        cdkAutosizeMinRows="1"
                        cdkAutosizeMaxRows="4">
              </textarea>
            </mat-form-field>
            
            <div class="input-actions">
              <button mat-icon-button class="input-action" matTooltip="Emoji">
                <mat-icon>emoji_emotions</mat-icon>
              </button>
              <button mat-icon-button class="input-action" matTooltip="Send" 
                      [disabled]="!messageText.trim()"
                      (click)="sendMessageClick()">
                <mat-icon>send</mat-icon>
              </button>
            </div>
          </div>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [`
    .message-input-container {
      padding: 16px;
      background-color: #fafafa;
    }
    .input-card {
      max-width: 800px;
      margin: 0 auto;
    }
    .input-wrapper {
      display: flex;
      align-items: flex-end;
      gap: 8px;
    }
    .message-field {
      flex: 1;
    }
    .input-actions {
      display: flex;
      align-items: center;
    }
    .input-action {
      color: rgba(0, 0, 0, 0.54);
    }
    .input-action:hover {
      color: rgba(0, 0, 0, 0.87);
    }
    .input-action[disabled] {
      color: rgba(0, 0, 0, 0.26);
    }
  `]
})
export class MessageInputComponent {
  @Input() placeholder: string = '';
  @Output() messageSent = new EventEmitter<string>();

  messageText: string = '';

  sendMessage(event: any) {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      this.sendMessageClick();
    }
  }

  sendMessageClick() {
    if (this.messageText.trim()) {
      this.messageSent.emit(this.messageText);
      this.messageText = '';
    }
  }
}


