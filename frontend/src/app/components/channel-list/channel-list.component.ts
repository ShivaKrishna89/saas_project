import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-channel-list',
  template: `
    <mat-expansion-panel [expanded]="expanded" class="channel-panel">
      <mat-expansion-panel-header>
        <mat-panel-title>
          <mat-icon>tag</mat-icon>
          Channels
        </mat-panel-title>
        <mat-panel-description>
          <button mat-icon-button (click)="addChannel($event)" matTooltip="Add channel">
            <mat-icon>add</mat-icon>
          </button>
        </mat-panel-description>
      </mat-expansion-panel-header>
      
      <mat-list dense>
        <mat-list-item *ngFor="let channel of channels" 
                       (click)="selectChannel(channel)"
                       [class.selected]="selectedChannel?.id === channel.id"
                       class="channel-item">
          <mat-icon mat-list-icon class="channel-icon">#</mat-icon>
          <div mat-line>{{ channel.name }}</div>
                     <span class="unread-badge" *ngIf="channel.unreadCount">{{ channel.unreadCount }}</span>
        </mat-list-item>
      </mat-list>
    </mat-expansion-panel>
  `,
  styles: [`
    .channel-panel {
      margin-bottom: 8px;
    }
    .channel-item {
      cursor: pointer;
      border-radius: 4px;
      margin: 2px 0;
    }
    .channel-item:hover {
      background-color: rgba(0, 0, 0, 0.04);
    }
    .channel-item.selected {
      background-color: rgba(63, 81, 181, 0.1);
    }
         .channel-icon {
       font-size: 16px;
       color: rgba(0, 0, 0, 0.54);
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
export class ChannelListComponent {
  @Input() channels: any[] = [];
  @Input() selectedChannel: any = null;
  @Input() expanded: boolean = true;
  @Output() channelSelected = new EventEmitter<any>();
  @Output() addChannelClicked = new EventEmitter<void>();

  selectChannel(channel: any) {
    this.channelSelected.emit(channel);
  }

  addChannel(event: Event) {
    event.stopPropagation();
    this.addChannelClicked.emit();
  }
}
