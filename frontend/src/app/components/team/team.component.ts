import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ApiService } from '../../services/api.service';

interface TeamMember {
  id: string;
  username: string;
  full_name: string;
  email: string;
  role: string;
  status: 'online' | 'away' | 'busy' | 'offline';
  phone?: string;
  department?: string;
  joinedDate: Date;
  projectsCount?: number;
  tasksCount?: number;
  completedTasks?: number;
  workingHours?: number;
  recentActivity?: Activity[];
  is_active?: boolean;
  created_at?: string;
}

interface Activity {
  id: string;
  text: string;
  icon: string;
  timestamp: Date;
}

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.less']
})
export class TeamComponent implements OnInit {
  selectedMember: TeamMember | null = null;
  searchQuery: string = '';
  selectedRole: string = 'all';
  notificationMessage: string = '';
  showNotification: boolean = false;

  teamMembers: TeamMember[] = [];

  constructor(private authService: AuthService, private apiService: ApiService) {}

  showNotificationMessage(message: string) {
    this.notificationMessage = message;
    this.showNotification = true;
    setTimeout(() => {
      this.showNotification = false;
    }, 3000);
  }

  ngOnInit() {
    console.log('Team component initialized');
    this.loadTeamMembers();
  }

  loadTeamMembers() {
    this.apiService.getAllUsers().subscribe({
      next: (users: any[]) => {
        this.teamMembers = users.map(user => ({
          id: user.id.toString(),
          username: user.username,
          full_name: user.full_name,
          email: user.email,
          role: user.role?.toLowerCase() || 'member',
          status: 'online' as const, // Default status, could be enhanced later
          phone: user.phone || '',
          department: user.department || 'General',
          joinedDate: user.created_at ? new Date(user.created_at) : new Date(),
          projectsCount: 0, // Could be enhanced with actual data
          tasksCount: 0, // Could be enhanced with actual data
          completedTasks: 0, // Could be enhanced with actual data
          workingHours: 40, // Default value
          recentActivity: [], // Could be enhanced with actual activity data
          is_active: user.is_active
        })).filter(member => member.is_active);
      },
      error: (error) => {
        console.error('Failed to load team members:', error);
        this.showNotificationMessage('Failed to load team members');
      }
    });
  }

  get filteredMembers(): TeamMember[] {
    let filtered = this.teamMembers;

    // Filter by search query
    if (this.searchQuery) {
      const query = this.searchQuery.toLowerCase();
      filtered = filtered.filter(member =>
        member.full_name.toLowerCase().includes(query) ||
        member.username.toLowerCase().includes(query) ||
        member.email.toLowerCase().includes(query) ||
        member.role.toLowerCase().includes(query)
      );
    }

    // Filter by role
    if (this.selectedRole !== 'all') {
      filtered = filtered.filter(member => member.role === this.selectedRole);
    }

    return filtered;
  }

  getActiveMembers(): TeamMember[] {
    return this.teamMembers.filter(member => member.status !== 'offline');
  }

  getOnlineMembers(): TeamMember[] {
    return this.teamMembers.filter(member => member.status === 'online');
  }

  getAdmins(): TeamMember[] {
    return this.teamMembers.filter(member => member.role === 'admin');
  }

  getStatusText(status: string): string {
    const statusMap: { [key: string]: string } = {
      'online': 'Online',
      'away': 'Away',
      'busy': 'Busy',
      'offline': 'Offline'
    };
    return statusMap[status] || status;
  }

  formatDate(date: Date): string {
    if (!date) return '';
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  }

  formatTime(date: Date): string {
    if (!date) return '';
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor(diff / (1000 * 60));

    if (hours > 0) {
      return `${hours}h ago`;
    } else if (minutes > 0) {
      return `${minutes}m ago`;
    } else {
      return 'Just now';
    }
  }

  inviteTeamMember() {
    console.log('Inviting new team member');
    this.showNotificationMessage('Invitation sent successfully!');
  }

  openMemberDetail(member: TeamMember) {
    this.selectedMember = { ...member };
    console.log('Opening member detail:', member);
  }

  closeMemberDetail() {
    this.selectedMember = null;
  }

  updateMember() {
    if (!this.selectedMember) return;
    
    const index = this.teamMembers.findIndex(member => member.id === this.selectedMember!.id);
    if (index !== -1) {
      this.teamMembers[index] = { ...this.selectedMember };
      this.showNotificationMessage('Member updated successfully!');
      console.log('Updated member:', this.selectedMember);
    }
  }

  editMember(member: TeamMember, event: Event) {
    event.stopPropagation();
    this.openMemberDetail(member);
    console.log('Editing member:', member);
  }

  removeMember(member: TeamMember, event: Event) {
    event.stopPropagation();
    if (confirm('Are you sure you want to remove this team member?')) {
      const index = this.teamMembers.findIndex(m => m.id === member.id);
      if (index !== -1) {
        this.teamMembers.splice(index, 1);
        this.showNotificationMessage('Team member removed successfully!');
        console.log('Removed member:', member);
      }
    }
  }

  onSearchChange() {
    console.log('Search query changed:', this.searchQuery);
  }

  onRoleFilterChange(event: any) {
    this.selectedRole = event.value;
    console.log('Role filter changed to:', event.value);
  }

  refreshTeam() {
    console.log('Refreshing team data...');
    this.showNotificationMessage('Team data refreshed!');
  }
}
