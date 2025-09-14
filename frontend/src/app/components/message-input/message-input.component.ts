import { Component, EventEmitter, Output, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-message-input',
  templateUrl: './message-input.component.html',
  styleUrls: ['./message-input.component.less']
})
export class MessageInputComponent {
  @Output() messageSent = new EventEmitter<{ text: string; file?: File }>();
  @ViewChild('messageInput') messageInput!: ElementRef<HTMLTextAreaElement>;

  messageText = '';
  attachedFile: File | null = null;
  showEmojiPicker = false;

  commonEmojis = ['😀', '😂', '😍', '🤔', '👍', '👎', '❤️', '🎉', '🔥', '💯', '😢', '😮', '😡', '🤗', '👏', '🙌'];

  canSend(): boolean {
    return this.messageText.trim().length > 0 || this.attachedFile !== null;
  }

  onKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      this.sendMessage();
    }
  }

  onInput(): void {
    this.autoResize();
  }

  autoResize(): void {
    const textarea = this.messageInput.nativeElement;
    textarea.style.height = 'auto';
    textarea.style.height = Math.min(textarea.scrollHeight, 120) + 'px';
  }

  sendMessage(): void {
    if (!this.canSend()) return;

    this.messageSent.emit({
      text: this.messageText.trim(),
      file: this.attachedFile || undefined
    });

    this.messageText = '';
    this.attachedFile = null;
    this.showEmojiPicker = false;
    this.autoResize();
  }

  attachFile(): void {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '*/*';
    input.onchange = (event: any) => {
      const file = event.target.files[0];
      if (file) {
        this.attachedFile = file;
      }
    };
    input.click();
  }

  removeFile(): void {
    this.attachedFile = null;
  }

  toggleEmojiPicker(): void {
    this.showEmojiPicker = !this.showEmojiPicker;
  }

  insertEmoji(emoji: string): void {
    this.messageText += emoji;
    this.showEmojiPicker = false;
    this.autoResize();
  }

  formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }
}