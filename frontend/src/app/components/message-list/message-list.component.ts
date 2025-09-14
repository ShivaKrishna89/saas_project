import { Component, Input, Output, EventEmitter, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';

interface Message {
  id: string;
  type: 'user' | 'system' | 'file';
  text: string;
  sender: string;
  avatar: string;
  timestamp: Date;
  isOwn: boolean;
  fileName?: string;
  fileSize?: number;
  fileType?: string;
}

@Component({
  selector: 'app-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.less']
})
export class MessageListComponent implements AfterViewChecked {
  @Input() messages: Message[] = [];
  @Input() channelName = 'general';
  @Input() memberCount = 0;
  @Input() typingUsers: string[] = [];
  @Output() messageEdit = new EventEmitter<Message>();
  @Output() messageDelete = new EventEmitter<Message>();
  @Output() channelSettings = new EventEmitter<void>();
  @Output() fileDownload = new EventEmitter<Message>();

  @ViewChild('messagesScroll') messagesScroll!: ElementRef<HTMLDivElement>;

  today = new Date();
  showDateSeparator = true;

  ngAfterViewChecked(): void {
    this.scrollToBottom();
  }

  trackByMessageId(index: number, message: Message): string {
    return message.id;
  }

  formatTime(timestamp: Date): string {
    return new Date(timestamp).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  }

  formatDate(date: Date): string {
    return new Date(date).toLocaleDateString([], { 
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  formatMessageText(text: string): string {
    // Convert URLs to links
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    return text.replace(urlRegex, '<a href="$1" target="_blank" rel="noopener noreferrer">$1</a>');
  }

  formatFileSize(bytes?: number): string {
    if (!bytes || bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  getFileIcon(fileType?: string): string {
    if (!fileType) return 'insert_drive_file';
    if (fileType.startsWith('image/')) return 'image';
    if (fileType.startsWith('video/')) return 'video_file';
    if (fileType.startsWith('audio/')) return 'audiotrack';
    if (fileType.includes('pdf')) return 'picture_as_pdf';
    if (fileType.includes('word')) return 'description';
    if (fileType.includes('excel') || fileType.includes('spreadsheet')) return 'table_chart';
    if (fileType.includes('zip') || fileType.includes('rar')) return 'archive';
    return 'insert_drive_file';
  }

  editMessage(message: Message): void {
    this.messageEdit.emit(message);
  }

  deleteMessage(message: Message): void {
    this.messageDelete.emit(message);
  }

  openChannelSettings(): void {
    this.channelSettings.emit();
  }

  downloadFile(message: Message): void {
    this.fileDownload.emit(message);
  }

  private scrollToBottom(): void {
    if (this.messagesScroll) {
      const element = this.messagesScroll.nativeElement;
      element.scrollTop = element.scrollHeight;
    }
  }
}