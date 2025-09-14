import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-channel-list',
  templateUrl: './channel-list.component.html',
  styleUrls: ['./channel-list.component.less']
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
