import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-placeholder',
  template: `
    <div class="placeholder-page">
      <!-- Navigation -->
      <mat-toolbar class="navbar">
        <div class="nav-container">
          <div class="nav-left">
            <div class="logo" (click)="goHome()">
              <mat-icon class="logo-mark">auto_awesome</mat-icon>
              <span class="logo-text brand">CollabX</span>
            </div>
          </div>
          
          <div class="nav-center">
            <a [routerLink]="['/']" class="nav-link" [class.active]="pageType === 'features'">Product</a>
            <a [routerLink]="['/solutions']" class="nav-link" [class.active]="pageType === 'solutions'">Solutions</a>
            <a [routerLink]="['/enterprise']" class="nav-link" [class.active]="pageType === 'enterprise'">Enterprise</a>
            <a [routerLink]="['/resources']" class="nav-link" [class.active]="pageType === 'resources'">Resources</a>
            <a [routerLink]="['/pricing']" class="nav-link" [class.active]="pageType === 'pricing'">Pricing</a>
          </div>
          
          <div class="nav-right">
            <button mat-raised-button color="primary" class="nav-button cta-btn" (click)="navigateToRegister()">
              Get Started Free
            </button>
            <button mat-stroked-button color="primary" class="nav-button sign-in-outline" (click)="navigateToLogin()">Sign in</button>
          </div>
        </div>
      </mat-toolbar>

      <!-- Hero Section for all pages -->
      <section class="hero-section" [ngClass]="'hero-' + pageType">
        <div class="hero-inner">
          <div class="hero-copy">
            <div class="trusted-banner">
              <mat-icon>star</mat-icon>
              <span>Trusted by 10M+ users worldwide</span>
            </div>
            <h1 [innerHTML]="getHeroTitle()"></h1>
            <p class="subtitle">{{ getHeroSubtitle() }}</p>
            <div class="hero-ctas">
              <button mat-raised-button color="accent" (click)="navigateToRegister()">
                <mat-icon>rocket_launch</mat-icon>
                {{ getPrimaryButtonText() }}
              </button>
              <button *ngIf="getSecondaryButtonText()" mat-stroked-button color="accent" (click)="navigateToContact()">
                <mat-icon>play_arrow</mat-icon>
                {{ getSecondaryButtonText() }}
              </button>
            </div>
            <div class="hero-badges">
              <span *ngFor="let badge of getHeroBadges()" class="badge">{{ badge }}</span>
            </div>
          </div>
          <div class="hero-panel">
            <mat-card class="app-mockup">
              <div class="mockup-header">
                <div class="mockup-tabs">
                  <span class="tab active">Dashboard</span>
                  <span class="tab">Projects</span>
                  <span class="tab">Team</span>
                  <span class="tab">Analytics</span>
                </div>
                <div class="mockup-actions">
                  <mat-icon>notifications</mat-icon>
                  <mat-icon>search</mat-icon>
                  <div class="user-avatar">U</div>
                </div>
              </div>
              <div class="mockup-content">
                <div class="mockup-card">
                  <h4>Project Progress</h4>
                  <div class="progress-bar">
                    <div class="progress-fill" style="width: 75%"></div>
                  </div>
                  <p>75% Complete</p>
                </div>
                <div class="mockup-card">
                  <h4>Team Activity</h4>
                  <div class="activity-item">Sarah completed task</div>
                  <div class="activity-item">Mike shared document</div>
                </div>
                <div class="mockup-card">
                  <h4>Recent Messages</h4>
                  <div class="message-item">
                    <strong>Alex:</strong> Great work on the presentation!
                  </div>
                </div>
              </div>
            </mat-card>
          </div>
        </div>
      </section>

      <!-- Stats Section -->
      <section class="stats-section">
        <div class="container">
          <div class="stats-grid">
            <div class="stat-item">
              <div class="stat-number">99.9%</div>
              <div class="stat-label">Uptime</div>
            </div>
            <div class="stat-item">
              <div class="stat-number">50+</div>
              <div class="stat-label">Integrations</div>
            </div>
            <div class="stat-item">
              <div class="stat-number">24/7</div>
              <div class="stat-label">Support</div>
            </div>
          </div>
        </div>
      </section>

      <!-- Footer -->
      <footer class="footer">
        <div class="container">
          <div class="footer-content">
            <div class="footer-section" *ngFor="let section of getFooterSections()">
              <h4>{{ section.title }}</h4>
              <a *ngFor="let link of section.links" [routerLink]="['/' + link.route]" class="footer-link">
                {{ link.name }}
              </a>
            </div>
          </div>
          <div class="footer-bottom">
            <div class="footer-left">
              <div class="footer-logo">
                <mat-icon class="logo-mark">auto_awesome</mat-icon>
                <span class="logo-text">CollabX</span>
              </div>
              <p>&copy; 2024 CollabX. All rights reserved.</p>
            </div>
            <div class="footer-right">
              <a href="#" class="footer-link">Privacy</a>
              <a href="#" class="footer-link">Terms</a>
              <a href="#" class="footer-link">Cookies</a>
              <a href="#" class="footer-link">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  `,
  styles: [`
    .placeholder-page {
      font-family: 'Inter', 'Roboto', sans-serif;
      line-height: 1.6;
      color: #1a1a1a;
    }

    /* Navigation */
    .navbar { 
      position: fixed; 
      top: 0; 
      left: 0; 
      right: 0; 
      background: rgba(255,255,255,.95); 
      backdrop-filter: blur(10px); 
      border-bottom: 1px solid #e0e0e0; 
      z-index: 1000; 
      padding: 8px 0; 
    }
    .nav-container { 
      max-width: 1200px; 
      margin: 0 auto; 
      padding: 0 24px; 
      display: flex; 
      align-items: center; 
      justify-content: space-between; 
      gap: 16px; 
    }
    .nav-left { display: flex; align-items: center; }
    .logo { 
      display: flex; 
      align-items: center; 
      gap: 8px; 
      cursor: pointer; 
    }
    .logo-mark { 
      background: linear-gradient(135deg,#6a11cb,#2575fc); 
      -webkit-background-clip: text; 
      background-clip: text; 
      color: transparent; 
      font-size: 28px; 
    }
    .logo-text { 
      font-size: 24px; 
      font-weight: 800; 
      letter-spacing: .2px; 
      color: #1a1a1a; 
      font-family: 'Poppins','Inter',sans-serif; 
    }
    .nav-center { 
      display: flex; 
      gap: 32px; 
      align-items: center; 
    }
    .nav-link { 
      color: #1a1a1a; 
      text-decoration: none; 
      font-weight: 500; 
      transition: color .2s; 
      cursor: pointer; 
      font-size: 16px;
    }
    .nav-link:hover, .nav-link.active { 
      color: #4a154b; 
    }
    .nav-right { 
      display: flex; 
      gap: 12px; 
      align-items: center; 
    }
    .nav-button { 
      font-weight: 600; 
      padding: 8px 16px;
    }
    .cta-btn { 
      font-weight: 700; 
      background: linear-gradient(135deg,#6a11cb,#2575fc) !important;
      color: white !important;
    }
    .sign-in-outline { 
      border-color: #4a154b !important; 
      background: #ffffff !important; 
      color: #4a154b !important;
    }

    /* Hero sections for different page types - all with white background */
    .hero-features { 
      padding: 120px 0 80px; 
      background: #ffffff; 
      color: #1a1a1a; 
    }
    .hero-solutions { 
      padding: 120px 0 80px; 
      background: #ffffff; 
      color: #1a1a1a; 
    }
    .hero-enterprise { 
      padding: 120px 0 80px; 
      background: #ffffff; 
      color: #1a1a1a; 
    }
    .hero-resources { 
      padding: 120px 0 80px; 
      background: #ffffff; 
      color: #1a1a1a; 
    }
    .hero-pricing { 
      padding: 120px 0 80px; 
      background: #ffffff; 
      color: #1a1a1a; 
    }
    
    .hero-inner { 
      max-width: 1200px; 
      margin: 0 auto; 
      padding: 0 24px; 
      display: grid; 
      grid-template-columns: 1.2fr .8fr; 
      gap: 48px; 
      align-items: start; /* Changed from center to start for consistent alignment */
      min-height: 400px; /* Fixed minimum height to prevent shifting */
    }
    
    .trusted-banner {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 14px;
      color: #666;
      margin-bottom: 24px;
    }
    
    .hero-copy h1 { 
      font-size: 56px; 
      line-height: 1.1; 
      margin: 0 0 16px; 
      font-weight: 700;
      color: #1a1a1a;
      min-height: 62px; /* Fixed height to prevent shifting */
    }
    .hero-copy .muted { 
      color: #666; 
    }
    .hero-copy .accent { 
      color: #4a154b; 
    }
    .subtitle { 
      font-size: 18px; 
      color: #666; 
      margin: 0 0 32px; 
      max-width: 620px; 
      line-height: 1.5;
      min-height: 54px; /* Fixed height to prevent shifting */
    }
    .hero-ctas { 
      display: flex; 
      gap: 16px; 
      margin-bottom: 24px; 
      min-height: 48px; /* Fixed height to prevent shifting */
    }
    .hero-ctas button {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 12px 24px;
      font-weight: 600;
    }
    .hero-badges { 
      display: flex; 
      gap: 8px; 
      flex-wrap: wrap; 
      min-height: 32px; /* Fixed height to prevent shifting */
    }
    .badge { 
      background: #f8f9fa; 
      border: 1px solid #e0e0e0; 
      padding: 6px 12px; 
      border-radius: 999px; 
      font-size: 12px; 
      font-weight: 500;
      color: #666;
    }
    
    .hero-panel { 
      display: flex; 
      justify-content: center; 
      align-items: flex-start; /* Consistent alignment */
      padding-top: 0; /* Remove any top padding that might cause shifting */
    }
    .app-mockup { 
      width: 100%; 
      max-width: 420px; 
      border-radius: 12px; 
      box-shadow: 0 20px 60px rgba(0,0,0,.25); 
      background: white;
      overflow: hidden;
      position: relative; /* Ensure consistent positioning */
    }
    
    .mockup-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 16px 20px;
      border-bottom: 1px solid #e0e0e0;
      background: #f8f9fa;
    }
    
    .mockup-tabs {
      display: flex;
      gap: 16px;
    }
    
    .tab {
      font-size: 14px;
      font-weight: 500;
      color: #666;
      cursor: pointer;
    }
    
    .tab.active {
      color: #4a154b;
      font-weight: 600;
    }
    
    .mockup-actions {
      display: flex;
      align-items: center;
      gap: 12px;
    }
    
    .user-avatar {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      background: linear-gradient(135deg,#6a11cb,#2575fc);
      color: white;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 600;
      font-size: 14px;
    }
    
    .mockup-content {
      padding: 20px;
      display: flex;
      flex-direction: column;
      gap: 16px;
    }
    
    .mockup-card {
      background: #f8f9fa;
      border-radius: 8px;
      padding: 16px;
    }
    
    .mockup-card h4 {
      margin: 0 0 12px;
      font-size: 14px;
      font-weight: 600;
      color: #1a1a1a;
    }
    
    .progress-bar {
      width: 100%;
      height: 8px;
      background: #e0e0e0;
      border-radius: 4px;
      overflow: hidden;
      margin-bottom: 8px;
    }
    
    .progress-fill {
      height: 100%;
      background: linear-gradient(135deg,#6a11cb,#2575fc);
      border-radius: 4px;
    }
    
    .activity-item, .message-item {
      font-size: 12px;
      color: #666;
      margin-bottom: 4px;
    }
    
    .message-item strong {
      color: #1a1a1a;
    }

    /* Stats Section */
    .stats-section {
      padding: 60px 0;
      background: #f8f9fa;
    }
    
    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 24px;
    }
    
    .stats-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 40px;
      text-align: center;
    }
    
    .stat-item {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    
    .stat-number {
      font-size: 48px;
      font-weight: 700;
      color: #4a154b;
      margin-bottom: 8px;
    }
    
    .stat-label {
      font-size: 16px;
      color: #666;
      font-weight: 500;
    }

    /* Footer */
    .footer { 
      background: #f5f5f5; 
      padding: 60px 0 24px; 
    }
    .footer-content { 
      display: grid; 
      grid-template-columns: repeat(4, 1fr); 
      gap: 40px; 
      margin-bottom: 40px; 
    }
    .footer-section h4 { 
      font-weight: 600; 
      margin-bottom: 16px; 
      color: #1a1a1a; 
    }
    .footer-link { 
      display: block; 
      color: rgba(0,0,0,0.7); 
      text-decoration: none; 
      margin-bottom: 8px; 
      transition: color .2s; 
      cursor: pointer; 
    }
    .footer-link:hover { 
      color: #1a1a1a; 
    }
    .footer-bottom { 
      border-top: 1px solid #e0e0e0; 
      padding-top: 24px; 
      display: flex; 
      justify-content: space-between; 
      align-items: center; 
    }
    .footer-left { 
      display: flex; 
      align-items: center; 
      gap: 16px; 
    }
    .footer-logo { 
      display: flex; 
      align-items: center; 
      gap: 8px; 
    }
    .footer-right { 
      display: flex; 
      gap: 24px; 
    }

    @media (max-width: 768px) {
      .nav-center { display: none; }
      .hero-inner { 
        grid-template-columns: 1fr; 
        gap: 24px; 
        text-align: center; 
      }
      .hero-copy h1 {
        font-size: 40px;
      }
      .stats-grid {
        grid-template-columns: 1fr;
        gap: 24px;
      }
      .footer-content { 
        grid-template-columns: repeat(2,1fr); 
      }
      .footer-bottom { 
        flex-direction: column; 
        gap: 16px; 
        text-align: center; 
      }
    }
  `]
})
export class PlaceholderComponent implements OnInit {
  @Input() pageType: string = 'features';


  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.data.subscribe(data => {
      if (data['pageType']) {
        this.pageType = data['pageType'];
      }
    });
  }

  getHeroTitle(): string {
    const titles: { [key: string]: string } = {
      'features': 'The future of <span class="accent">team</span> <span class="accent">collaboration</span> is here',
      'solutions': 'The future of <span class="accent">team</span> <span class="accent">collaboration</span> is here',
      'enterprise': 'The future of <span class="accent">team</span> <span class="accent">collaboration</span> is here',
      'resources': 'The future of <span class="accent">team</span> <span class="accent">collaboration</span> is here',
      'pricing': 'The future of <span class="accent">team</span> <span class="accent">collaboration</span> is here'
    };
    return titles[this.pageType] || 'Welcome to <span class="accent">CollabX</span>';
  }

  getHeroSubtitle(): string {
    const subtitles: { [key: string]: string } = {
      'features': 'Transform how your team works together with AI-powered productivity tools, seamless integrations, and real-time collaboration that actually makes work fun.',
      'solutions': 'Transform how your team works together with AI-powered productivity tools, seamless integrations, and real-time collaboration that actually makes work fun.',
      'enterprise': 'Transform how your team works together with AI-powered productivity tools, seamless integrations, and real-time collaboration that actually makes work fun.',
      'resources': 'Transform how your team works together with AI-powered productivity tools, seamless integrations, and real-time collaboration that actually makes work fun.',
      'pricing': 'Transform how your team works together with AI-powered productivity tools, seamless integrations, and real-time collaboration that actually makes work fun.'
    };
    return subtitles[this.pageType] || 'Discover the power of modern collaboration.';
  }

  getPrimaryButtonText(): string {
    const buttons: { [key: string]: string } = {
      'features': 'Start Free Trial',
      'solutions': 'Start Free Trial',
      'enterprise': 'Start Free Trial',
      'resources': 'Start Free Trial',
      'pricing': 'Start Free Trial'
    };
    return buttons[this.pageType] || 'Get started';
  }

  getSecondaryButtonText(): string | null {
    const buttons: { [key: string]: string | null } = {
      'features': 'Watch Demo',
      'solutions': 'Watch Demo',
      'enterprise': 'Watch Demo',
      'resources': 'Watch Demo',
      'pricing': 'Watch Demo'
    };
    return buttons[this.pageType] || null;
  }

  getHeroBadges(): string[] {
    const badges: { [key: string]: string[] } = {
      'features': ['Lists', 'Boards', 'Timeline', 'AI summaries'],
      'solutions': ['Lists', 'Boards', 'Timeline', 'AI summaries'],
      'enterprise': ['Lists', 'Boards', 'Timeline', 'AI summaries'],
      'resources': ['Lists', 'Boards', 'Timeline', 'AI summaries'],
      'pricing': ['Lists', 'Boards', 'Timeline', 'AI summaries']
    };
    return badges[this.pageType] || [];
  }

  getFooterSections(): any[] {
    return [
      {
        title: 'Product',
        links: [
          { name: 'Product', route: '' },
          { name: 'Solutions', route: 'solutions' },
          { name: 'Pricing', route: 'pricing' },
          { name: 'Enterprise', route: 'enterprise' }
        ]
      },
      {
        title: 'Company',
        links: [
          { name: 'About', route: 'about' },
          { name: 'Careers', route: 'careers' },
          { name: 'Contact', route: 'contact' },
          { name: 'Blog', route: 'blog' }
        ]
      },
      {
        title: 'Resources',
        links: [
          { name: 'Help Center', route: 'help' },
          { name: 'Developers', route: 'developers' },
          { name: 'API', route: 'api' },
          { name: 'Community', route: 'community' }
        ]
      },
      {
        title: 'Legal',
        links: [
          { name: 'Privacy', route: 'privacy' },
          { name: 'Terms', route: 'terms' },
          { name: 'Security', route: 'security' },
          { name: 'Cookies', route: 'cookies' }
        ]
      }
    ];
  }

  goHome() { this.router.navigate(['/']); }
  navigateToLogin() { this.router.navigate(['/auth/login']); }
  navigateToRegister() { this.router.navigate(['/auth/register']); }
  navigateToResources() { this.router.navigate(['/resources']); }
  navigateToContact() { this.router.navigate(['/contact']); }
  navigateToSecurity() { this.router.navigate(['/security']); }
}
