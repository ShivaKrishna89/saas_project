import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-solutions-it',
  template: `
    <div class="solutions-detail-page">
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
            <a [routerLink]="['/solutions']" class="nav-link active">Solutions</a>
            <a [routerLink]="['/enterprise']" class="nav-link">Enterprise</a>
            <a [routerLink]="['/resources']" class="nav-link">Resources</a>
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
              <a [routerLink]="['/solutions']">Solutions</a>
              <mat-icon>chevron_right</mat-icon>
              <span>IT & Operations</span>
            </div>
            <h1 class="hero-title">IT & Operations Teams</h1>
            <p class="hero-subtitle">Streamline IT operations, manage service requests, and maintain infrastructure with CollabX's comprehensive IT service management platform.</p>
            <div class="hero-actions">
              <button mat-raised-button color="primary" class="hero-primary-btn" (click)="navigateToRegister()">
                <mat-icon>rocket_launch</mat-icon>
                Start Free Trial
              </button>
              <button mat-stroked-button class="hero-secondary-btn" (click)="watchDemo()">
                <mat-icon>play_circle</mat-icon>
                Watch Demo
              </button>
            </div>
          </div>
        </div>
      </section>

      <!-- Features Section -->
      <section class="features-section">
        <div class="container">
          <div class="section-header">
            <h2 class="section-title">Built for IT & Operations</h2>
            <p class="section-subtitle">Everything you need to manage IT services, infrastructure, and operations efficiently</p>
          </div>
          <div class="features-grid">
            <div class="feature-card">
              <div class="feature-icon">
                <mat-icon>support_agent</mat-icon>
              </div>
              <h3>Service Desk Management</h3>
              <p>Handle IT service requests, incidents, and support tickets with a comprehensive service desk solution</p>
              <ul class="feature-list">
                <li>Incident and problem management</li>
                <li>Service request fulfillment</li>
                <li>Knowledge base and self-service portal</li>
              </ul>
            </div>
            <div class="feature-card">
              <div class="feature-icon">
                <mat-icon>settings</mat-icon>
              </div>
              <h3>Change Management</h3>
              <p>Manage IT changes, deployments, and infrastructure updates with proper approval workflows</p>
              <ul class="feature-list">
                <li>Change request and approval workflows</li>
                <li>Release and deployment management</li>
                <li>Configuration management database</li>
              </ul>
            </div>
            <div class="feature-card">
              <div class="feature-icon">
                <mat-icon>hub</mat-icon>
              </div>
              <h3>System Integration</h3>
              <p>Connect and integrate with existing IT tools and systems for seamless operations</p>
              <ul class="feature-list">
                <li>API integrations with monitoring tools</li>
                <li>Active Directory and LDAP integration</li>
                <li>Third-party tool connectors</li>
              </ul>
            </div>
            <div class="feature-card">
              <div class="feature-icon">
                <mat-icon>security</mat-icon>
              </div>
              <h3>Security & Compliance</h3>
              <p>Maintain security standards and compliance with built-in security controls and audit trails</p>
              <ul class="feature-list">
                <li>Security incident management</li>
                <li>Compliance tracking and reporting</li>
                <li>Audit logs and access controls</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <!-- How It Works Section -->
      <section class="how-it-works">
        <div class="container">
          <div class="section-header">
            <h2 class="section-title">See How It Works</h2>
            <p class="section-subtitle">From incident response to change management, CollabX streamlines your IT operations</p>
          </div>
          <div class="steps-grid">
            <div class="step-card">
              <div class="step-number">1</div>
              <h3>Incident Response</h3>
              <p>Quickly respond to IT incidents, categorize issues, and assign to appropriate teams</p>
            </div>
            <div class="step-card">
              <div class="step-number">2</div>
              <h3>Service Delivery</h3>
              <p>Fulfill service requests, manage user access, and maintain service level agreements</p>
            </div>
            <div class="step-card">
              <div class="step-number">3</div>
              <h3>Change Control</h3>
              <p>Plan, approve, and execute IT changes with proper risk assessment and rollback procedures</p>
            </div>
            <div class="step-card">
              <div class="step-number">4</div>
              <h3>Continuous Improvement</h3>
              <p>Analyze performance metrics, identify trends, and optimize IT service delivery</p>
            </div>
          </div>
        </div>
      </section>

      <!-- CTA Section -->
      <section class="cta">
        <div class="container">
          <div class="cta-content">
            <h2 class="cta-title">Ready to streamline your IT operations?</h2>
            <p class="cta-subtitle">Join IT teams who've improved service delivery and reduced downtime with CollabX</p>
            <div class="cta-actions">
              <button mat-raised-button color="primary" class="cta-btn" (click)="navigateToRegister()">
                <mat-icon>rocket_launch</mat-icon>
                Start Free Trial
              </button>
              <button mat-stroked-button class="cta-btn" (click)="talkToSales()">
                <mat-icon>phone</mat-icon>
                Talk to Sales
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  `,
  styles: [`
    .solutions-detail-page {
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

    .features-section {
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

    .features-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 2rem;
    }

    .feature-card {
      background: #f8fafc;
      border-radius: 16px;
      padding: 2rem;
      border: 1px solid #e2e8f0;
      transition: all 0.3s ease;
    }

    .feature-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
    }

    .feature-icon {
      width: 3rem;
      height: 3rem;
      background: linear-gradient(135deg, #4f46e5, #a855f7);
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 1.5rem;
    }

    .feature-icon mat-icon {
      font-size: 1.5rem;
      width: 1.5rem;
      height: 1.5rem;
      color: white;
    }

    .feature-card h3 {
      font-size: 1.5rem;
      font-weight: 700;
      color: #1a202c;
      margin: 0 0 1rem 0;
    }

    .feature-card p {
      font-size: 1rem;
      color: #64748b;
      line-height: 1.6;
      margin: 0 0 1.5rem 0;
    }

    .feature-list {
      list-style: none;
      padding: 0;
      margin: 0;
    }

    .feature-list li {
      font-size: 0.875rem;
      color: #64748b;
      margin-bottom: 0.5rem;
      position: relative;
      padding-left: 1.5rem;
    }

    .feature-list li::before {
      content: "✓";
      position: absolute;
      left: 0;
      color: #10b981;
      font-weight: 700;
    }

    .how-it-works {
      padding: 6rem 0;
      background: #f8fafc;
    }

    .steps-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 2rem;
    }

    .step-card {
      text-align: center;
      padding: 2rem;
    }

    .step-number {
      width: 3rem;
      height: 3rem;
      background: linear-gradient(135deg, #4f46e5, #a855f7);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto 1.5rem auto;
      font-size: 1.25rem;
      font-weight: 700;
      color: white;
    }

    .step-card h3 {
      font-size: 1.25rem;
      font-weight: 700;
      color: #1a202c;
      margin: 0 0 1rem 0;
    }

    .step-card p {
      font-size: 1rem;
      color: #64748b;
      line-height: 1.6;
      margin: 0;
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

      .features-grid {
        grid-template-columns: 1fr;
      }

      .steps-grid {
        grid-template-columns: 1fr;
      }

      .cta-actions {
        flex-direction: column;
        align-items: center;
      }
    }
  `]
})
export class SolutionsItComponent {
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

  watchDemo() {
    this.router.navigate(['/contact']);
  }

  talkToSales() {
    this.router.navigate(['/contact-sales']);
  }
}
