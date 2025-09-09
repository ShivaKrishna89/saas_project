import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-resources-guides',
  template: `
    <div class="resources-detail-page">
      <!-- Navigation Bar -->
      <nav class="navbar">
        <div class="nav-container">
          <div class="nav-left">
            <div class="logo" (click)="goHome()">
              <mat-icon class="logo-icon">rocket_launch</mat-icon>
              <span class="logo-text brand">CollabX</span>
            </div>
          </div>
          
          <div class="nav-center">
            <a [routerLink]="['/home']" class="nav-link">Home</a>
            <a [routerLink]="['/solutions']" class="nav-link">Solutions</a>
            <a [routerLink]="['/enterprise']" class="nav-link">Enterprise</a>
            <a [routerLink]="['/resources']" class="nav-link active">Resources</a>
            <a [routerLink]="['/pricing']" class="nav-link">Pricing</a>
          </div>
          
          <div class="nav-right">
            <button mat-stroked-button class="nav-button" (click)="navigateToLogin()">
              Sign In
            </button>
            <button mat-raised-button color="primary" class="nav-button cta-btn" (click)="navigateToRegister()">
              Get Started Free
            </button>
          </div>
        </div>
      </nav>

      <!-- Hero Section -->
      <section class="hero">
        <div class="container">
          <div class="hero-content">
            <div class="breadcrumb">
              <a [routerLink]="['/resources']">Resources</a>
              <mat-icon>chevron_right</mat-icon>
              <span>Guides</span>
            </div>
            <h1 class="hero-title">Learning Center</h1>
            <p class="hero-subtitle">Comprehensive guides, tutorials, and step-by-step instructions to help you master CollabX and maximize your team's productivity.</p>
            <div class="hero-actions">
              <button mat-raised-button color="primary" class="hero-primary-btn" (click)="navigateToRegister()">
                <mat-icon>rocket_launch</mat-icon>
                Start Free Trial
              </button>
              <button mat-stroked-button class="hero-secondary-btn" (click)="navigateToHelp()">
                <mat-icon>help</mat-icon>
                Help Center
              </button>
            </div>
          </div>
        </div>
      </section>

      <!-- Guides Categories -->
      <section class="guides-categories">
        <div class="container">
          <div class="section-header">
            <h2 class="section-title">Browse by Category</h2>
            <p class="section-subtitle">Find the guides that match your needs and experience level</p>
          </div>
          <div class="categories-grid">
            <div class="category-card" (click)="scrollToSection('getting-started')">
              <div class="category-icon">
                <mat-icon>play_arrow</mat-icon>
              </div>
              <h3>Getting Started</h3>
              <p>New to CollabX? Start here with our beginner-friendly guides and tutorials.</p>
              <div class="guide-count">12 guides</div>
            </div>
            <div class="category-card" (click)="scrollToSection('project-management')">
              <div class="category-icon">
                <mat-icon>assignment</mat-icon>
              </div>
              <h3>Project Management</h3>
              <p>Learn how to plan, track, and deliver successful projects with CollabX.</p>
              <div class="guide-count">8 guides</div>
            </div>
            <div class="category-card" (click)="scrollToSection('team-collaboration')">
              <div class="category-icon">
                <mat-icon>group_work</mat-icon>
              </div>
              <h3>Team Collaboration</h3>
              <p>Master team communication, workflows, and collaboration best practices.</p>
              <div class="guide-count">15 guides</div>
            </div>
            <div class="category-card" (click)="scrollToSection('integrations')">
              <div class="category-icon">
                <mat-icon>hub</mat-icon>
              </div>
              <h3>Integrations</h3>
              <p>Connect CollabX with your favorite tools and streamline your workflow.</p>
              <div class="guide-count">20 guides</div>
            </div>
          </div>
        </div>
      </section>

      <!-- Getting Started Guides -->
      <section id="getting-started" class="guides-section">
        <div class="container">
          <div class="section-header">
            <h2 class="section-title">Getting Started</h2>
            <p class="section-subtitle">Everything you need to know to get up and running with CollabX</p>
          </div>
          <div class="guides-grid">
            <div class="guide-card">
              <div class="guide-icon">
                <mat-icon>rocket_launch</mat-icon>
              </div>
              <div class="guide-content">
                <div class="guide-tag">Beginner</div>
                <h3>Quick Start Guide</h3>
                <p>Get your workspace set up in 5 minutes with this step-by-step guide.</p>
                <div class="guide-meta">
                  <span class="guide-time">5 min read</span>
                  <span class="guide-level">Beginner</span>
                </div>
                <a href="#" class="guide-link" (click)="readGuide()">Read Guide <mat-icon>arrow_forward</mat-icon></a>
              </div>
            </div>
            <div class="guide-card">
              <div class="guide-icon">
                <mat-icon>group_add</mat-icon>
              </div>
              <div class="guide-content">
                <div class="guide-tag">Beginner</div>
                <h3>Inviting Team Members</h3>
                <p>Learn how to invite team members and set up user permissions.</p>
                <div class="guide-meta">
                  <span class="guide-time">8 min read</span>
                  <span class="guide-level">Beginner</span>
                </div>
                <a href="#" class="guide-link" (click)="readGuide()">Read Guide <mat-icon>arrow_forward</mat-icon></a>
              </div>
            </div>
            <div class="guide-card">
              <div class="guide-icon">
                <mat-icon>folder</mat-icon>
              </div>
              <div class="guide-content">
                <div class="guide-tag">Beginner</div>
                <h3>Creating Your First Project</h3>
                <p>Step-by-step instructions for creating and organizing your first project.</p>
                <div class="guide-meta">
                  <span class="guide-time">10 min read</span>
                  <span class="guide-level">Beginner</span>
                </div>
                <a href="#" class="guide-link" (click)="readGuide()">Read Guide <mat-icon>arrow_forward</mat-icon></a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Project Management Guides -->
      <section id="project-management" class="guides-section">
        <div class="container">
          <div class="section-header">
            <h2 class="section-title">Project Management</h2>
            <p class="section-subtitle">Master project planning, tracking, and delivery with CollabX</p>
          </div>
          <div class="guides-grid">
            <div class="guide-card">
              <div class="guide-icon">
                <mat-icon>view_kanban</mat-icon>
              </div>
              <div class="guide-content">
                <div class="guide-tag">Intermediate</div>
                <h3>Kanban Board Setup</h3>
                <p>Create and customize Kanban boards for visual project management.</p>
                <div class="guide-meta">
                  <span class="guide-time">12 min read</span>
                  <span class="guide-level">Intermediate</span>
                </div>
                <a href="#" class="guide-link" (click)="readGuide()">Read Guide <mat-icon>arrow_forward</mat-icon></a>
              </div>
            </div>
            <div class="guide-card">
              <div class="guide-icon">
                <mat-icon>timeline</mat-icon>
              </div>
              <div class="guide-content">
                <div class="guide-tag">Intermediate</div>
                <h3>Timeline and Milestones</h3>
                <p>Set up project timelines, milestones, and deadline tracking.</p>
                <div class="guide-meta">
                  <span class="guide-time">15 min read</span>
                  <span class="guide-level">Intermediate</span>
                </div>
                <a href="#" class="guide-link" (click)="readGuide()">Read Guide <mat-icon>arrow_forward</mat-icon></a>
              </div>
            </div>
            <div class="guide-card">
              <div class="guide-icon">
                <mat-icon>analytics</mat-icon>
              </div>
              <div class="guide-content">
                <div class="guide-tag">Advanced</div>
                <h3>Project Analytics</h3>
                <p>Use analytics and reporting to track project progress and team performance.</p>
                <div class="guide-meta">
                  <span class="guide-time">18 min read</span>
                  <span class="guide-level">Advanced</span>
                </div>
                <a href="#" class="guide-link" (click)="readGuide()">Read Guide <mat-icon>arrow_forward</mat-icon></a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Team Collaboration Guides -->
      <section id="team-collaboration" class="guides-section">
        <div class="container">
          <div class="section-header">
            <h2 class="section-title">Team Collaboration</h2>
            <p class="section-subtitle">Master team communication, workflows, and collaboration best practices</p>
          </div>
          <div class="guides-grid">
            <div class="guide-card">
              <div class="guide-icon">
                <mat-icon>group_work</mat-icon>
              </div>
              <div class="guide-content">
                <div class="guide-tag">Intermediate</div>
                <h3>Effective Team Communication</h3>
                <p>Learn how to communicate effectively with your team using CollabX channels and messaging.</p>
                <div class="guide-meta">
                  <span class="guide-time">12 min read</span>
                  <span class="guide-level">Intermediate</span>
                </div>
                <a href="#" class="guide-link" (click)="readGuide()">Read Guide <mat-icon>arrow_forward</mat-icon></a>
              </div>
            </div>
            <div class="guide-card">
              <div class="guide-icon">
                <mat-icon>sync</mat-icon>
              </div>
              <div class="guide-content">
                <div class="guide-tag">Advanced</div>
                <h3>Workflow Automation</h3>
                <p>Set up automated workflows to streamline your team's collaboration processes.</p>
                <div class="guide-meta">
                  <span class="guide-time">15 min read</span>
                  <span class="guide-level">Advanced</span>
                </div>
                <a href="#" class="guide-link" (click)="readGuide()">Read Guide <mat-icon>arrow_forward</mat-icon></a>
              </div>
            </div>
            <div class="guide-card">
              <div class="guide-icon">
                <mat-icon>handshake</mat-icon>
              </div>
              <div class="guide-content">
                <div class="guide-tag">Beginner</div>
                <h3>Remote Team Best Practices</h3>
                <p>Best practices for managing and collaborating with remote teams using CollabX.</p>
                <div class="guide-meta">
                  <span class="guide-time">10 min read</span>
                  <span class="guide-level">Beginner</span>
                </div>
                <a href="#" class="guide-link" (click)="readGuide()">Read Guide <mat-icon>arrow_forward</mat-icon></a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Integrations Guides -->
      <section id="integrations" class="guides-section">
        <div class="container">
          <div class="section-header">
            <h2 class="section-title">Integrations</h2>
            <p class="section-subtitle">Connect CollabX with your favorite tools and streamline your workflow</p>
          </div>
          <div class="guides-grid">
            <div class="guide-card">
              <div class="guide-icon">
                <mat-icon>hub</mat-icon>
              </div>
              <div class="guide-content">
                <div class="guide-tag">Beginner</div>
                <h3>Slack Integration</h3>
                <p>Connect CollabX with Slack to keep your team synchronized across platforms.</p>
                <div class="guide-meta">
                  <span class="guide-time">8 min read</span>
                  <span class="guide-level">Beginner</span>
                </div>
                <a href="#" class="guide-link" (click)="readGuide()">Read Guide <mat-icon>arrow_forward</mat-icon></a>
              </div>
            </div>
            <div class="guide-card">
              <div class="guide-icon">
                <mat-icon>cloud</mat-icon>
              </div>
              <div class="guide-content">
                <div class="guide-tag">Intermediate</div>
                <h3>Google Workspace Integration</h3>
                <p>Integrate CollabX with Google Workspace for seamless document collaboration.</p>
                <div class="guide-meta">
                  <span class="guide-time">12 min read</span>
                  <span class="guide-level">Intermediate</span>
                </div>
                <a href="#" class="guide-link" (click)="readGuide()">Read Guide <mat-icon>arrow_forward</mat-icon></a>
              </div>
            </div>
            <div class="guide-card">
              <div class="guide-icon">
                <mat-icon>code</mat-icon>
              </div>
              <div class="guide-content">
                <div class="guide-tag">Advanced</div>
                <h3>API Integration</h3>
                <p>Build custom integrations using CollabX API for advanced automation.</p>
                <div class="guide-meta">
                  <span class="guide-time">20 min read</span>
                  <span class="guide-level">Advanced</span>
                </div>
                <a href="#" class="guide-link" (click)="readGuide()">Read Guide <mat-icon>arrow_forward</mat-icon></a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- CTA Section -->
      <section class="cta">
        <div class="container">
          <div class="cta-content">
            <h2 class="cta-title">Ready to get started?</h2>
            <p class="cta-subtitle">Join thousands of teams who've transformed their workflow with CollabX</p>
            <div class="cta-actions">
              <button mat-raised-button color="primary" class="cta-btn" (click)="navigateToRegister()">
                <mat-icon>rocket_launch</mat-icon>
                Start Free Trial
              </button>
              <button mat-stroked-button class="cta-btn" (click)="navigateToHelp()">
                <mat-icon>help</mat-icon>
                Get Help
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  `,
  styles: [`
    .resources-detail-page {
      min-height: 100vh;
      background: #ffffff;
      font-family: 'Inter', 'Roboto', sans-serif;
    }

    .navbar {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      background: rgba(255, 255, 255, 0.95);
      backdrop-filter: blur(20px);
      border-bottom: 1px solid rgba(0, 0, 0, 0.05);
      z-index: 1000;
      padding: 0;
    }

    .nav-container {
      max-width: 1400px;
      margin: 0 auto;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 32px;
      height: 72px;
    }

    .nav-left {
      display: flex;
      align-items: center;
    }

    .logo {
      display: flex;
      align-items: center;
      gap: 12px;
      text-decoration: none;
      color: #1976d2;
      cursor: pointer;
      transition: transform 0.2s ease;
    }

    .logo:hover {
      transform: scale(1.05);
    }

    .logo-icon {
      font-size: 32px;
      width: 32px;
      height: 32px;
      background: linear-gradient(135deg, #4f46e5, #a855f7);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    .logo-text {
      font-size: 24px;
      font-weight: 700;
      background: linear-gradient(135deg, #4f46e5, #a855f7);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    .brand {
      font-size: 28px;
    }

    .nav-center {
      display: flex;
      align-items: center;
      gap: 40px;
    }

    .nav-link {
      text-decoration: none;
      color: #374151;
      font-weight: 500;
      font-size: 15px;
      transition: all 0.2s ease;
      position: relative;
      padding: 8px 0;
    }

    .nav-link:hover {
      color: #4f46e5;
    }

    .nav-link.active {
      color: #4f46e5;
      font-weight: 600;
    }

    .nav-link.active::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 2px;
      background: linear-gradient(135deg, #4f46e5, #a855f7);
    }

    .nav-right {
      display: flex;
      align-items: center;
      gap: 16px;
    }

    .nav-button {
      padding: 12px 24px;
      min-width: auto;
      font-size: 14px;
      transition: all 0.2s ease;
    }

    .nav-button.cta-btn {
      background: linear-gradient(135deg, #4f46e5, #a855f7);
      color: white;
      border: none;
      box-shadow: 0 4px 15px rgba(79, 70, 229, 0.3);
    }

    .nav-button.cta-btn:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 25px rgba(79, 70, 229, 0.4);
    }

    .hero {
      padding: 120px 0 80px;
      background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
    }

    .container {
      max-width: 1400px;
      margin: 0 auto;
      padding: 0 32px;
    }

    .hero-content {
      max-width: 800px;
      margin: 0 auto;
      text-align: center;
    }

    .breadcrumb {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      margin-bottom: 24px;
      font-size: 14px;
      color: #64748b;
    }

    .breadcrumb a {
      color: #4f46e5;
      text-decoration: none;
    }

    .breadcrumb mat-icon {
      font-size: 16px;
      width: 16px;
      height: 16px;
    }

    .hero-title {
      font-size: 3.5rem;
      font-weight: 800;
      color: #1a202c;
      margin: 0 0 1.5rem 0;
      line-height: 1.1;
      letter-spacing: -0.02em;
    }

    .hero-subtitle {
      font-size: 1.25rem;
      color: #64748b;
      margin: 0 0 2.5rem 0;
      line-height: 1.6;
      font-weight: 400;
    }

    .hero-actions {
      display: flex;
      gap: 1.25rem;
      justify-content: center;
    }

    .hero-primary-btn {
      background: linear-gradient(135deg, #4f46e5, #a855f7);
      color: white;
      border: none;
      padding: 1rem 2rem;
      border-radius: 12px;
      font-weight: 600;
      font-size: 1rem;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      transition: all 0.3s ease;
      box-shadow: 0 4px 15px rgba(79, 70, 229, 0.3);
    }

    .hero-primary-btn:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 25px rgba(79, 70, 229, 0.4);
    }

    .hero-secondary-btn {
      background: white;
      color: #4f46e5;
      border: 2px solid #4f46e5;
      padding: 1rem 2rem;
      border-radius: 12px;
      font-weight: 600;
      font-size: 1rem;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      transition: all 0.3s ease;
    }

    .hero-secondary-btn:hover {
      background: #4f46e5;
      color: white;
      transform: translateY(-2px);
      box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
    }

    .guides-categories {
      padding: 6rem 0;
      background: white;
    }

    .section-header {
      text-align: center;
      margin-bottom: 4rem;
    }

    .section-title {
      font-size: 2.5rem;
      font-weight: 700;
      color: #1a202c;
      margin: 0 0 1rem 0;
    }

    .section-subtitle {
      font-size: 1.125rem;
      color: #64748b;
      margin: 0;
      line-height: 1.6;
    }

    .categories-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 2rem;
    }

    .category-card {
      background: #f8fafc;
      border-radius: 16px;
      padding: 2rem;
      text-align: center;
      border: 1px solid #e2e8f0;
      transition: all 0.3s ease;
      cursor: pointer;
    }

    .category-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
    }

    .category-icon {
      width: 3rem;
      height: 3rem;
      background: linear-gradient(135deg, #4f46e5, #a855f7);
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto 1.5rem auto;
    }

    .category-icon mat-icon {
      font-size: 1.5rem;
      width: 1.5rem;
      height: 1.5rem;
      color: white;
    }

    .category-card h3 {
      font-size: 1.25rem;
      font-weight: 700;
      color: #1a202c;
      margin: 0 0 1rem 0;
    }

    .category-card p {
      font-size: 1rem;
      color: #64748b;
      line-height: 1.6;
      margin: 0 0 1rem 0;
    }

    .guide-count {
      font-size: 0.875rem;
      color: #4f46e5;
      font-weight: 600;
    }

    .guides-section {
      padding: 6rem 0;
      background: #f8fafc;
    }

    .guides-section:nth-child(even) {
      background: white;
    }

    .guides-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 2rem;
    }

    .guide-card {
      background: white;
      border-radius: 16px;
      padding: 2rem;
      border: 1px solid #e2e8f0;
      transition: all 0.3s ease;
      display: flex;
      gap: 1rem;
    }

    .guide-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
    }

    .guide-icon {
      width: 3rem;
      height: 3rem;
      background: linear-gradient(135deg, #4f46e5, #a855f7);
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }

    .guide-icon mat-icon {
      font-size: 1.5rem;
      width: 1.5rem;
      height: 1.5rem;
      color: white;
    }

    .guide-content {
      flex: 1;
    }

    .guide-tag {
      display: inline-block;
      background: #e0e7ff;
      color: #4f46e5;
      padding: 0.25rem 0.75rem;
      border-radius: 20px;
      font-size: 0.75rem;
      font-weight: 600;
      margin-bottom: 1rem;
    }

    .guide-content h3 {
      font-size: 1.25rem;
      font-weight: 700;
      color: #1a202c;
      margin: 0 0 0.5rem 0;
    }

    .guide-content p {
      font-size: 1rem;
      color: #64748b;
      line-height: 1.6;
      margin: 0 0 1rem 0;
    }

    .guide-meta {
      display: flex;
      gap: 1rem;
      margin-bottom: 1rem;
    }

    .guide-time, .guide-level {
      font-size: 0.875rem;
      color: #64748b;
    }

    .guide-link {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      color: #4f46e5;
      text-decoration: none;
      font-weight: 600;
      font-size: 0.875rem;
      transition: all 0.2s ease;
    }

    .guide-link:hover {
      color: #a855f7;
    }

    .guide-link mat-icon {
      font-size: 1rem;
      width: 1rem;
      height: 1rem;
    }

    .cta {
      padding: 6rem 0;
      background: linear-gradient(135deg, #4f46e5, #a855f7);
      color: white;
      text-align: center;
    }

    .cta-content {
      max-width: 600px;
      margin: 0 auto;
    }

    .cta-title {
      font-size: 2.5rem;
      font-weight: 700;
      margin: 0 0 1rem 0;
    }

    .cta-subtitle {
      font-size: 1.125rem;
      margin: 0 0 2.5rem 0;
      opacity: 0.9;
    }

    .cta-actions {
      display: flex;
      gap: 1.25rem;
      justify-content: center;
    }

    .cta-btn {
      padding: 1rem 2rem;
      font-size: 1rem;
      font-weight: 600;
      border-radius: 12px;
      text-transform: none;
    }

    @media (max-width: 768px) {
      .nav-center {
        display: none;
      }

      .hero-title {
        font-size: 2.5rem;
      }

      .hero-actions {
        flex-direction: column;
        align-items: center;
      }

      .categories-grid {
        grid-template-columns: 1fr;
      }

      .guides-grid {
        grid-template-columns: 1fr;
      }

      .cta-actions {
        flex-direction: column;
        align-items: center;
      }
    }
  `]
})
export class ResourcesGuidesComponent {
  constructor(private router: Router) {}

  goHome() {
    this.router.navigate(['/home']);
  }

  navigateToLogin() {
    this.router.navigate(['/auth/login']);
  }

  navigateToRegister() {
    this.router.navigate(['/auth/register']);
  }

  navigateToHelp() {
    this.router.navigate(['/help']);
  }

  readGuide() {
    // Show a proper message instead of routing to potentially broken help page
    alert('Guide content coming soon! This would open the detailed guide content.');
  }

  scrollToSection(sectionId: string) {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
