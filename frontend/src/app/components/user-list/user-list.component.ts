import { Component, Input, Output, EventEmitter } from '@angular/core';

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  title: string;
  role: 'admin' | 'member' | 'guest';
  status: 'active' | 'inactive' | 'pending';
  isOnline: boolean;
  lastSeen?: Date;
}

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.less']
})
export class UserListComponent {
  @Input() users: User[] = [];
  @Output() userInvite = new EventEmitter<void>();
  @Output() userEdit = new EventEmitter<User>();
  @Output() userRemove = new EventEmitter<User>();
  @Output() userMessage = new EventEmitter<User>();
  @Output() userProfile = new EventEmitter<User>();

  searchQuery = '';
  selectedRole = '';
  selectedStatus = '';
  filteredUsers: User[] = [];

  ngOnInit(): void {
    this.filteredUsers = [...this.users];
  }

  ngOnChanges(): void {
    this.filterUsers();
  }

  trackByUserId(index: number, user: User): string {
    return user.id;
  }

  filterUsers(): void {
    this.filteredUsers = this.users.filter(user => {
      const matchesSearch = !this.searchQuery || 
        user.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        user.title.toLowerCase().includes(this.searchQuery.toLowerCase());
      
      const matchesRole = !this.selectedRole || user.role === this.selectedRole;
      const matchesStatus = !this.selectedStatus || user.status === this.selectedStatus;
      
      return matchesSearch && matchesRole && matchesStatus;
    });
  }

  refreshUsers(): void {
    // Emit event to parent component to refresh user data
    console.log('Refreshing users...');
  }

  inviteUser(): void {
    this.userInvite.emit();
  }

  editUser(user: User): void {
    this.userEdit.emit(user);
  }

  removeUser(user: User): void {
    this.userRemove.emit(user);
  }

  sendMessage(user: User): void {
    this.userMessage.emit(user);
  }

  viewProfile(user: User): void {
    this.userProfile.emit(user);
  }

  formatLastSeen(lastSeen?: Date): string {
    if (!lastSeen) return 'Never';
    
    const now = new Date();
    const diff = now.getTime() - lastSeen.getTime();
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
}