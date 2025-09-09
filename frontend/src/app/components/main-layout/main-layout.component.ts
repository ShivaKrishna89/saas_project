import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { WebSocketService } from '../../services/websocket.service';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.less']
})
export class MainLayoutComponent implements OnInit {
  currentUser: any = null;
  currentWorkspace: any = {
    id: '1',
    name: 'My Workspace'
  };
  currentView: string = 'tasks';

  constructor(
    private authService: AuthService,
    private router: Router,
    private webSocketService: WebSocketService,
    private apiService: ApiService
  ) {}

  ngOnInit() {
    this.loadCurrentUser();
    this.loadCurrentWorkspace();
  }

  loadCurrentUser() {
    this.currentUser = this.authService.currentUserValue;
    if (!this.currentUser) {
      this.router.navigate(['/auth/login']);
    }
  }

  loadCurrentWorkspace() {
    this.currentWorkspace = {
      id: '1',
      name: 'My Workspace'
    };
  }

  goHome() {
    this.router.navigate(['/workspace-selector']);
  }

  onSearchFocus() {
    console.log('Search focused');
  }

  toggleNotifications() {
    console.log('Toggle notifications');
  }

  openProfile() {
    console.log('Open profile');
  }

  openSettings() {
    console.log('Open settings');
  }

  openHelp() {
    this.router.navigate(['/help']);
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }

  navigateToTasks() {
    this.currentView = 'tasks';
    console.log('Navigate to tasks');
    // Log the click event
    this.apiService.getIssues().subscribe({
      next: () => console.log('Tasks clicked - event logged'),
      error: (error) => console.error('Failed to log tasks click:', error)
    });
  }

  navigateToProjects() {
    this.currentView = 'projects';
    console.log('Navigate to projects');
    // Log the click event
    this.apiService.getProjects(1).subscribe({
      next: () => console.log('Projects clicked - event logged'),
      error: (error) => console.error('Failed to log projects click:', error)
    });
  }

  navigateToTeam() {
    this.currentView = 'team';
    console.log('Navigate to team');
    // Log the click event
    this.apiService.getCurrentUser().subscribe({
      next: () => console.log('Team clicked - event logged'),
      error: (error) => console.error('Failed to log team click:', error)
    });
  }

  navigateToCalendar() {
    this.currentView = 'calendar';
    console.log('Navigate to calendar');
    // Log the click event
    this.apiService.getWorkspaces().subscribe({
      next: () => console.log('Calendar clicked - event logged'),
      error: (error) => console.error('Failed to log calendar click:', error)
    });
  }

  navigateToReports() {
    this.currentView = 'reports';
    console.log('Navigate to reports');
  }

  navigateToFiles() {
    this.currentView = 'files';
    console.log('Navigate to files');
  }
}