import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

interface Project {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'completed' | 'on-hold' | 'cancelled';
  progress: number;
  startDate: Date;
  endDate: Date;
  icon: string;
  team: TeamMember[];
  createdAt: Date;
  updatedAt: Date;
}

interface TeamMember {
  id: string;
  name: string;
  role: string;
  email: string;
}

interface User {
  id: string;
  name: string;
  role: string;
  email: string;
}

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.less']
})
export class ProjectsComponent implements OnInit {
  currentView: 'grid' | 'list' | 'timeline' = 'grid';
  selectedFilter: string = 'all';
  selectedProject: Project | null = null;
  newMemberId: string = '';
  notificationMessage: string = '';
  showNotification: boolean = false;

  projects: Project[] = [
    {
      id: '1',
      name: 'Website Redesign',
      description: 'Complete redesign of the company website with modern UI/UX',
      status: 'active',
      progress: 75,
      startDate: new Date('2024-01-01'),
      endDate: new Date('2024-02-15'),
      icon: 'web',
      team: [
        { id: '1', name: 'Sarah Johnson', role: 'Designer', email: 'sarah@company.com' },
        { id: '2', name: 'Mike Chen', role: 'Developer', email: 'mike@company.com' },
        { id: '3', name: 'Emily Rodriguez', role: 'PM', email: 'emily@company.com' }
      ],
      createdAt: new Date('2024-01-01'),
      updatedAt: new Date('2024-01-10')
    },
    {
      id: '2',
      name: 'Mobile App Development',
      description: 'Native mobile app for iOS and Android platforms',
      status: 'active',
      progress: 45,
      startDate: new Date('2024-01-15'),
      endDate: new Date('2024-03-30'),
      icon: 'phone_android',
      team: [
        { id: '4', name: 'Alex Thompson', role: 'Mobile Dev', email: 'alex@company.com' },
        { id: '2', name: 'Mike Chen', role: 'Backend Dev', email: 'mike@company.com' },
        { id: '5', name: 'Lisa Wang', role: 'UI Designer', email: 'lisa@company.com' }
      ],
      createdAt: new Date('2024-01-15'),
      updatedAt: new Date('2024-01-12')
    },
    {
      id: '3',
      name: 'Database Migration',
      description: 'Migrate legacy database to modern cloud infrastructure',
      status: 'completed',
      progress: 100,
      startDate: new Date('2023-12-01'),
      endDate: new Date('2024-01-10'),
      icon: 'storage',
      team: [
        { id: '6', name: 'David Kim', role: 'DBA', email: 'david@company.com' },
        { id: '2', name: 'Mike Chen', role: 'Backend Dev', email: 'mike@company.com' }
      ],
      createdAt: new Date('2023-12-01'),
      updatedAt: new Date('2024-01-10')
    },
    {
      id: '4',
      name: 'API Integration',
      description: 'Integrate third-party APIs for payment processing',
      status: 'on-hold',
      progress: 30,
      startDate: new Date('2024-01-20'),
      endDate: new Date('2024-02-28'),
      icon: 'api',
      team: [
        { id: '2', name: 'Mike Chen', role: 'Backend Dev', email: 'mike@company.com' },
        { id: '7', name: 'Rachel Green', role: 'QA Engineer', email: 'rachel@company.com' }
      ],
      createdAt: new Date('2024-01-20'),
      updatedAt: new Date('2024-01-25')
    },
    {
      id: '5',
      name: 'Security Audit',
      description: 'Comprehensive security audit and penetration testing',
      status: 'active',
      progress: 60,
      startDate: new Date('2024-01-05'),
      endDate: new Date('2024-02-20'),
      icon: 'security',
      team: [
        { id: '8', name: 'Tom Wilson', role: 'Security Expert', email: 'tom@company.com' },
        { id: '9', name: 'Anna Lee', role: 'Security Analyst', email: 'anna@company.com' }
      ],
      createdAt: new Date('2024-01-05'),
      updatedAt: new Date('2024-01-15')
    }
  ];

  availableUsers: User[] = [
    { id: '1', name: 'Sarah Johnson', role: 'Designer', email: 'sarah@company.com' },
    { id: '2', name: 'Mike Chen', role: 'Developer', email: 'mike@company.com' },
    { id: '3', name: 'Emily Rodriguez', role: 'PM', email: 'emily@company.com' },
    { id: '4', name: 'Alex Thompson', role: 'Mobile Dev', email: 'alex@company.com' },
    { id: '5', name: 'Lisa Wang', role: 'UI Designer', email: 'lisa@company.com' },
    { id: '6', name: 'David Kim', role: 'DBA', email: 'david@company.com' },
    { id: '7', name: 'Rachel Green', role: 'QA Engineer', email: 'rachel@company.com' },
    { id: '8', name: 'Tom Wilson', role: 'Security Expert', email: 'tom@company.com' },
    { id: '9', name: 'Anna Lee', role: 'Security Analyst', email: 'anna@company.com' }
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
    console.log('Projects component initialized');
  }

  get filteredProjects(): Project[] {
    let filtered = this.projects;

    switch (this.selectedFilter) {
      case 'active':
        filtered = filtered.filter(project => project.status === 'active');
        break;
      case 'completed':
        filtered = filtered.filter(project => project.status === 'completed');
        break;
      case 'on-hold':
        filtered = filtered.filter(project => project.status === 'on-hold');
        break;
      case 'my-projects':
        const currentUser = this.authService.currentUserValue;
        filtered = filtered.filter(project => 
          project.team.some(member => member.id === currentUser?.id?.toString())
        );
        break;
    }

    return filtered;
  }

  formatDate(date: Date): string {
    if (!date) return '';
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  }

  isOverdue(endDate: Date): boolean {
    return new Date(endDate) < new Date() && new Date(endDate).toDateString() !== new Date().toDateString();
  }

  createNewProject() {
    const newProject: Project = {
      id: Date.now().toString(),
      name: 'New Project',
      description: 'Click to edit this project description',
      status: 'active',
      progress: 0,
      startDate: new Date(),
      endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
      icon: 'folder',
      team: [],
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    this.projects.unshift(newProject);
    this.openProjectDetail(newProject);
    this.showNotificationMessage('New project created successfully!');
    console.log('Created new project:', newProject);
  }

  openProjectDetail(project: Project) {
    this.selectedProject = { ...project };
    console.log('Opening project detail:', project);
  }

  closeProjectDetail() {
    this.selectedProject = null;
    this.newMemberId = '';
  }

  updateProject() {
    if (!this.selectedProject) return;
    
    const index = this.projects.findIndex(project => project.id === this.selectedProject!.id);
    if (index !== -1) {
      this.projects[index] = { ...this.selectedProject, updatedAt: new Date() };
      this.showNotificationMessage('Project updated successfully!');
      console.log('Updated project:', this.selectedProject);
    }
  }


  editProject(project: Project, event: Event) {
    event.stopPropagation();
    this.openProjectDetail(project);
    console.log('Editing project:', project);
  }

  deleteProject(project: Project, event: Event) {
    event.stopPropagation();
    if (confirm('Are you sure you want to delete this project?')) {
      const index = this.projects.findIndex(p => p.id === project.id);
      if (index !== -1) {
        this.projects.splice(index, 1);
        this.showNotificationMessage('Project deleted successfully!');
        console.log('Deleted project:', project);
      }
    }
  }

  addTeamMember(event: any) {
    if (!this.selectedProject || !event.value) return;
    
    const user = this.availableUsers.find(u => u.id === event.value);
    if (user && !this.selectedProject.team.some(member => member.id === user.id)) {
      this.selectedProject.team.push({
        id: user.id,
        name: user.name,
        role: user.role,
        email: user.email
      });
      this.newMemberId = '';
      this.updateProject();
      this.showNotificationMessage('Team member added successfully!');
      console.log('Added team member:', user);
    }
  }

  removeTeamMember(member: TeamMember) {
    if (!this.selectedProject) return;
    
    const index = this.selectedProject.team.findIndex(m => m.id === member.id);
    if (index !== -1) {
      this.selectedProject.team.splice(index, 1);
      this.updateProject();
      this.showNotificationMessage('Team member removed successfully!');
      console.log('Removed team member:', member);
    }
  }

  onViewChange(event: any) {
    this.currentView = event.value;
    console.log('Changed view to:', event.value);
  }

  onFilterChange(event: any) {
    this.selectedFilter = event.value;
    console.log('Changed filter to:', event.value);
  }

  refreshProjects() {
    console.log('Refreshing projects...');
    this.projects.forEach(project => {
      project.updatedAt = new Date();
    });
    this.showNotificationMessage('Projects refreshed!');
  }
}
