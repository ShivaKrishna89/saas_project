import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-workspace-selector',
  template: `
    <div class="workspace-home">
      <header class="header">
        <div class="brand">
          <mat-icon class="brand-mark">auto_awesome</mat-icon>
          <span class="brand-text brand">CollabX</span>
        </div>
        <button mat-stroked-button (click)="logout()">Sign out</button>
      </header>

      <div class="shell">
        <!-- Left nav (desktop) -->
        <aside class="left-nav">
          <div class="nav-section">
            <button class="nav-item active"><mat-icon>person</mat-icon><span>For you</span></button>
            <button class="nav-item"><mat-icon>history</mat-icon><span>Recent</span></button>
            <button class="nav-item"><mat-icon>notifications_none</mat-icon><span>Notifications</span></button>
          </div>
          <div class="nav-section muted">
            <button class="nav-item"><mat-icon>apps</mat-icon><span>View all apps</span></button>
          </div>
        </aside>

        <!-- Main content -->
        <main class="content">
          <!-- Hero banner -->
          <section class="hero-banner">
            <div class="hero-copy">
              <p class="date">{{ today }}</p>
              <h1>Hello, {{ currentUser?.full_name || 'there' }}</h1>
        </div>
            <div class="hero-art" aria-hidden="true"></div>
          </section>

          <!-- Helpful links header row -->
          <div class="row-head">
            <h2>Helpful links</h2>
            <button class="link-btn">Show all</button>
        </div>
          <!-- Helpful links grid -->
          <section class="help-grid">
            <mat-card class="help-card" *ngFor="let h of helpfulLinks" (click)="openHelp(h.href)">
              <div class="help-icon"><mat-icon>{{ h.icon }}</mat-icon></div>
              <div class="help-text">{{ h.label }}</div>
            </mat-card>
          </section>

          <!-- App tiles -->
          <section class="apps">
            <h2>Our apps</h2>
            <div class="app-grid">
              <div class="app-card" (click)="nav('/apps/projects')">
                <div class="icon projects"><mat-icon>view_kanban</mat-icon></div>
                <div>
                  <h3>Projects</h3>
                  <p class="muted">Plan, track and deliver</p>
                </div>
              </div>
              <div class="app-card" (click)="nav('/apps/docs')">
                <div class="icon docs"><mat-icon>description</mat-icon></div>
                <div>
                  <h3>Docs</h3>
                  <p class="muted">Team knowledge base</p>
                </div>
              </div>
              <div class="app-card" (click)="nav('/apps/devex')">
                <div class="icon devex"><mat-icon>explore</mat-icon></div>
                <div>
                  <h3>DevEx</h3>
                  <p class="muted">Developer experience</p>
                </div>
              </div>
              <div class="app-card" (click)="nav('/apps/service')">
                <div class="icon service"><mat-icon>support_agent</mat-icon></div>
                <div>
                  <h3>Service Desk</h3>
                  <p class="muted">Requests & operations</p>
                </div>
              </div>
            </div>
          </section>

          <!-- Workspaces list -->
          <section class="workspaces">
            <h2>Your workspaces</h2>
          <div class="workspaces-list">
              <mat-card *ngFor="let workspace of workspaces" class="workspace-card" (click)="launchWorkspace(workspace)">
              <mat-card-content>
                <div class="workspace-info">
                    <div class="workspace-avatar"><span>{{ workspace.name.charAt(0).toUpperCase() }}</span></div>
                  <div class="workspace-details">
                    <h3 class="workspace-name">{{ workspace.name }}</h3>
                    <p class="workspace-description">{{ workspace.description }}</p>
                      <div class="workspace-meta">
                        <span class="workspace-members">{{ workspace.memberCount }} members</span>
                        <span class="workspace-status" [class.active]="workspace.isActive">{{ workspace.isActive ? 'Active' : 'Inactive' }}</span>
                      </div>
                  </div>
                    <mat-icon class="launch-icon">open_in_new</mat-icon>
                </div>
              </mat-card-content>
            </mat-card>
          </div>
          </section>
        </main>
      </div>
    </div>
  `,
  styles: [`
    .workspace-home { min-height:100vh; background:#f6f7fb; display:flex; flex-direction:column; overflow-y:auto; -webkit-overflow-scrolling: touch; }

    /* Header */
    .header { position:sticky; top:0; z-index:3; display:flex; align-items:center; justify-content:space-between; padding:14px 24px; background:#ffffff; border-bottom:1px solid #eceff3; }
    .brand { display:flex; align-items:center; gap:8px; }
    .brand-mark { color:#6a11cb; }
    .brand-text { font-weight:700; font-size:18px; color:#222; font-family:'Poppins','Inter',sans-serif; letter-spacing:.2px; }

    /* Shell with left nav */
    .shell { display:grid; grid-template-columns: 240px 1fr; gap:24px; max-width: 1280px; width:100%; margin: 0 auto; padding: 20px 16px 64px; }
    .left-nav { display:block; }
    .nav-section { display:flex; flex-direction:column; gap:6px; margin-bottom:16px; }
    .nav-section.muted { opacity:.9; }
    .nav-item { display:flex; align-items:center; gap:10px; padding:10px 12px; border-radius:8px; border:1px solid transparent; background:transparent; color:#111; cursor:pointer; text-align:left; }
    .nav-item.active, .nav-item:hover { background:#ffffff; border-color:#e8ebf1; box-shadow: 0 4px 12px rgba(17,24,39,.06); }

    /* Main content */
    .content { min-width:0; }

    /* Hero */
    .hero-banner { height: 180px; border-radius: 14px; background: linear-gradient(135deg,#9bbcf7,#6ea0f1); display:flex; align-items:center; justify-content:space-between; padding: 20px 24px; color:#0b2a4a; box-shadow: 0 8px 24px rgba(0,0,0,.08); }
    .hero-copy h1 { margin: 6px 0 0 0; font-size: 28px; font-weight: 700; }
    .date { margin: 0; opacity: .85; font-weight: 500; }
    .hero-art { width: 46%; height: 100%; background: radial-gradient(800px 220px at 20% -40%, rgba(255,255,255,.35), transparent 70%); border-radius: 12px; }

    /* Helpful links */
    .row-head { margin: 20px 0 10px; display:flex; align-items:center; justify-content:space-between; }
    .link-btn { background:transparent; border:none; color:#4f46e5; font-weight:600; cursor:pointer; }

    .help-grid { display:grid; grid-template-columns: repeat(3,minmax(220px,1fr)); gap:14px; }
    .help-card { display:flex; align-items:center; gap:12px; padding:16px; border-radius:12px; cursor:pointer; border:1px solid #e8ebf1; box-shadow: 0 6px 16px rgba(17,24,39,.04); background:#fff; transition: box-shadow .2s, transform .2s; }
    .help-card:hover { box-shadow:0 12px 28px rgba(17,24,39,.08); transform: translateY(-2px); }
    .help-icon { width:40px; height:40px; border-radius:8px; background:#eef2ff; color:#334155; display:flex; align-items:center; justify-content:center; }
    .help-text { color:#111827; font-weight:600; }

    /* Apps */
    .apps h2 { margin: 24px 0 12px; }
    .app-grid { display:grid; grid-template-columns: repeat(4,minmax(220px,1fr)); gap:14px; }
    .app-card { background:#fff; border:1px solid #e8ebf1; border-radius:14px; padding:16px; display:flex; gap:12px; align-items:center; cursor:pointer; transition: box-shadow .2s, transform .2s; }
    .app-card:hover { box-shadow:0 12px 28px rgba(17,24,39,.08); transform: translateY(-2px); }
    .icon { width:40px; height:40px; border-radius:10px; display:flex; align-items:center; justify-content:center; color:#fff; }
    .icon.projects { background:#1976d2; }
    .icon.docs { background:#7e57c2; }
    .icon.devex { background:#26a69a; }
    .icon.service { background:#2e7d32; }
    .app-card h3 { margin:0 0 2px 0; font-size:16px; color:#111; }
    .muted { color: rgba(0,0,0,.6); margin:0; }

    /* Workspaces */
    .workspaces { margin-top: 8px; }
    .workspaces-list { display:flex; flex-direction:column; gap:10px; }
    .workspace-card { cursor:pointer; border:1px solid #e8ebf1; border-radius:14px; background:#fff; box-shadow: 0 6px 16px rgba(17,24,39,.04); }
    .workspace-info { display:flex; align-items:center; gap:16px; }
    .workspace-avatar { width:44px; height:44px; background:linear-gradient(135deg,#4a154b,#611f69); color:#fff; border-radius:10px; display:flex; align-items:center; justify-content:center; font-weight:700; }
    .workspace-name { margin:0 0 4px 0; font-size:16px; color:#111; }
    .workspace-description { margin:0 0 8px 0; color:rgba(0,0,0,.6); }
    .workspace-meta { display:flex; gap:16px; color:rgba(0,0,0,.6); }
    .workspace-status.active { color:#2e7d32; background:#e8f5e9; padding:2px 8px; border-radius:12px; }
    .launch-icon { color: rgba(0,0,0,.45); margin-left:auto; }

    /* Mobile tweaks */
    @media (max-width:1024px){
      .shell{ grid-template-columns: 1fr; }
      .left-nav{ display:none; }
      .help-grid{ grid-template-columns: repeat(2,minmax(160px,1fr)); }
      .app-grid{ grid-template-columns: repeat(2,minmax(160px,1fr)); }
    }
    @media (max-width:768px){
      .shell{ padding: 16px 12px 56px; }
      .hero-banner{ height:auto; padding:16px; }
      .hero-copy h1{ font-size:22px; }
      .date{ font-size:12px; }
      .help-grid, .app-grid{ grid-template-columns: 1fr; gap:10px; }
      .help-card, .app-card{ padding:12px; border-radius:12px; }
      .icon{ width:36px; height:36px; }
    }
  `]
})
export class WorkspaceSelectorComponent implements OnInit {
  currentUser: any = null;
  workspaces: any[] = [];
  today: string = new Date().toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' });

  helpfulLinks = [
    { icon: 'settings', label: 'Account settings', href: '#' },
    { icon: 'help_outline', label: 'Support', href: '#' },
    { icon: 'groups', label: 'Community', href: '#' },
    { icon: 'fact_check', label: 'Licensing', href: '#' },
    { icon: 'article', label: 'Docs', href: '#' },
    { icon: 'widgets', label: 'Try CollabX apps', href: '#' }
  ];

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadCurrentUser();
    this.loadWorkspaces();
  }

  loadCurrentUser() {
    this.currentUser = this.authService.currentUserValue || { email: 'user@example.com', full_name: 'Current User' };
  }

  loadWorkspaces() {
    this.workspaces = [
      { id:1, name:'Acme Corporation', description:'Main workspace for Acme Corp team', memberCount:24, isActive:true },
      { id:2, name:'Project Alpha', description:'Development team workspace', memberCount:8, isActive:true },
      { id:3, name:'Marketing Team', description:'Marketing and communications', memberCount:12, isActive:false }
    ];
  }

  getUserInitials(): string {
    if (this.currentUser?.full_name) {
      return this.currentUser.full_name.split(' ').map((n: string) => n[0]).join('').toUpperCase();
    }
    return 'CU';
  }

  openHelp(href: string) { /* placeholder for internal links */ }
  nav(path: string) { this.router.navigate([path]); }
  launchWorkspace(workspace: any) { localStorage.setItem('selectedWorkspace', JSON.stringify(workspace)); this.router.navigate(['/app']); }
  logout() { this.authService.logout(); this.router.navigate(['/']); }
}
