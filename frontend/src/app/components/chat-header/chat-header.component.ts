import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-chat-header',
  templateUrl: './chat-header.component.html',
  styleUrls: ['./chat-header.component.less']
})
export class ChatHeaderComponent {
  @Input() chatName: string = '';
  @Input() chatTopic: string = '';
  @Output() searchClicked = new EventEmitter<void>();
  @Output() notificationsClicked = new EventEmitter<void>();
  @Output() settingsClicked = new EventEmitter<void>();
}


