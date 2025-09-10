import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ApiService } from '../../services/api.service';

interface Project {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'inactive';
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
  isCreating: boolean = false;

  projects: Project[] = [];

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

  constructor(private authService: AuthService, private apiService: ApiService) {}

  showNotificationMessage(message: string) {
    this.notificationMessage = message;
    this.showNotification = true;
    setTimeout(() => {
      this.showNotification = false;
    }, 3000);
  }

  ngOnInit() {
    this.loadProjects();
  }

  private loadProjects() {
    // For now, use workspace id 1; replace when multi-workspace is implemented
    this.apiService.getProjectsForCurrentUser().subscribe({
      next: (backendProjects: any[]) => {
        this.projects = (backendProjects || []).map(p => ({
          id: (p.id ?? '').toString(),
          name: p.title || p.name || 'Untitled Project',
          description: p.description || '',
          status: p.is_active === false ? 'inactive' : 'active',
          progress: Number(p.progress ?? 0),
          startDate: p.start_date ? new Date(p.start_date) : new Date(),
          endDate: p.end_date ? new Date(p.end_date) : new Date(Date.now() + 30*24*60*60*1000),
          icon: p.icon || 'folder',
          team: Array.isArray(p.team) ? p.team : [],
          createdAt: p.created_at ? new Date(p.created_at) : new Date(),
          updatedAt: p.updated_at ? new Date(p.updated_at) : new Date()
        }));
      },
      error: (error) => {
        console.error('Failed to load projects', error);
      }
    });
  }

  get filteredProjects(): Project[] {
    let filtered = this.projects;

    switch (this.selectedFilter) {
      case 'active':
        filtered = filtered.filter(project => project.status === 'active');
        break;
      case 'inactive':
        filtered = filtered.filter(project => project.status === 'inactive');
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
    const draft: Project = {
      id: 'new',
      name: '',
      description: '',
      status: 'active',
      progress: 0,
      startDate: new Date(),
      endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      icon: 'folder',
      team: [],
      createdAt: new Date(),
      updatedAt: new Date()
    };
    this.isCreating = true;
    this.openProjectDetail(draft);
  }

  openProjectDetail(project: Project) {
    this.selectedProject = { ...project };
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
      
    }
  }

  private generateProjectKey(title: string): string {
    const words = (title || '').toUpperCase().match(/[A-Z0-9]+/g) || [];
    const keyFromWords = words.map(w => w[0]).join('').slice(0, 6);
    const base = keyFromWords || (title || 'PRJ').toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 6) || 'PRJ';
    return base.length >= 2 ? base : `${base}X`;
  }

  saveProject() {
    if (!this.selectedProject) return;
    const title = this.selectedProject.name?.trim() || 'Untitled Project';
    const payload = {
      title,
      description: this.selectedProject.description?.trim() || '',
      key: this.generateProjectKey(title),
      workspace_id: 1
    };

    this.apiService.createProject(payload).subscribe({
      next: (created) => {
        const normalized: Project = {
          id: (created.id ?? Date.now()).toString(),
          name: created.title || title,
          description: created.description || payload.description,
          status: created.is_active === false ? 'inactive' : 'active',
          progress: 0,
          startDate: new Date(),
          endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
          icon: 'folder',
          team: [],
          createdAt: created.created_at ? new Date(created.created_at) : new Date(),
          updatedAt: created.updated_at ? new Date(created.updated_at) : new Date()
        };
        // Refresh from backend to ensure DB persisted and to get server-calculated fields
        this.loadProjects();
        this.isCreating = false;
        this.showNotificationMessage('Project created successfully!');
        this.closeProjectDetail();
      },
      error: (error) => {
        
        if (error?.status === 403) {
          this.showNotificationMessage('You must be a member of this workspace to create a project.');
        } else if (error?.status === 400) {
          this.showNotificationMessage(error?.error?.detail || 'Invalid project data');
        } else {
          this.showNotificationMessage('Failed to create project');
        }
      }
    });
  }


  editProject(project: Project, event: Event) {
    event.stopPropagation();
    this.openProjectDetail(project);
    
  }

  deleteProject(project: Project, event: Event) {
    event.stopPropagation();
    if (confirm('Are you sure you want to delete this project?')) {
      // Call backend to delete (soft delete)
      this.apiService.deleteProject(Number(project.id)).subscribe({
        next: () => {
          const index = this.projects.findIndex(p => p.id === project.id);
          if (index !== -1) {
            this.projects.splice(index, 1);
          }
          this.showNotificationMessage('Project deleted successfully!');
        },
        error: (error) => {
          this.showNotificationMessage('Failed to delete project');
        }
      });
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
    }
  }

  removeTeamMember(member: TeamMember) {
    if (!this.selectedProject) return;
    
    const index = this.selectedProject.team.findIndex(m => m.id === member.id);
    if (index !== -1) {
      this.selectedProject.team.splice(index, 1);
      this.updateProject();
      this.showNotificationMessage('Team member removed successfully!');
    }
  }

  onViewChange(event: any) {
    this.currentView = event.value;
    
  }

  onFilterChange(event: any) {
    this.selectedFilter = event.value;
    
  }

  refreshProjects() {
    this.projects.forEach(project => {
      project.updatedAt = new Date();
    });
    this.showNotificationMessage('Projects refreshed!');
  }
}
