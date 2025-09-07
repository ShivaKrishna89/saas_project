import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: string;
  status: 'online' | 'away' | 'busy' | 'offline';
  phone: string;
  department: string;
  joinedDate: Date;
  projectsCount: number;
  tasksCount: number;
  completedTasks: number;
  workingHours: number;
  recentActivity: Activity[];
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

  teamMembers: TeamMember[] = [
    {
      id: '1',
      name: 'Sarah Johnson',
      email: 'sarah@company.com',
      role: 'admin',
      status: 'online',
      phone: '+1 (555) 123-4567',
      department: 'Engineering',
      joinedDate: new Date('2023-01-15'),
      projectsCount: 5,
      tasksCount: 12,
      completedTasks: 8,
      workingHours: 40,
      recentActivity: [
        { id: '1', text: 'Completed task: Design new landing page', icon: 'check_circle', timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000) },
        { id: '2', text: 'Joined project: Mobile App Development', icon: 'folder', timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000) },
        { id: '3', text: 'Updated profile information', icon: 'person', timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000) }
      ]
    },
    {
      id: '2',
      name: 'Mike Chen',
      email: 'mike@company.com',
      role: 'developer',
      status: 'online',
      phone: '+1 (555) 234-5678',
      department: 'Engineering',
      joinedDate: new Date('2023-02-20'),
      projectsCount: 4,
      tasksCount: 15,
      completedTasks: 10,
      workingHours: 38,
      recentActivity: [
        { id: '4', text: 'Fixed bug in authentication system', icon: 'bug_report', timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000) },
        { id: '5', text: 'Committed code to repository', icon: 'code', timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000) },
        { id: '6', text: 'Attended team standup meeting', icon: 'group', timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000) }
      ]
    },
    {
      id: '3',
      name: 'Emily Rodriguez',
      email: 'emily@company.com',
      role: 'manager',
      status: 'away',
      phone: '+1 (555) 345-6789',
      department: 'Product',
      joinedDate: new Date('2023-03-10'),
      projectsCount: 3,
      tasksCount: 8,
      completedTasks: 6,
      workingHours: 35,
      recentActivity: [
        { id: '7', text: 'Reviewed project proposals', icon: 'description', timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000) },
        { id: '8', text: 'Scheduled team meeting', icon: 'event', timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000) },
        { id: '9', text: 'Updated project timeline', icon: 'schedule', timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000) }
      ]
    },
    {
      id: '4',
      name: 'Alex Thompson',
      email: 'alex@company.com',
      role: 'developer',
      status: 'busy',
      phone: '+1 (555) 456-7890',
      department: 'Engineering',
      joinedDate: new Date('2023-04-05'),
      projectsCount: 2,
      tasksCount: 10,
      completedTasks: 7,
      workingHours: 42,
      recentActivity: [
        { id: '10', text: 'Working on mobile app features', icon: 'phone_android', timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000) },
        { id: '11', text: 'Fixed performance issues', icon: 'speed', timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000) },
        { id: '12', text: 'Updated documentation', icon: 'article', timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000) }
      ]
    },
    {
      id: '5',
      name: 'Lisa Wang',
      email: 'lisa@company.com',
      role: 'designer',
      status: 'online',
      phone: '+1 (555) 567-8901',
      department: 'Design',
      joinedDate: new Date('2023-05-12'),
      projectsCount: 3,
      tasksCount: 6,
      completedTasks: 4,
      workingHours: 36,
      recentActivity: [
        { id: '13', text: 'Created new UI mockups', icon: 'palette', timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000) },
        { id: '14', text: 'Reviewed design system', icon: 'style', timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000) },
        { id: '15', text: 'Updated brand guidelines', icon: 'branding_watermark', timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000) }
      ]
    },
    {
      id: '6',
      name: 'David Kim',
      email: 'david@company.com',
      role: 'qa',
      status: 'offline',
      phone: '+1 (555) 678-9012',
      department: 'Quality Assurance',
      joinedDate: new Date('2023-06-18'),
      projectsCount: 2,
      tasksCount: 8,
      completedTasks: 5,
      workingHours: 32,
      recentActivity: [
        { id: '16', text: 'Completed test suite execution', icon: 'play_arrow', timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000) },
        { id: '17', text: 'Reported critical bugs', icon: 'bug_report', timestamp: new Date(Date.now() - 10 * 60 * 60 * 1000) },
        { id: '18', text: 'Updated test documentation', icon: 'description', timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000) }
      ]
    }
  ];

  constructor(private authService: AuthService) {}

  showNotificationMessage(message: string) {
    this.notificationMessage = message;
    this.showNotification = true;
    setTimeout(() => {
      this.showNotification = false;
    }, 3000);
  }

  ngOnInit() {
    console.log('Team component initialized');
  }

  get filteredMembers(): TeamMember[] {
    let filtered = this.teamMembers;

    // Filter by search query
    if (this.searchQuery) {
      const query = this.searchQuery.toLowerCase();
      filtered = filtered.filter(member =>
        member.name.toLowerCase().includes(query) ||
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
