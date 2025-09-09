import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-workspace-selector',
  templateUrl: './workspace-selector.component.html',
  styleUrls: ['./workspace-selector.component.less']
})
export class WorkspaceSelectorComponent implements OnInit {
  currentUser: any = null;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadCurrentUser();
  }

  loadCurrentUser() {
    this.currentUser = this.authService.currentUserValue;
    if (!this.currentUser) {
      this.router.navigate(['/auth/login']);
    }
  }

  launchWorkspace(workspaceId: string) {
    console.log('Launching workspace:', workspaceId);
    // For now, just navigate to the main app
    this.router.navigate(['/app']);
  }

  createNewWorkspace() {
    console.log('Creating new workspace...');
    // For now, just navigate to the main app
    this.router.navigate(['/app']);
  }

  openSettings() {
    console.log('Opening settings...');
    // TODO: Implement settings modal or page
    alert('Settings feature coming soon!');
  }

  openSupport() {
    console.log('Opening support...');
    this.router.navigate(['/contact']);
  }

  openCommunity() {
    console.log('Opening community...');
    this.router.navigate(['/community']);
  }

  openDocs() {
    console.log('Opening documentation...');
    this.router.navigate(['/help']);
  }

  openApps() {
    console.log('Opening apps page...');
    // TODO: Implement apps download page
    alert('Mobile and desktop apps coming soon!');
  }

  openLicensing() {
    console.log('Opening licensing...');
    this.router.navigate(['/pricing']);
  }

  takeTour() {
    console.log('Starting tour...');
    // TODO: Implement interactive tour
    alert('Interactive tour coming soon!');
  }

  watchTutorial() {
    console.log('Opening tutorial...');
    // TODO: Implement tutorial video
    alert('Video tutorials coming soon!');
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }

  goHome() {
    this.router.navigate(['/workspace-selector']);
  }
}