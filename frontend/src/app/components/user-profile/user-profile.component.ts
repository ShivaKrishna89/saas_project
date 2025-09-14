import { Component, Input, Output, EventEmitter } from '@angular/core';

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  title: string;
  role: 'admin' | 'member' | 'guest';
  status: 'active' | 'inactive';
  isOnline: boolean;
  bio?: string;
  phone?: string;
  location?: string;
  website?: string;
  stats?: {
    messages: number;
    files: number;
    projects: number;
  };
  activities?: Activity[];
  files?: File[];
  projects?: Project[];
}

interface Activity {
  id: string;
  type: string;
  description: string;
  timestamp: Date;
}

interface File {
  id: string;
  name: string;
  type: string;
  size: number;
  uploadedAt: Date;
}

interface Project {
  id: string;
  name: string;
  description: string;
  role: string;
  status: 'active' | 'completed' | 'paused';
}

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.less']
})
export class UserProfileComponent {
  @Input() user: User = {} as User;
  @Output() profileEdit = new EventEmitter<User>();
  @Output() avatarEdit = new EventEmitter<User>();
  @Output() messageSend = new EventEmitter<User>();
  @Output() fileDownload = new EventEmitter<File>();
  @Output() projectView = new EventEmitter<Project>();

  activeTab = 'overview';

  tabs = [
    { id: 'overview', label: 'Overview', icon: 'person' },
    { id: 'activity', label: 'Activity', icon: 'timeline' },
    { id: 'files', label: 'Files', icon: 'folder' },
    { id: 'projects', label: 'Projects', icon: 'work' }
  ];

  setActiveTab(tabId: string): void {
    this.activeTab = tabId;
  }

  editProfile(): void {
    this.profileEdit.emit(this.user);
  }

  editAvatar(): void {
    this.avatarEdit.emit(this.user);
  }

  sendMessage(): void {
    this.messageSend.emit(this.user);
  }

  downloadFile(file: File): void {
    this.fileDownload.emit(file);
  }

  viewProject(project: Project): void {
    this.projectView.emit(project);
  }

  getActivityIcon(type: string): string {
    const iconMap: { [key: string]: string } = {
      'message': 'message',
      'file': 'file_upload',
      'project': 'work',
      'login': 'login',
      'logout': 'logout'
    };
    return iconMap[type] || 'info';
  }

  getFileIcon(type: string): string {
    if (type.startsWith('image/')) return 'image';
    if (type.startsWith('video/')) return 'video_file';
    if (type.startsWith('audio/')) return 'audiotrack';
    if (type.includes('pdf')) return 'picture_as_pdf';
    if (type.includes('word')) return 'description';
    if (type.includes('excel') || type.includes('spreadsheet')) return 'table_chart';
    if (type.includes('zip') || type.includes('rar')) return 'archive';
    return 'insert_drive_file';
  }

  formatActivityTime(timestamp: Date): string {
    const now = new Date();
    const diff = now.getTime() - timestamp.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 60) {
      return `${minutes} minutes ago`;
    } else if (hours < 24) {
      return `${hours} hours ago`;
    } else {
      return `${days} days ago`;
    }
  }

  formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  formatFileDate(date: Date): string {
    return new Date(date).toLocaleDateString();
  }
}