import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-demo',
  template: `
    <div class="demo-page">
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
            <h1 class="hero-title">See CollabX in Action</h1>
            <p class="hero-subtitle">Watch how CollabX transforms team collaboration and boosts productivity</p>
            <div class="hero-actions">
              <button mat-raised-button color="primary" class="hero-primary-btn" (click)="navigateToRegister()">
                <mat-icon>rocket_launch</mat-icon>
                Start Free Trial
              </button>
              <button mat-stroked-button class="hero-secondary-btn" (click)="talkToSales()">
                <mat-icon>phone</mat-icon>
                Talk to Sales
              </button>
            </div>
          </div>
        </div>
      </section>

      <!-- Demo Video Section -->
      <section class="demo-video">
        <div class="container">
          <div class="video-container">
            <div class="video-placeholder">
              <div class="play-button" (click)="playVideo()">
                <mat-icon>play_circle_filled</mat-icon>
              </div>
              <h3>Product Demo Video</h3>
              <p>See how CollabX works in this 5-minute overview</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Demo Features -->
      <section class="demo-features">
        <div class="container">
          <div class="section-header">
            <h2 class="section-title">What You'll See in the Demo</h2>
            <p class="section-subtitle">Get a comprehensive overview of CollabX's key features and capabilities</p>
          </div>
          <div class="features-grid">
            <div class="feature-card">
              <div class="feature-icon">
                <mat-icon>smart_toy</mat-icon>
              </div>
              <h3>AI-Powered Features</h3>
              <p>See how our AI assistant helps automate tasks and provides intelligent insights</p>
            </div>
            <div class="feature-card">
              <div class="feature-icon">
                <mat-icon>group_work</mat-icon>
              </div>
              <h3>Real-time Collaboration</h3>
              <p>Watch teams collaborate in real-time with live editing and instant messaging</p>
            </div>
            <div class="feature-card">
              <div class="feature-icon">
                <mat-icon>analytics</mat-icon>
              </div>
              <h3>Advanced Analytics</h3>
              <p>Explore powerful dashboards and reporting capabilities</p>
            </div>
            <div class="feature-card">
              <div class="feature-icon">
                <mat-icon>hub</mat-icon>
              </div>
              <h3>Integrations</h3>
              <p>See how CollabX connects with your favorite tools and workflows</p>
            </div>
          </div>
        </div>
      </section>

      <!-- CTA Section -->
      <section class="cta">
        <div class="container">
          <div class="cta-content">
            <h2 class="cta-title">Ready to try CollabX?</h2>
            <p class="cta-subtitle">Start your free trial today and experience the future of team collaboration</p>
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
    .demo-page {
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
      text-align: center;
    }

    .container {
      max-width: 1400px;
      margin: 0 auto;
      padding: 0 32px;
    }

    .hero-content {
      max-width: 800px;
      margin: 0 auto;
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

    .demo-video {
      padding: 6rem 0;
      background: white;
    }

    .video-container {
      max-width: 800px;
      margin: 0 auto;
    }

    .video-placeholder {
      background: #f8fafc;
      border-radius: 16px;
      padding: 4rem 2rem;
      text-align: center;
      border: 2px dashed #e2e8f0;
      cursor: pointer;
      transition: all 0.3s ease;
    }

    .video-placeholder:hover {
      border-color: #4f46e5;
      background: #f0f4ff;
    }

    .play-button {
      width: 80px;
      height: 80px;
      background: linear-gradient(135deg, #4f46e5, #a855f7);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto 2rem auto;
      transition: all 0.3s ease;
    }

    .play-button:hover {
      transform: scale(1.1);
    }

    .play-button mat-icon {
      font-size: 2.5rem;
      width: 2.5rem;
      height: 2.5rem;
      color: white;
      margin-left: 4px;
    }

    .video-placeholder h3 {
      font-size: 1.5rem;
      font-weight: 700;
      color: #1a202c;
      margin: 0 0 1rem 0;
    }

    .video-placeholder p {
      font-size: 1rem;
      color: #64748b;
      margin: 0;
    }

    .demo-features {
      padding: 6rem 0;
      background: #f8fafc;
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
      background: white;
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
      font-size: 1.25rem;
      font-weight: 700;
      color: #1a202c;
      margin: 0 0 1rem 0;
    }

    .feature-card p {
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

      .cta-actions {
        flex-direction: column;
        align-items: center;
      }
    }
  `]
})
export class DemoComponent {
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

  talkToSales() {
    this.router.navigate(['/contact-sales']);
  }

  playVideo() {
    // In a real implementation, this would open a video modal or redirect to a video player
    alert('Demo video would play here. In a real implementation, this would open a video modal or redirect to a video player.');
  }
}
