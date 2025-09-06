import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  template: `
    <div class="slack-landing">
      <!-- Navigation -->
      <mat-toolbar class="navbar">
        <div class="nav-container">
          <div class="nav-left">
            <div class="logo" (click)="scrollToTop()">
              <mat-icon class="logo-icon">chat</mat-icon>
              <span class="logo-text brand">CollabX</span>
            </div>
          </div>
          
          <div class="nav-center">
            <a [routerLink]="['/']" class="nav-link">Home</a>
            <a [routerLink]="['/solutions']" class="nav-link">Solutions</a>
            <a [routerLink]="['/enterprise']" class="nav-link">Enterprise</a>
            <a [routerLink]="['/resources']" class="nav-link">Resources</a>
            <a [routerLink]="['/pricing']" class="nav-link">Pricing</a>
          </div>
          
          <div class="nav-right">
            <button mat-raised-button color="primary" class="nav-button cta-btn" (click)="navigateToRegister()">
              Create a New Workspace
            </button>
            <button mat-stroked-button color="primary" class="nav-button sign-in-btn" (click)="navigateToLogin()">Sign in</button>
          </div>
        </div>
      </mat-toolbar>

      <!-- Hero Section -->
      <section class="hero" id="hero">
        <div class="hero-container">
          <div class="hero-content">
            <h1 class="hero-title">
              Great teamwork starts with a 
              <span class="highlight">digital HQ</span>
            </h1>
            <p class="hero-subtitle">
              Transform the way you work with one place for everyone and everything you need to get stuff done.
            </p>
            <div class="hero-actions">
              <button mat-raised-button color="accent" class="hero-button primary" (click)="navigateToRegister()">
                Try for Free
              </button>
              <button mat-stroked-button class="hero-button secondary" (click)="navigateToContact()">
                Talk to Sales
              </button>
            </div>
            <p class="hero-note">
              No credit card required • Free forever
            </p>
          </div>
          <div class="hero-image">
            <div class="hero-visual">
              <div class="floating-card card-1">
                <div class="card-header">
                  <div class="avatars">
                    <div class="avatar">JD</div>
                    <div class="avatar">JS</div>
                    <div class="avatar">MJ</div>
                  </div>
                  <span class="channel-name"># general</span>
                </div>
                <div class="card-messages">
                  <div class="message">
                    <div class="message-avatar">JD</div>
                    <div class="message-content">
                      <div class="message-header">
                        <span class="message-author">John Doe</span>
                        <span class="message-time">2:30 PM</span>
                      </div>
                      <div class="message-text">Hey team! How's the project going? 🚀</div>
                    </div>
                  </div>
                  <div class="message">
                    <div class="message-avatar">JS</div>
                    <div class="message-content">
                      <div class="message-header">
                        <span class="message-author">Jane Smith</span>
                        <span class="message-time">2:32 PM</span>
                      </div>
                      <div class="message-text">Great progress! We're on track for the deadline.</div>
                    </div>
                  </div>
                  <div class="message">
                    <div class="message-avatar">MJ</div>
                    <div class="message-content">
                      <div class="message-header">
                        <span class="message-author">Mike Johnson</span>
                        <span class="message-time">2:35 PM</span>
                      </div>
                      <div class="message-text">Perfect! Let's keep up the momentum 💪</div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="floating-card card-2">
                <div class="notification">
                  <mat-icon>notifications</mat-icon>
                  <span>3 new messages</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Trust Section -->
      <section class="trust">
        <div class="container">
          <p class="trust-text">Trusted by companies all over the world</p>
          <div class="trust-logos">
            <div class="logo-item">Airbnb</div>
            <div class="logo-item">Uber</div>
            <div class="logo-item">Spotify</div>
            <div class="logo-item">Netflix</div>
            <div class="logo-item">Salesforce</div>
            <div class="logo-item">Shopify</div>
          </div>
        </div>
      </section>

      <!-- Features Section -->
      <section class="features" id="features">
        <div class="container">
          <h2 class="section-title">Everything you need to work together</h2>
          <mat-grid-list cols="3" rowHeight="300px" gutterSize="24px">
            <mat-grid-tile *ngFor="let feature of features">
              <mat-card class="feature-card">
                <mat-card-content>
                  <mat-icon class="feature-icon">{{ feature.icon }}</mat-icon>
                  <h3>{{ feature.title }}</h3>
                  <p>{{ feature.description }}</p>
                </mat-card-content>
              </mat-card>
            </mat-grid-tile>
          </mat-grid-list>
        </div>
      </section>

      <!-- Solutions Section -->
      <section class="solutions" id="solutions">
        <div class="container">
          <h2 class="section-title">Solutions for every team</h2>
          <mat-grid-list cols="4" rowHeight="200px" gutterSize="24px">
            <mat-grid-tile *ngFor="let solution of solutions">
              <mat-card class="solution-card" (click)="navigateToSolution(solution.route)">
                <mat-card-content>
                  <h3>{{ solution.title }}</h3>
                  <p>{{ solution.description }}</p>
                </mat-card-content>
              </mat-card>
            </mat-grid-tile>
          </mat-grid-list>
        </div>
      </section>

      <!-- Enterprise Section -->
      <section class="enterprise" id="enterprise">
        <div class="container">
          <div class="enterprise-content">
            <div class="enterprise-text">
              <h2>Enterprise-grade security</h2>
              <p>Keep your data secure with enterprise-grade security features that meet the most stringent compliance requirements.</p>
              <button mat-raised-button color="primary" (click)="navigateToEnterprise()">
                Learn more
              </button>
            </div>
            <div class="enterprise-visual">
              <mat-icon class="security-icon">security</mat-icon>
            </div>
          </div>
        </div>
      </section>

      <!-- CTA Section -->
      <section class="cta">
        <div class="container">
          <h2>Ready to get started?</h2>
          <p>Join thousands of teams who are already using CollabX to work better together.</p>
          <div class="cta-buttons">
            <button mat-raised-button color="accent" class="cta-button" (click)="navigateToRegister()">
              Start your free trial
            </button>
            <button mat-stroked-button class="cta-button" (click)="talkToSales()">
              Talk to Sales
            </button>
          </div>
        </div>
      </section>

      <!-- Footer -->
      <footer class="footer">
        <div class="container">
          <div class="footer-content">
            <div class="footer-section" *ngFor="let section of footerSections">
              <h4>{{ section.title }}</h4>
              <a *ngFor="let link of section.links" [routerLink]="['/' + link.route]" class="footer-link">
                {{ link.name }}
              </a>
            </div>
          </div>
          <div class="footer-bottom">
            <div class="footer-left">
              <div class="footer-logo">
                <mat-icon class="logo-icon">chat</mat-icon>
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
    .slack-landing {
      font-family: 'Roboto', sans-serif;
      line-height: 1.6;
      color: #1a1a1a;
    }

    /* Navigation */
    .navbar {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      background: rgba(255, 255, 255, 0.95);
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
      justify-content: flex-start;
      gap: 16px;
    }

    .nav-left .logo {
      display: flex;
      align-items: center;
      gap: 8px;
      cursor: pointer;
    }

    .logo-icon {
      color: #4a154b;
      font-size: 32px;
      width: 32px;
      height: 32px;
    }

    .logo-text {
      font-size: 24px;
      font-weight: 800;
      font-family: 'Poppins', 'Inter', sans-serif;
      letter-spacing: .2px;
      color: #1a1a1a;
    }

    .nav-center {
      display: flex;
      gap: 24px;
      margin-left: 8px;
    }

    .nav-link {
      color: #1a1a1a;
      text-decoration: none;
      font-weight: 500;
      transition: color 0.2s;
      cursor: pointer;
    }

    .nav-link:hover {
      color: #4a154b;
    }

    .nav-right {
      display: flex;
      gap: 8px;
      align-items: center;
      margin-left: 8px; /* keep buttons tight after Pricing */
    }
    .link-btn { font-weight:600; }
    .cta-btn { font-weight:700; }
    .sign-in-btn { background: #ffffff; border-color: currentColor !important; }

    .nav-button {
      font-weight: 600;
    }

    /* Hero Section */
    .hero {
      padding: 120px 0 80px;
      background: linear-gradient(135deg, #4a154b 0%, #611f69 100%);
      color: white;
      min-height: 100vh;
      display: flex;
      align-items: center;
    }

    .hero-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 24px;
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 80px;
      align-items: center;
    }

    .hero-title {
      font-size: 48px;
      font-weight: 700;
      line-height: 1.2;
      margin-bottom: 24px;
    }

    .highlight {
      color: #ecb22e;
    }

    .hero-subtitle {
      font-size: 20px;
      margin-bottom: 32px;
      opacity: 0.9;
    }

    .hero-actions {
      display: flex;
      gap: 16px;
      margin-bottom: 16px;
    }

    .hero-button {
      padding: 12px 24px;
      font-size: 16px;
      font-weight: 600;
    }

    .hero-button.primary {
      background-color: #ecb22e;
      color: #1a1a1a;
    }

    .hero-button.secondary {
      color: white;
      border-color: white;
    }

    .hero-note {
      font-size: 14px;
      opacity: 0.8;
    }

    /* Hero Visual */
    .hero-visual {
      position: relative;
      height: 400px;
    }

    .floating-card {
      position: absolute;
      background: white;
      border-radius: 8px;
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
      color: #1a1a1a;
    }

    .card-1 {
      top: 20px;
      left: 20px;
      width: 320px;
      padding: 16px;
    }

    .card-2 {
      top: 200px;
      right: 40px;
      width: 200px;
      padding: 12px;
    }

    .card-header {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 12px;
    }

    .avatars {
      display: flex;
      gap: 4px;
    }

    .avatar {
      width: 24px;
      height: 24px;
      background: #4a154b;
      color: white;
      border-radius: 4px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 10px;
      font-weight: 600;
    }

    .channel-name {
      font-weight: 600;
      color: #1a1a1a;
    }

    .card-messages {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .message {
      display: flex;
      gap: 8px;
    }

    .message-avatar {
      width: 24px;
      height: 24px;
      background: #f5f5f5;
      color: #1a1a1a;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 10px;
      font-weight: 600;
      flex-shrink: 0;
    }

    .message-content {
      flex: 1;
    }

    .message-header {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 2px;
    }

    .message-author {
      font-weight: 600;
      font-size: 12px;
      color: #1a1a1a;
    }

    .message-time {
      font-size: 10px;
      color: rgba(0, 0, 0, 0.54);
    }

    .message-text {
      font-size: 12px;
      color: #1a1a1a;
      line-height: 1.4;
    }

    .notification {
      display: flex;
      align-items: center;
      gap: 8px;
      color: #1a1a1a;
      font-size: 14px;
    }

    /* Trust Section */
    .trust {
      padding: 60px 0;
      background: #f8f9fa;
      text-align: center;
    }

    .trust-text {
      font-size: 18px;
      color: rgba(0, 0, 0, 0.7);
      margin-bottom: 32px;
    }

    .trust-logos {
      display: flex;
      justify-content: center;
      gap: 48px;
      flex-wrap: wrap;
    }

    .logo-item {
      font-size: 18px;
      font-weight: 600;
      color: rgba(0, 0, 0, 0.6);
    }

    /* Features Section */
    .features {
      padding: 80px 0;
      background: white;
    }

    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 24px;
    }

    .section-title {
      text-align: center;
      font-size: 36px;
      font-weight: 700;
      margin-bottom: 60px;
      color: #1a1a1a;
    }

    .feature-card {
      height: 100%;
      text-align: center;
      border: none;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }

    .feature-icon {
      font-size: 48px;
      color: #4a154b;
      margin-bottom: 16px;
    }

    .feature-card h3 {
      font-size: 20px;
      font-weight: 600;
      margin-bottom: 12px;
      color: #1a1a1a;
    }

    .feature-card p {
      color: rgba(0, 0, 0, 0.7);
      line-height: 1.6;
    }

    /* Solutions Section */
    .solutions {
      padding: 80px 0;
      background: #f8f9fa;
    }

    .solution-card {
      height: 100%;
      cursor: pointer;
      transition: transform 0.2s;
      border: none;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }

    .solution-card:hover {
      transform: translateY(-4px);
    }

    .solution-card h3 {
      font-size: 18px;
      font-weight: 600;
      margin-bottom: 8px;
      color: #1a1a1a;
    }

    .solution-card p {
      color: rgba(0, 0, 0, 0.7);
      font-size: 14px;
    }

    /* Enterprise Section */
    .enterprise {
      padding: 80px 0;
      background: white;
    }

    .enterprise-content {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 60px;
      align-items: center;
    }

    .enterprise-text h2 {
      font-size: 32px;
      font-weight: 700;
      margin-bottom: 16px;
      color: #1a1a1a;
    }

    .enterprise-text p {
      font-size: 18px;
      color: rgba(0, 0, 0, 0.7);
      margin-bottom: 24px;
    }

    .security-icon {
      font-size: 120px;
      color: #4a154b;
      opacity: 0.8;
    }

    /* CTA Section */
    .cta {
      padding: 80px 0;
      background: #1a1a1a;
      color: white;
      text-align: center;
    }

    .cta h2 {
      font-size: 36px;
      font-weight: 700;
      margin-bottom: 16px;
    }

    .cta p {
      font-size: 18px;
      margin-bottom: 32px;
      opacity: 0.9;
    }

    .cta-buttons {
      display: flex;
      gap: 16px;
      justify-content: center;
    }

    .cta-button {
      padding: 16px 32px;
      font-size: 18px;
      font-weight: 600;
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
      color: rgba(0, 0, 0, 0.7);
      text-decoration: none;
      margin-bottom: 8px;
      transition: color 0.2s;
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

    /* Responsive Design */
    @media (max-width: 768px) {
      .nav-center {
        display: none;
      }
      
      .hero-container {
        grid-template-columns: 1fr;
        gap: 40px;
        text-align: center;
      }
      
      .hero-title {
        font-size: 36px;
      }
      
      .hero-actions {
        flex-direction: column;
        align-items: center;
      }
      
      .enterprise-content {
        grid-template-columns: 1fr;
        text-align: center;
      }
      
      .footer-content {
        grid-template-columns: repeat(2, 1fr);
      }
      
      .footer-bottom {
        flex-direction: column;
        gap: 16px;
        text-align: center;
      }
      
      mat-grid-list {
        cols: 1 !important;
      }
    }
  `]
})
export class HomeComponent {
  features = [
    {
      icon: 'chat',
      title: 'Real-time messaging',
      description: 'Connect with your team instantly with real-time messaging across channels and direct messages.'
    },
    {
      icon: 'folder',
      title: 'File sharing',
      description: 'Share files, documents, and images seamlessly with your team members.'
    },
    {
      icon: 'search',
      title: 'Powerful search',
      description: 'Find anything in your workspace with our powerful search functionality.'
    },
    {
      icon: 'notifications',
      title: 'Smart notifications',
      description: 'Stay updated with intelligent notifications that keep you informed without being overwhelming.'
    },
    {
      icon: 'security',
      title: 'Secure & private',
      description: 'Your conversations and data are protected with enterprise-grade security.'
    },
    {
      icon: 'phone_android',
      title: 'Mobile ready',
      description: 'Access your workspace from anywhere with our responsive mobile-friendly design.'
    }
  ];

  solutions = [
    {
      title: 'Sales',
      description: 'Close deals faster',
      route: 'solutions'
    },
    {
      title: 'Marketing',
      description: 'Launch campaigns',
      route: 'solutions'
    },
    {
      title: 'Customer Support',
      description: 'Help customers',
      route: 'solutions'
    },
    {
      title: 'Engineering',
      description: 'Build better products',
      route: 'solutions'
    }
  ];

  footerSections = [
    {
      title: 'Product',
      links: [
        { name: 'Home', route: '' },
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

  constructor(private router: Router) {}

  navigateToLogin() {
    this.router.navigate(['/auth/login']);
  }

  navigateToRegister() {
    this.router.navigate(['/auth/register']);
  }

  navigateToContact() {
    this.router.navigate(['/contact']);
  }

  navigateToSolution(route: string) {
    this.router.navigate(['/' + route]);
  }

  navigateToEnterprise() {
    this.router.navigate(['/enterprise']);
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
