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
    this.router.navigate(['/app']);
  }

  createNewWorkspace() {
    this.router.navigate(['/app']);
  }

  openSettings() {
    // Feature not implemented yet
  }

  openSupport() {
    this.router.navigate(['/contact']);
  }

  openCommunity() {
    this.router.navigate(['/community']);
  }

  openDocs() {
    this.router.navigate(['/help']);
  }

  openApps() {
    // Not implemented
  }

  openLicensing() {
    this.router.navigate(['/pricing']);
  }

  takeTour() {
    // Not implemented
  }

  watchTutorial() {
    // Not implemented
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }

  goHome() {
    this.router.navigate(['/workspace-selector']);
  }
}