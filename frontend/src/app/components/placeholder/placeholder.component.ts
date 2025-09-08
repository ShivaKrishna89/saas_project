import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-placeholder',
  template: `
    <div class="placeholder-page">
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
            <a [routerLink]="['/home']" class="nav-link" [class.active]="pageType === 'features' || pageType === 'home'">Home</a>
            <a [routerLink]="['/solutions']" class="nav-link" [class.active]="pageType === 'solutions'">Solutions</a>
            <a [routerLink]="['/enterprise']" class="nav-link" [class.active]="pageType === 'enterprise'">Enterprise</a>
            <a [routerLink]="['/resources']" class="nav-link" [class.active]="pageType === 'resources'">Resources</a>
            <a [routerLink]="['/pricing']" class="nav-link" [class.active]="pageType === 'pricing'">Pricing</a>
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
        <div class="hero-background">
          <div class="floating-elements">
            <div class="floating-card card-1"></div>
            <div class="floating-card card-2"></div>
            <div class="floating-card card-3"></div>
            </div>
            </div>
        <div class="container">
          <div class="hero-content">
            <div class="hero-text">
              <div class="hero-badge">
                <mat-icon>star</mat-icon>
                <span>Trusted by 10M+ users worldwide</span>
          </div>
              <h1 class="hero-title" [innerHTML]="getHeroTitle()"></h1>
              <p class="hero-subtitle">{{ getHeroSubtitle() }}</p>
              <div class="hero-actions">
                <button mat-raised-button color="primary" class="hero-btn primary" (click)="navigateToRegister()">
                  <mat-icon>rocket_launch</mat-icon>
                  {{ getPrimaryButtonText() }}
                </button>
                <button *ngIf="getSecondaryButtonText()" mat-stroked-button class="hero-btn secondary" (click)="navigateToContact()">
                  <mat-icon>play_circle</mat-icon>
                  {{ getSecondaryButtonText() }}
                </button>
                </div>
              <div class="hero-stats">
                <div class="stat">
                  <span class="stat-number">99.9%</span>
                  <span class="stat-label">Uptime</span>
                </div>
                <div class="stat">
                  <span class="stat-number">50+</span>
                  <span class="stat-label">Integrations</span>
                </div>
                <div class="stat">
                  <span class="stat-number">24/7</span>
                  <span class="stat-label">Support</span>
          </div>
        </div>
            </div>
            <div class="hero-visual">
              <div class="dashboard-mockup">
                <div class="mockup-header">
                  <div class="mockup-nav">
                    <div class="nav-item active">Dashboard</div>
                    <div class="nav-item">Projects</div>
                    <div class="nav-item">Team</div>
                    <div class="nav-item">Analytics</div>
          </div>
                  <div class="mockup-actions">
                    <mat-icon>notifications</mat-icon>
                    <mat-icon>search</mat-icon>
                    <div class="user-avatar">
                      <mat-icon>person</mat-icon>
          </div>
        </div>
            </div>
                <div class="mockup-content">
                  <div class="content-grid">
                    <div class="content-card">
                      <div class="card-header">
                        <mat-icon>trending_up</mat-icon>
                        <span>Project Progress</span>
                      </div>
                      <div class="progress-bar">
                        <div class="progress-fill" style="width: 75%"></div>
                      </div>
                      <span class="progress-text">75% Complete</span>
                    </div>
                    <div class="content-card">
                      <div class="card-header">
                        <mat-icon>group</mat-icon>
                        <span>Team Activity</span>
                      </div>
                      <div class="activity-list">
                        <div class="activity-item">
                          <div class="activity-avatar"></div>
                          <span>Sarah completed task</span>
                        </div>
                        <div class="activity-item">
                          <div class="activity-avatar"></div>
                          <span>Mike shared document</span>
                        </div>
                      </div>
                    </div>
                    <div class="content-card">
                      <div class="card-header">
                        <mat-icon>chat</mat-icon>
                        <span>Recent Messages</span>
                      </div>
                      <div class="message-preview">
                        <div class="message-item">
                          <div class="message-avatar"></div>
                          <div class="message-content">
                            <span class="message-author">Alex</span>
                            <span class="message-text">Great work on the presentation!</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Solutions Content -->
      <section *ngIf="pageType === 'solutions'" class="solutions-page">
        <!-- Solutions Hero Section -->
        <section class="solutions-hero">
          <div class="container">
            <div class="solutions-hero-content">
              <div class="hero-badges">
                <span class="badge" *ngFor="let badge of getHeroBadges()">{{ badge }}</span>
              </div>
              <h1 class="hero-title" [innerHTML]="getHeroTitle()"></h1>
              <p class="hero-subtitle">{{ getHeroSubtitle() }}</p>
              <div class="hero-actions">
                <button mat-raised-button color="primary" class="hero-primary-btn">{{ getPrimaryButtonText() }}</button>
                <button mat-button class="hero-secondary-btn">{{ getSecondaryButtonText() }} <mat-icon>arrow_forward</mat-icon></button>
              </div>
            </div>
          </div>
        </section>

        <!-- Industry Solutions Section -->
        <section class="industry-solutions">
          <div class="container">
            <div class="section-header">
              <h2 class="section-title">Solutions for every industry</h2>
              <p class="section-subtitle">Tailored workflows and features designed for your specific industry needs</p>
            </div>
            <div class="industry-grid">
              <div class="industry-card" *ngFor="let industry of getIndustrySolutions()">
                <div class="industry-icon">
                  <mat-icon>{{ industry.icon }}</mat-icon>
                </div>
                <h3 class="industry-name">{{ industry.name }}</h3>
                <p class="industry-description">{{ industry.description }}</p>
                <div class="industry-features">
                  <div class="feature-item" *ngFor="let feature of industry.features">
                    <mat-icon>check_circle</mat-icon>
                    <span>{{ feature }}</span>
                  </div>
                </div>
                <div class="industry-stats">
                  <div class="stat">
                    <span class="stat-number">{{ industry.users }}</span>
                    <span class="stat-label">Teams</span>
                  </div>
                  <div class="stat">
                    <span class="stat-number">{{ industry.projects }}</span>
                    <span class="stat-label">Projects</span>
                  </div>
                </div>
                <button class="industry-btn">Explore Solutions</button>
              </div>
            </div>
          </div>
        </section>

        <!-- Use Cases Section -->
        <section class="use-cases">
          <div class="container">
            <div class="section-header">
              <h2 class="section-title">Real-world use cases</h2>
              <p class="section-subtitle">See how teams across industries are using CollabX to achieve their goals</p>
            </div>
            <div class="use-cases-grid">
              <div class="use-case-card" *ngFor="let useCase of getUseCases()">
                <div class="use-case-header">
                  <div class="use-case-icon">
                    <mat-icon>{{ useCase.icon }}</mat-icon>
                  </div>
                  <div class="use-case-meta">
                    <span class="use-case-category">{{ useCase.category }}</span>
                    <span class="use-case-time">{{ useCase.time }}</span>
                  </div>
                </div>
                <h3 class="use-case-title">{{ useCase.title }}</h3>
                <p class="use-case-description">{{ useCase.description }}</p>
                <div class="use-case-features">
                  <span *ngFor="let feature of useCase.features" class="use-case-feature">{{ feature }}</span>
                </div>
                <div class="use-case-footer">
                  <div class="use-case-company">
                    <div class="company-avatar">{{ useCase.company.charAt(0) }}</div>
                    <span class="company-name">{{ useCase.company }}</span>
                  </div>
                  <a href="#" class="use-case-link">Read case study <mat-icon>arrow_forward</mat-icon></a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </section>


      <!-- Enterprise Content -->
      <section *ngIf="pageType === 'enterprise'" class="enterprise-page">
        <!-- Enterprise Hero Section -->
        <section class="enterprise-hero">
          <div class="container">
            <div class="enterprise-hero-content">
              <div class="hero-badges">
                <span class="badge" *ngFor="let badge of getHeroBadges()">{{ badge }}</span>
              </div>
              <h1 class="hero-title" [innerHTML]="getHeroTitle()"></h1>
              <p class="hero-subtitle">{{ getHeroSubtitle() }}</p>
              <div class="hero-actions">
                <button mat-raised-button color="primary" class="hero-primary-btn">{{ getPrimaryButtonText() }}</button>
                <button mat-button class="hero-secondary-btn">{{ getSecondaryButtonText() }} <mat-icon>arrow_forward</mat-icon></button>
              </div>
            </div>
          </div>
        </section>

        <!-- Enterprise Stats Section -->
        <section class="enterprise-stats">
          <div class="container">
            <div class="section-header">
              <h2 class="section-title">Trusted by enterprise teams worldwide</h2>
              <p class="section-subtitle">Join thousands of organizations that rely on CollabX for mission-critical collaboration</p>
            </div>
            <div class="stats-grid">
              <div class="stat-card" *ngFor="let stat of getEnterpriseStats()">
                <div class="stat-number">{{ stat.number }}</div>
                <div class="stat-label">{{ stat.label }}</div>
                <div class="stat-description">{{ stat.description }}</div>
              </div>
            </div>
          </div>
        </section>

        <!-- Enterprise Features Section -->
        <section class="enterprise-features">
          <div class="container">
            <div class="section-header">
              <h2 class="section-title">Enterprise-grade features for every need</h2>
              <p class="section-subtitle">Built to scale with your organization and meet the highest standards of security and compliance</p>
            </div>
            <div class="features-grid">
              <div class="feature-card" *ngFor="let feature of getEnterpriseFeatures()">
                <div class="feature-icon-wrapper">
                  <mat-icon class="feature-icon">{{ feature.icon }}</mat-icon>
                </div>
                <h3 class="feature-title">{{ feature.title }}</h3>
                <p class="feature-description">{{ feature.description }}</p>
                <ul class="feature-details">
                  <li *ngFor="let detail of feature.details">{{ detail }}</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <!-- Enterprise Plans Section -->
        <section class="enterprise-plans">
          <div class="container">
            <div class="section-header">
              <h2 class="section-title">Choose your enterprise plan</h2>
              <p class="section-subtitle">Flexible plans designed to meet the unique needs of your organization</p>
            </div>
            <div class="plans-grid">
              <div class="plan-card" *ngFor="let plan of getEnterprisePlans()">
                <div class="plan-header">
                  <h3 class="plan-name">{{ plan.name }}</h3>
                  <div class="plan-price">{{ plan.price }}</div>
                  <p class="plan-description">{{ plan.description }}</p>
                </div>
                <ul class="plan-features">
                  <li *ngFor="let feature of plan.features">
                    <mat-icon>check</mat-icon>
                    {{ feature }}
                  </li>
                </ul>
                <button class="plan-cta">{{ plan.cta }}</button>
              </div>
            </div>
          </div>
        </section>
      </section>

      <!-- Resources Content -->
      <section *ngIf="pageType === 'resources'" class="resources-page">
        <!-- Resources Hero Section -->
        <section class="resources-hero">
          <div class="container">
            <div class="resources-hero-content">
              <div class="hero-badges">
                <span class="badge" *ngFor="let badge of getHeroBadges()">{{ badge }}</span>
              </div>
              <h1 class="hero-title" [innerHTML]="getHeroTitle()"></h1>
              <p class="hero-subtitle">{{ getHeroSubtitle() }}</p>
              <div class="hero-actions">
                <button mat-raised-button color="primary" class="hero-primary-btn">{{ getPrimaryButtonText() }}</button>
                <button mat-button class="hero-secondary-btn">{{ getSecondaryButtonText() }} <mat-icon>arrow_forward</mat-icon></button>
              </div>
            </div>
          </div>
        </section>

        <!-- Documentation Section -->
        <section class="documentation-section">
          <div class="container">
            <div class="section-header">
              <h2 class="section-title">Comprehensive guides and documentation</h2>
              <p class="section-subtitle">Everything you need to get started and master CollabX</p>
            </div>
            <div class="docs-grid">
              <div class="doc-card" *ngFor="let doc of getDocumentationContent()">
                <div class="doc-icon">
                  <mat-icon>{{ doc.icon }}</mat-icon>
                </div>
                <h3 class="doc-title">{{ doc.title }}</h3>
                <p class="doc-description">{{ doc.description }}</p>
                <div class="doc-meta">
                  <span class="doc-type">{{ doc.type }}</span>
                  <span class="doc-time">{{ doc.time }}</span>
                </div>
                <a href="#" class="doc-link">Read more <mat-icon>arrow_forward</mat-icon></a>
              </div>
            </div>
          </div>
        </section>

        <!-- Blog & Articles Section -->
        <section class="blog-articles-section">
          <div class="container">
            <div class="section-header">
              <h2 class="section-title">Latest insights and best practices</h2>
              <p class="section-subtitle">Stay up-to-date with our blog and expert articles</p>
            </div>
            <div class="articles-grid">
              <div class="article-card" *ngFor="let article of getBlogContent()">
                <div class="article-image">
                  <div class="article-category">{{ article.category }}</div>
                </div>
                <div class="article-content">
                  <h3 class="article-title">{{ article.title }}</h3>
                  <p class="article-description">{{ article.description }}</p>
                  <div class="article-meta">
                    <span class="article-author">{{ article.author }}</span>
                    <span class="article-date">{{ article.date }}</span>
                  </div>
                  <a href="#" class="article-link">Read article <mat-icon>arrow_forward</mat-icon></a>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- Learning Center Section -->
        <section class="learning-center-section">
          <div class="container">
            <div class="section-header">
              <h2 class="section-title">Learning center</h2>
              <p class="section-subtitle">Master CollabX with our comprehensive tutorials and guides</p>
            </div>
            <div class="learning-grid">
              <div class="learning-card" *ngFor="let tutorial of getLearningContent()">
                <div class="learning-icon">
                  <mat-icon>{{ tutorial.icon }}</mat-icon>
                </div>
                <div class="learning-level">{{ tutorial.level }}</div>
                <h3 class="learning-title">{{ tutorial.title }}</h3>
                <p class="learning-description">{{ tutorial.description }}</p>
                <div class="learning-meta">
                  <span class="learning-duration">{{ tutorial.duration }}</span>
                  <span class="learning-lessons">{{ tutorial.lessons }} lessons</span>
                </div>
                <button class="learning-btn">Start Learning</button>
              </div>
            </div>
          </div>
        </section>

        <!-- Community & Support Section -->
        <section class="community-support-section">
          <div class="container">
            <div class="section-header">
              <h2 class="section-title">Join our community and get support</h2>
              <p class="section-subtitle">Connect with other users and get help from our support team</p>
            </div>
            <div class="community-grid">
              <div class="community-card" *ngFor="let item of getCommunityContent()">
                <div class="community-icon">
                  <mat-icon>{{ item.icon }}</mat-icon>
                </div>
                <h3 class="community-title">{{ item.title }}</h3>
                <p class="community-description">{{ item.description }}</p>
                <div class="community-stats">
                  <span class="community-stat">{{ item.stat }}</span>
                </div>
                <button class="community-btn">{{ item.buttonText }}</button>
              </div>
            </div>
          </div>
        </section>
      </section>

      <!-- CTA Section -->
      <section class="cta">
        <div class="container">
          <div class="cta-content">
            <h2 class="cta-title">Ready to transform your workflow?</h2>
            <p class="cta-subtitle">Join thousands of teams who've already made the switch to CollabX</p>
            <div class="cta-actions">
              <button mat-raised-button color="primary" class="cta-btn" (click)="navigateToRegister()">
                <mat-icon>rocket_launch</mat-icon>
                Start Your Free Trial
              </button>
              <button mat-stroked-button class="cta-btn" (click)="navigateToContact()">
                <mat-icon>phone</mat-icon>
                Talk to Sales
              </button>
          </div>
            <p class="cta-note">No credit card required • 14-day free trial • Cancel anytime</p>
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
                <mat-icon class="logo-icon">rocket_launch</mat-icon>
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
      transition: all 0.3s ease;
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

      &:hover {
        transform: scale(1.05);
      }
    }

    .logo-icon {
      font-size: 32px;
      width: 32px;
      height: 32px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    .logo-text {
      font-size: 24px;
      font-weight: 700;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
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

      &:hover {
        color: #667eea;
      }

      &::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        width: 0;
        height: 2px;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        transition: width 0.3s ease;
      }

      &:hover::after {
        width: 100%;
      }

      &.active {
        color: #4f46e5;
        font-weight: 600;

        &::after {
          width: 100%;
        }
      }
    }

    .nav-right {
      display: flex;
      align-items: center;
      gap: 16px;
    }

    .nav-button {
      font-weight: 600;
      text-transform: none;
      border-radius: 12px;
      padding: 12px 24px;
      min-width: auto;
      font-size: 14px;
      transition: all 0.2s ease;

      &.cta-btn {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        border: none;
        box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);

        &:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);
        }
      }
    }

    .hero {
      padding: 120px 0 100px;
      background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
      position: relative;
      overflow: hidden;
    }

    .hero-background {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 1;
    }

    .floating-elements {
      position: absolute;
      width: 100%;
      height: 100%;
    }

    .floating-card {
      position: absolute;
      background: rgba(255, 255, 255, 0.8);
      border-radius: 20px;
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
      animation: float 6s ease-in-out infinite;

      &.card-1 {
        width: 80px;
        height: 80px;
        top: 20%;
        left: 10%;
        animation-delay: 0s;
      }

      &.card-2 {
        width: 120px;
        height: 120px;
        top: 60%;
        right: 15%;
        animation-delay: 2s;
      }

      &.card-3 {
        width: 60px;
        height: 60px;
        top: 40%;
        right: 30%;
        animation-delay: 4s;
      }
    }

    @keyframes float {
      0%, 100% { transform: translateY(0px) rotate(0deg); }
      50% { transform: translateY(-20px) rotate(5deg); }
    }

    .container {
      max-width: 1400px;
      margin: 0 auto;
      padding: 0 32px;
      position: relative;
      z-index: 2;
    }

    .hero-content {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 80px;
      align-items: center;
    }

    .hero-text {
      max-width: 600px;
    }

    .hero-badge {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      background: rgba(102, 126, 234, 0.1);
      color: #667eea;
      padding: 8px 16px;
      border-radius: 50px;
      font-size: 14px;
      font-weight: 500;
      margin-bottom: 24px;
      border: 1px solid rgba(102, 126, 234, 0.2);

      mat-icon {
        font-size: 16px;
        width: 16px;
        height: 16px;
      }
    }

    .hero-title {
      font-size: 56px;
      font-weight: 800;
      color: #1a202c;
      margin: 0 0 24px 0;
      line-height: 1.1;
      letter-spacing: -0.02em;
    }

    .gradient-text {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    .hero-subtitle {
      font-size: 20px;
      color: #64748b;
      margin: 0 0 40px 0;
      line-height: 1.6;
      font-weight: 400;
    }

    .hero-actions {
      display: flex;
      gap: 20px;
      margin-bottom: 48px;
    }

    .hero-btn {
      padding: 16px 32px;
      font-size: 16px;
      font-weight: 600;
      border-radius: 12px;
      text-transform: none;
      min-width: 180px;
      display: flex;
      align-items: center;
      gap: 8px;
      transition: all 0.3s ease;

      &.primary {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        border: none;
        box-shadow: 0 8px 25px rgba(102, 126, 234, 0.3);

        &:hover {
          transform: translateY(-3px);
          box-shadow: 0 12px 35px rgba(102, 126, 234, 0.4);
        }
      }

      &.secondary {
        border: 2px solid #e2e8f0;
        color: #374151;
        background: white;

        &:hover {
          border-color: #667eea;
          color: #667eea;
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
        }
      }
    }

    .hero-stats {
      display: flex;
      gap: 48px;
    }

    .stat {
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
    }

    .stat-number {
      font-size: 32px;
      font-weight: 800;
      color: #667eea;
      line-height: 1;
    }

    .stat-label {
      font-size: 14px;
      color: #64748b;
      font-weight: 500;
      margin-top: 4px;
    }

    .hero-visual {
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .dashboard-mockup {
      background: white;
      border-radius: 20px;
      box-shadow: 0 25px 50px rgba(0, 0, 0, 0.15);
      overflow: hidden;
      width: 100%;
      max-width: 500px;
      transform: perspective(1000px) rotateY(-5deg) rotateX(5deg);
      transition: transform 0.3s ease;

      &:hover {
        transform: perspective(1000px) rotateY(0deg) rotateX(0deg);
      }
    }

    .mockup-header {
      background: #f8fafc;
      padding: 20px 24px;
      border-bottom: 1px solid #e2e8f0;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .mockup-nav {
      display: flex;
      gap: 24px;
    }

    .nav-item {
      font-size: 14px;
      font-weight: 500;
      color: #64748b;
      cursor: pointer;
      transition: color 0.2s ease;

      &.active {
        color: #667eea;
      }

      &:hover {
        color: #667eea;
      }
    }

    .mockup-actions {
      display: flex;
      align-items: center;
      gap: 16px;
      color: #64748b;
    }

    .user-avatar {
      width: 32px;
      height: 32px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
    }

    .mockup-content {
      padding: 24px;
    }

    .content-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 16px;
    }

    .content-card {
      background: #f8fafc;
      border-radius: 12px;
      padding: 16px;
      border: 1px solid #e2e8f0;
    }

    .card-header {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 12px;
      font-size: 12px;
      font-weight: 600;
      color: #374151;

      mat-icon {
        font-size: 16px;
        width: 16px;
        height: 16px;
        color: #667eea;
      }
    }

    .progress-bar {
      width: 100%;
      height: 6px;
      background: #e2e8f0;
      border-radius: 3px;
      overflow: hidden;
      margin-bottom: 8px;
    }

    .progress-fill {
      height: 100%;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      border-radius: 3px;
      transition: width 0.3s ease;
    }

    .progress-text {
      font-size: 11px;
      color: #64748b;
      font-weight: 500;
    }

    .activity-list, .message-preview {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .activity-item, .message-item {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 11px;
      color: #64748b;
    }

    .activity-avatar, .message-avatar {
      width: 20px;
      height: 20px;
      background: #e2e8f0;
      border-radius: 50%;
    }

    .message-content {
      display: flex;
      flex-direction: column;
      gap: 2px;
    }

    .message-author {
      font-weight: 600;
      color: #374151;
    }

    .message-text {
      font-size: 10px;
      color: #64748b;
    }

    .features {
      padding: 120px 0;
      background: white;
    }

    .section-header {
      text-align: center;
      margin-bottom: 80px;
      max-width: 600px;
      margin-left: auto;
      margin-right: auto;
    }

    .section-title {
      font-size: 48px;
      font-weight: 800;
      color: #1a202c;
      margin: 0 0 16px 0;
      line-height: 1.2;
    }

    .section-subtitle {
      font-size: 20px;
      color: #64748b;
      margin: 0;
      line-height: 1.6;
    }

    .features-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
      gap: 40px;
    }

    .feature-card {
      background: white;
      border-radius: 20px;
      padding: 40px 32px;
      border: 1px solid #e2e8f0;
      transition: all 0.3s ease;
      position: relative;
      overflow: hidden;

      &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 4px;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        transform: scaleX(0);
        transition: transform 0.3s ease;
      }

      &:hover {
        transform: translateY(-8px);
        box-shadow: 0 25px 50px rgba(0, 0, 0, 0.1);
        border-color: #667eea;

        &::before {
          transform: scaleX(1);
        }
      }
    }

    .feature-icon-wrapper {
      width: 64px;
      height: 64px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      border-radius: 16px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 24px;
    }

    .feature-icon {
      font-size: 28px;
      width: 28px;
      height: 28px;
      color: white;
    }

    .feature-title {
      font-size: 24px;
      font-weight: 700;
      color: #1a202c;
      margin: 0 0 16px 0;
    }

    .feature-description {
      color: #64748b;
      line-height: 1.6;
      margin: 0 0 24px 0;
      font-size: 16px;
    }

    .feature-list {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      margin-bottom: 24px;
    }

    .feature-tag {
      background: #f1f5f9;
      color: #475569;
      padding: 4px 12px;
      border-radius: 20px;
      font-size: 12px;
      font-weight: 500;
    }

    .resource-link {
      display: block;
      color: #667eea;
      text-decoration: none;
      font-size: 14px;
      margin-bottom: 8px;
      transition: color 0.2s ease;

      &:hover {
        color: #4c51bf;
      }
    }

    .feature-link {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      color: #667eea;
      text-decoration: none;
      font-weight: 600;
      font-size: 14px;
      transition: all 0.2s ease;

      &:hover {
        gap: 12px;
      }

      mat-icon {
        font-size: 16px;
        width: 16px;
        height: 16px;
      }
    }

    /* Enterprise Features Specific Styling */
    .enterprise-features .feature-card {
      background: white;
      border: 1px solid #e2e8f0;
      position: relative;
      overflow: hidden;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
    }

    .enterprise-features .feature-card::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 4px;
      background: linear-gradient(90deg, #4f46e5, #a855f7);
      transform: scaleX(0);
      transition: transform 0.3s ease;
    }

    .enterprise-features .feature-card:hover {
      border-color: #4f46e5;
      box-shadow: 0 8px 25px rgba(79, 70, 229, 0.15);
      transform: translateY(-5px);
    }

    .enterprise-features .feature-card:hover::before {
      transform: scaleX(1);
    }

    .enterprise-features .feature-icon-wrapper {
      background: linear-gradient(135deg, #4f46e5, #a855f7);
      border-radius: 12px;
      padding: 1.2rem;
      margin-bottom: 1.5rem;
      box-shadow: 0 4px 12px rgba(79, 70, 229, 0.2);
    }

    .enterprise-features .feature-icon {
      color: white;
      font-size: 2.2rem;
      width: 2.2rem;
      height: 2.2rem;
    }

    .enterprise-features .feature-title {
      font-size: 1.4rem;
      font-weight: 700;
      color: #1e293b;
      margin-bottom: 1rem;
      line-height: 1.3;
    }

    .enterprise-features .feature-description {
      font-size: 1rem;
      color: #64748b;
      line-height: 1.6;
      margin-bottom: 1.5rem;
    }

    .enterprise-features .feature-details {
      list-style: none;
      padding: 0;
      margin: 0;
    }

    .enterprise-features .feature-details li {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      margin-bottom: 0.8rem;
      color: #475569;
      font-size: 0.95rem;
      font-weight: 500;
      padding: 0.5rem 0;
      position: relative;
    }

    .enterprise-features .feature-details li::before {
      content: '';
      width: 6px;
      height: 6px;
      background: linear-gradient(135deg, #4f46e5, #a855f7);
      border-radius: 50%;
      flex-shrink: 0;
    }

    .enterprise-features .feature-details li:last-child {
      margin-bottom: 0;
    }

    /* Dashboard Mockup Styles */
    .dashboard-mockup {
      background: white;
      border-radius: 16px;
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
      overflow: hidden;
      transform: perspective(1000px) rotateY(-5deg) rotateX(5deg);
      transition: transform 0.3s ease;
    }

    .dashboard-mockup:hover {
      transform: perspective(1000px) rotateY(-2deg) rotateX(2deg);
    }

    .dashboard-header {
      background: #f8fafc;
      padding: 1rem 1.5rem;
      border-bottom: 1px solid #e2e8f0;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .dashboard-nav {
      display: flex;
      gap: 1.5rem;
    }

    .dashboard-nav .nav-item {
      color: #64748b;
      font-size: 0.875rem;
      font-weight: 500;
      padding: 0.5rem 0;
      cursor: pointer;
      transition: color 0.3s ease;
    }

    .dashboard-nav .nav-item.active {
      color: #4f46e5;
      font-weight: 600;
      border-bottom: 2px solid #4f46e5;
    }

    .dashboard-actions {
      display: flex;
      gap: 1rem;
      align-items: center;
    }

    .dashboard-actions mat-icon {
      color: #64748b;
      font-size: 1.25rem;
      cursor: pointer;
      transition: color 0.3s ease;
    }

    .dashboard-actions mat-icon:hover {
      color: #4f46e5;
    }

    .user-avatar {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      background: linear-gradient(135deg, #4f46e5, #a855f7);
      cursor: pointer;
    }

    .user-avatar.enterprise {
      background: linear-gradient(135deg, #059669, #10b981);
    }

    .user-avatar.resources {
      background: linear-gradient(135deg, #dc2626, #f59e0b);
    }

    .dashboard-content {
      padding: 1.5rem;
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1rem;
    }

    .dashboard-card {
      background: #f8fafc;
      border-radius: 12px;
      padding: 1rem;
      border: 1px solid #e2e8f0;
    }

    .card-header {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      margin-bottom: 1rem;
    }

    .card-header mat-icon {
      color: #4f46e5;
      font-size: 1.25rem;
    }

    .card-header span {
      font-weight: 600;
      color: #1e293b;
      font-size: 0.875rem;
    }

    /* Solutions Dashboard Specific Styles */
    .workflow-list {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
    }

    .workflow-item {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      padding: 0.75rem;
      background: white;
      border-radius: 8px;
      border: 1px solid #e2e8f0;
    }

    .workflow-icon {
      width: 32px;
      height: 32px;
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .workflow-icon.engineering {
      background: linear-gradient(135deg, #3b82f6, #1d4ed8);
    }

    .workflow-icon.marketing {
      background: linear-gradient(135deg, #f59e0b, #d97706);
    }

    .workflow-info {
      flex: 1;
      display: flex;
      flex-direction: column;
    }

    .workflow-name {
      font-weight: 600;
      color: #1e293b;
      font-size: 0.875rem;
    }

    .workflow-status {
      color: #64748b;
      font-size: 0.75rem;
    }

    .workflow-progress {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .progress-bar {
      width: 60px;
      height: 4px;
      background: #e2e8f0;
      border-radius: 2px;
      overflow: hidden;
    }

    .progress-fill {
      height: 100%;
      background: linear-gradient(90deg, #4f46e5, #a855f7);
      border-radius: 2px;
      transition: width 0.3s ease;
    }

    .progress-text {
      font-size: 0.75rem;
      color: #64748b;
      font-weight: 500;
    }

    .team-metrics {
      display: flex;
      gap: 1rem;
    }

    .metric {
      text-align: center;
      flex: 1;
    }

    .metric-value {
      display: block;
      font-size: 1.5rem;
      font-weight: 700;
      color: #4f46e5;
    }

    .metric-label {
      font-size: 0.75rem;
      color: #64748b;
    }

    .activity-list {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
    }

    .activity-item {
      display: flex;
      align-items: center;
      gap: 0.75rem;
    }

    .activity-avatar {
      width: 24px;
      height: 24px;
      border-radius: 50%;
    }

    .activity-avatar.eng {
      background: linear-gradient(135deg, #3b82f6, #1d4ed8);
    }

    .activity-avatar.mkt {
      background: linear-gradient(135deg, #f59e0b, #d97706);
    }

    .activity-avatar.community {
      background: linear-gradient(135deg, #dc2626, #f59e0b);
    }

    .activity-text {
      display: flex;
      flex-direction: column;
    }

    .activity-user {
      font-weight: 600;
      color: #1e293b;
      font-size: 0.75rem;
    }

    .activity-action {
      color: #64748b;
      font-size: 0.75rem;
    }

    /* Enterprise Dashboard Specific Styles */
    .security-metrics {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
    }

    .security-item {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      padding: 0.75rem;
      background: white;
      border-radius: 8px;
      border: 1px solid #e2e8f0;
    }

    .security-icon {
      width: 32px;
      height: 32px;
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .security-icon.sso {
      background: linear-gradient(135deg, #059669, #10b981);
    }

    .security-icon.encryption {
      background: linear-gradient(135deg, #dc2626, #f59e0b);
    }

    .security-info {
      flex: 1;
      display: flex;
      flex-direction: column;
    }

    .security-name {
      font-weight: 600;
      color: #1e293b;
      font-size: 0.875rem;
    }

    .security-status {
      color: #64748b;
      font-size: 0.75rem;
    }

    .security-status-indicator {
      width: 8px;
      height: 8px;
      border-radius: 50%;
    }

    .security-status-indicator.success {
      background: #10b981;
    }

    .compliance-list {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
    }

    .compliance-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0.75rem;
      background: white;
      border-radius: 8px;
      border: 1px solid #e2e8f0;
    }

    .compliance-badge {
      padding: 0.25rem 0.75rem;
      border-radius: 12px;
      font-size: 0.75rem;
      font-weight: 600;
      color: white;
    }

    .compliance-badge.soc2 {
      background: linear-gradient(135deg, #3b82f6, #1d4ed8);
    }

    .compliance-badge.gdpr {
      background: linear-gradient(135deg, #059669, #10b981);
    }

    .compliance-status {
      color: #64748b;
      font-size: 0.75rem;
      font-weight: 500;
    }

    .enterprise-metrics {
      display: flex;
      gap: 1rem;
    }

    /* Resources Dashboard Specific Styles */
    .learning-list {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
    }

    .learning-item {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      padding: 0.75rem;
      background: white;
      border-radius: 8px;
      border: 1px solid #e2e8f0;
    }

    .learning-icon {
      width: 32px;
      height: 32px;
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .learning-icon.tutorial {
      background: linear-gradient(135deg, #3b82f6, #1d4ed8);
    }

    .learning-icon.advanced {
      background: linear-gradient(135deg, #dc2626, #f59e0b);
    }

    .learning-info {
      flex: 1;
      display: flex;
      flex-direction: column;
    }

    .learning-name {
      font-weight: 600;
      color: #1e293b;
      font-size: 0.875rem;
    }

    .learning-status {
      color: #64748b;
      font-size: 0.75rem;
    }

    .learning-progress {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .community-activity {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
    }

    .knowledge-metrics {
      display: flex;
      gap: 1rem;
    }

    /* Responsive adjustments for dashboard mockups */
    @media (max-width: 768px) {
      .dashboard-mockup {
        transform: none;
      }

      .dashboard-content {
        grid-template-columns: 1fr;
      }

      .dashboard-nav {
        gap: 1rem;
      }

      .dashboard-nav .nav-item {
        font-size: 0.75rem;
      }

      .team-metrics,
      .enterprise-metrics,
      .knowledge-metrics {
        flex-direction: column;
        gap: 0.5rem;
      }

      .metric {
        text-align: left;
      }
    }

    /* Solutions Page Specific Styles */
    .solutions-hero {
      background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
      padding: 6rem 0;
      text-align: center;
    }

    .solutions-hero-content {
      max-width: 800px;
      margin: 0 auto;
    }

    .industry-solutions {
      padding: 6rem 0;
      background: white;
    }

    .industry-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
      gap: 2rem;
    }

    .industry-card {
      background: #f8fafc;
      padding: 2.5rem;
      border-radius: 12px;
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
      transition: transform 0.3s ease, box-shadow 0.3s ease;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
    }

    .industry-card:hover {
      transform: translateY(-8px);
      box-shadow: 0 12px 30px rgba(0, 0, 0, 0.1);
    }

    .industry-icon {
      background: linear-gradient(135deg, #4f46e5, #a855f7);
      border-radius: 12px;
      padding: 1rem;
      margin-bottom: 1.5rem;
    }

    .industry-icon mat-icon {
      color: white;
      font-size: 2rem;
      width: 2rem;
      height: 2rem;
    }

    .industry-name {
      font-size: 1.5rem;
      font-weight: 700;
      color: #1e293b;
      margin-bottom: 0.75rem;
    }

    .industry-description {
      font-size: 1rem;
      color: #64748b;
      line-height: 1.6;
      margin-bottom: 1.5rem;
      flex-grow: 1;
    }

    .industry-features {
      margin-bottom: 1.5rem;
      width: 100%;
    }

    .feature-item {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      margin-bottom: 0.5rem;
      color: #475569;
      font-size: 0.95rem;
    }

    .feature-item mat-icon {
      color: #10b981;
      font-size: 1.1rem;
    }

    .industry-stats {
      display: flex;
      gap: 1.5rem;
      margin-bottom: 1.5rem;
    }

    .industry-stats .stat {
      text-align: center;
    }

    .industry-stats .stat-number {
      font-size: 1.25rem;
      font-weight: 700;
      color: #4f46e5;
      display: block;
    }

    .industry-stats .stat-label {
      font-size: 0.875rem;
      color: #64748b;
    }

    .industry-btn {
      background: linear-gradient(135deg, #4f46e5, #a855f7);
      color: white;
      font-weight: 600;
      padding: 0.75rem 1.5rem;
      border-radius: 8px;
      font-size: 1rem;
      border: none;
      cursor: pointer;
      transition: transform 0.3s ease, box-shadow 0.3s ease;
    }

    .industry-btn:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 20px rgba(79, 70, 229, 0.3);
    }

    /* Enterprise Page Specific Styles */
    .enterprise-hero {
      background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
      padding: 6rem 0;
      text-align: center;
    }

    .enterprise-hero-content {
      max-width: 800px;
      margin: 0 auto;
    }

    /* Resources Page Specific Styles */
    .resources-hero {
      background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
      padding: 6rem 0;
      text-align: center;
    }

    .resources-hero-content {
      max-width: 800px;
      margin: 0 auto;
    }

    .documentation-section {
      padding: 6rem 0;
      background: white;
    }

    .docs-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 2rem;
    }

    .doc-card {
      background: #f8fafc;
      padding: 2rem;
      border-radius: 12px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
      transition: transform 0.3s ease, box-shadow 0.3s ease;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
    }

    .doc-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
    }

    .doc-icon {
      background: linear-gradient(135deg, #4f46e5, #a855f7);
      border-radius: 12px;
      padding: 1rem;
      margin-bottom: 1.5rem;
    }

    .doc-icon mat-icon {
      color: white;
      font-size: 2rem;
      width: 2rem;
      height: 2rem;
    }

    .doc-title {
      font-size: 1.4rem;
      font-weight: 700;
      color: #1e293b;
      margin-bottom: 0.5rem;
    }

    .doc-description {
      font-size: 0.95rem;
      color: #64748b;
      line-height: 1.6;
      margin-bottom: 1.5rem;
      flex-grow: 1;
    }

    .doc-meta {
      display: flex;
      gap: 1rem;
      margin-bottom: 1.5rem;
      font-size: 0.875rem;
    }

    .doc-type {
      background: #e0e7ff;
      color: #4f46e5;
      padding: 0.25rem 0.75rem;
      border-radius: 12px;
      font-weight: 600;
    }

    .doc-time {
      color: #64748b;
    }

    .doc-link {
      color: #4f46e5;
      text-decoration: none;
      font-weight: 600;
      display: flex;
      align-items: center;
      transition: color 0.3s ease;
    }

    .doc-link:hover {
      color: #4338ca;
    }

    .doc-link mat-icon {
      margin-left: 0.5rem;
      font-size: 1.1rem;
    }

    .blog-articles-section {
      padding: 6rem 0;
      background: #f8fafc;
    }

    .articles-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 2rem;
    }

    .article-card {
      background: white;
      border-radius: 12px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
      overflow: hidden;
      transition: transform 0.3s ease, box-shadow 0.3s ease;
    }

    .article-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
    }

    .article-image {
      height: 200px;
      background: linear-gradient(135deg, #4f46e5, #a855f7);
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
    }

    .article-category {
      background: rgba(255, 255, 255, 0.9);
      color: #4f46e5;
      padding: 0.5rem 1rem;
      border-radius: 20px;
      font-size: 0.875rem;
      font-weight: 600;
    }

    .article-content {
      padding: 1.5rem;
      display: flex;
      flex-direction: column;
    }

    .article-title {
      font-size: 1.3rem;
      font-weight: 700;
      color: #1e293b;
      margin-bottom: 0.75rem;
      line-height: 1.4;
    }

    .article-description {
      font-size: 0.9rem;
      color: #64748b;
      line-height: 1.6;
      margin-bottom: 1.5rem;
      flex-grow: 1;
    }

    .article-meta {
      display: flex;
      gap: 1rem;
      margin-bottom: 1.5rem;
      font-size: 0.875rem;
      color: #64748b;
    }

    .article-link {
      color: #4f46e5;
      text-decoration: none;
      font-weight: 600;
      display: flex;
      align-items: center;
      transition: color 0.3s ease;
    }

    .article-link:hover {
      color: #4338ca;
    }

    .article-link mat-icon {
      margin-left: 0.5rem;
      font-size: 1.1rem;
    }

    .learning-center-section {
      padding: 6rem 0;
      background: white;
    }

    .learning-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 2rem;
    }

    .learning-card {
      background: #f8fafc;
      padding: 2rem;
      border-radius: 12px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
      transition: transform 0.3s ease, box-shadow 0.3s ease;
      text-align: center;
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    .learning-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
    }

    .learning-icon {
      background: linear-gradient(135deg, #4f46e5, #a855f7);
      border-radius: 12px;
      padding: 1rem;
      margin-bottom: 1rem;
    }

    .learning-icon mat-icon {
      color: white;
      font-size: 2rem;
      width: 2rem;
      height: 2rem;
    }

    .learning-level {
      background: #e0e7ff;
      color: #4f46e5;
      padding: 0.25rem 0.75rem;
      border-radius: 12px;
      font-size: 0.875rem;
      font-weight: 600;
      margin-bottom: 1rem;
    }

    .learning-title {
      font-size: 1.4rem;
      font-weight: 700;
      color: #1e293b;
      margin-bottom: 0.5rem;
    }

    .learning-description {
      font-size: 0.95rem;
      color: #64748b;
      line-height: 1.6;
      margin-bottom: 1.5rem;
      flex-grow: 1;
    }

    .learning-meta {
      display: flex;
      gap: 1rem;
      margin-bottom: 1.5rem;
      font-size: 0.875rem;
      color: #64748b;
    }

    .learning-btn {
      background: linear-gradient(135deg, #4f46e5, #a855f7);
      color: white;
      font-weight: 600;
      padding: 0.75rem 1.5rem;
      border-radius: 8px;
      font-size: 1rem;
      border: none;
      cursor: pointer;
      transition: transform 0.3s ease, box-shadow 0.3s ease;
    }

    .learning-btn:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 20px rgba(79, 70, 229, 0.3);
    }

    .community-support-section {
      padding: 6rem 0;
      background: #f8fafc;
    }

    .community-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 2rem;
    }

    .community-card {
      background: white;
      padding: 2rem;
      border-radius: 12px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
      transition: transform 0.3s ease, box-shadow 0.3s ease;
      text-align: center;
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    .community-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
    }

    .community-icon {
      background: linear-gradient(135deg, #4f46e5, #a855f7);
      border-radius: 12px;
      padding: 1rem;
      margin-bottom: 1.5rem;
    }

    .community-icon mat-icon {
      color: white;
      font-size: 2rem;
      width: 2rem;
      height: 2rem;
    }

    .community-title {
      font-size: 1.4rem;
      font-weight: 700;
      color: #1e293b;
      margin-bottom: 0.5rem;
    }

    .community-description {
      font-size: 0.95rem;
      color: #64748b;
      line-height: 1.6;
      margin-bottom: 1.5rem;
      flex-grow: 1;
    }

    .community-stats {
      margin-bottom: 1.5rem;
    }

    .community-stat {
      background: #e0e7ff;
      color: #4f46e5;
      padding: 0.5rem 1rem;
      border-radius: 12px;
      font-size: 0.875rem;
      font-weight: 600;
    }

    .community-btn {
      background: linear-gradient(135deg, #4f46e5, #a855f7);
      color: white;
      font-weight: 600;
      padding: 0.75rem 1.5rem;
      border-radius: 8px;
      font-size: 1rem;
      border: none;
      cursor: pointer;
      transition: transform 0.3s ease, box-shadow 0.3s ease;
    }

    .community-btn:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 20px rgba(79, 70, 229, 0.3);
    }

    /* Responsive adjustments for new sections */
    @media (max-width: 768px) {
      .solutions-hero,
      .enterprise-hero,
      .resources-hero {
        padding: 4rem 0;
      }

      .industry-grid,
      .docs-grid,
      .articles-grid,
      .learning-grid,
      .community-grid {
        grid-template-columns: 1fr;
      }

      .industry-card,
      .doc-card,
      .learning-card,
      .community-card {
        padding: 1.5rem;
      }

      .industry-stats {
        flex-direction: column;
        gap: 0.5rem;
      }

      .industry-stats .stat {
        text-align: left;
      }
    }

    .cta {
      padding: 120px 0;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      position: relative;
      overflow: hidden;

      &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="50" cy="50" r="1" fill="white" opacity="0.1"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>');
        opacity: 0.3;
      }
    }

    .cta-content {
      text-align: center;
      max-width: 700px;
      margin: 0 auto;
      position: relative;
      z-index: 2;
    }

    .cta-title {
      font-size: 48px;
      font-weight: 800;
      margin: 0 0 16px 0;
      line-height: 1.2;
    }

    .cta-subtitle {
      font-size: 20px;
      margin: 0 0 40px 0;
      opacity: 0.9;
      line-height: 1.6;
    }

    .cta-actions {
      display: flex;
      gap: 20px;
      justify-content: center;
      margin-bottom: 24px;
    }

    .cta-btn {
      padding: 16px 32px;
      font-size: 16px;
      font-weight: 600;
      border-radius: 12px;
      text-transform: none;
      min-width: 200px;
      display: flex;
      align-items: center;
      gap: 8px;
      transition: all 0.3s ease;

      &.mat-raised-button {
        background: white;
        color: #667eea;
        border: none;

        &:hover {
          transform: translateY(-3px);
          box-shadow: 0 12px 35px rgba(255, 255, 255, 0.3);
        }
      }

      &.mat-stroked-button {
        border: 2px solid white;
        color: white;
        background: transparent;

        &:hover {
          background: white;
          color: #667eea;
          transform: translateY(-2px);
        }
      }
    }

    .cta-note {
      font-size: 14px;
      opacity: 0.8;
      margin: 0;
    }

    .footer {
      background: #1a202c;
      color: white;
      padding: 80px 0 32px;
    }

    .footer-content {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 48px;
      margin-bottom: 48px;
    }

    .footer-section h4 {
      font-size: 16px;
      font-weight: 700;
      margin: 0 0 20px 0;
      color: white;
    }

    .footer-link {
      display: block;
      color: #94a3b8;
      text-decoration: none;
      margin-bottom: 12px;
      font-size: 14px;
      transition: color 0.2s ease;

      &:hover {
        color: white;
      }
    }

    .footer-bottom {
      border-top: 1px solid #334155;
      padding-top: 32px;
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
      gap: 32px;
    }

    @media (max-width: 768px) {
      .nav-center {
        display: none;
      }

      .hero-content {
        grid-template-columns: 1fr;
        gap: 60px;
        text-align: center;
      }

      .hero-title {
        font-size: 40px;
      }

      .hero-actions {
        flex-direction: column;
        align-items: center;
      }

      .hero-stats {
        justify-content: center;
      }

      .features-grid {
        grid-template-columns: 1fr;
      }

      .cta-actions {
        flex-direction: column;
        align-items: center;
      }

      .footer-bottom {
        flex-direction: column;
        gap: 24px;
        text-align: center;
      }

      .dashboard-mockup {
        transform: none;
      }
    }

    /* Solutions Page Styles */
    .solutions-page {
      background: white;
    }

    .team-categories {
      padding: 4rem 0;
      background: #f8fafc;
    }

    .team-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 2rem;
    }

    .team-card {
      background: white;
      padding: 2rem;
      border-radius: 12px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
      transition: transform 0.3s ease, box-shadow 0.3s ease;
      text-align: center;
    }

    .team-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
    }

    .team-icon {
      width: 60px;
      height: 60px;
      background: linear-gradient(135deg, #667eea, #764ba2);
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto 1.5rem;
    }

    .team-icon mat-icon {
      color: white;
      font-size: 1.5rem;
    }

    .team-name {
      font-size: 1.25rem;
      font-weight: 600;
      margin-bottom: 1rem;
      color: #1a1a1a;
    }

    .team-description {
      color: #64748b;
      margin-bottom: 1.5rem;
      line-height: 1.6;
    }

    .team-stats {
      display: flex;
      justify-content: space-around;
      margin-bottom: 1.5rem;
    }

    .stat {
      text-align: center;
    }

    .stat-number {
      display: block;
      font-size: 1.5rem;
      font-weight: 700;
      color: #2563eb;
    }

    .stat-label {
      font-size: 0.875rem;
      color: #64748b;
    }

    .team-btn {
      background: #2563eb;
      color: white;
      border: none;
      padding: 0.75rem 1.5rem;
      border-radius: 8px;
      font-weight: 600;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      transition: background 0.3s ease;
    }

    .team-btn:hover {
      background: #1d4ed8;
    }

    .use-cases {
      padding: 4rem 0;
      background: white;
    }

    .use-cases-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
      gap: 2rem;
    }

    .use-case-card {
      background: white;
      border: 1px solid #e2e8f0;
      border-radius: 12px;
      padding: 1.5rem;
      transition: transform 0.3s ease, box-shadow 0.3s ease;
    }

    .use-case-card:hover {
      transform: translateY(-3px);
      box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
    }

    .use-case-header {
      display: flex;
      align-items: center;
      gap: 1rem;
      margin-bottom: 1rem;
    }

    .use-case-icon {
      width: 40px;
      height: 40px;
      background: linear-gradient(135deg, #667eea, #764ba2);
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .use-case-icon mat-icon {
      color: white;
      font-size: 1.25rem;
    }

    .use-case-meta {
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
    }

    .use-case-category {
      font-size: 0.875rem;
      color: #2563eb;
      font-weight: 600;
    }

    .use-case-time {
      font-size: 0.75rem;
      color: #64748b;
    }

    .use-case-title {
      font-size: 1.125rem;
      font-weight: 600;
      margin-bottom: 0.75rem;
      color: #1a1a1a;
    }

    .use-case-description {
      color: #64748b;
      margin-bottom: 1rem;
      line-height: 1.6;
    }

    .use-case-features {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
      margin-bottom: 1rem;
    }

    .use-case-feature {
      background: #f1f5f9;
      color: #475569;
      padding: 0.25rem 0.75rem;
      border-radius: 6px;
      font-size: 0.875rem;
    }

    .use-case-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .use-case-company {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .company-avatar {
      width: 24px;
      height: 24px;
      background: #2563eb;
      color: white;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 0.75rem;
      font-weight: 600;
    }

    .company-name {
      font-size: 0.875rem;
      color: #64748b;
    }

    .use-case-link {
      color: #2563eb;
      text-decoration: none;
      font-weight: 600;
      display: inline-flex;
      align-items: center;
      gap: 0.25rem;
      font-size: 0.875rem;
    }

    .workflow-templates {
      padding: 4rem 0;
      background: #f8fafc;
    }

    .templates-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
      gap: 2rem;
    }

    .template-card {
      background: white;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
      transition: transform 0.3s ease, box-shadow 0.3s ease;
    }

    .template-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
    }

    .template-preview {
      background: #f8fafc;
      padding: 1.5rem;
      border-bottom: 1px solid #e2e8f0;
    }

    .template-steps {
      display: flex;
      gap: 1rem;
      overflow-x: auto;
    }

    .step {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.5rem 1rem;
      background: white;
      border-radius: 8px;
      border: 1px solid #e2e8f0;
      min-width: 150px;
      opacity: 0.6;
      transition: opacity 0.3s ease;
    }

    .step.active {
      opacity: 1;
      border-color: #2563eb;
    }

    .step-number {
      width: 24px;
      height: 24px;
      background: #2563eb;
      color: white;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 0.75rem;
      font-weight: 600;
    }

    .step-name {
      font-size: 0.875rem;
      color: #475569;
    }

    .template-content {
      padding: 1.5rem;
    }

    .template-title {
      font-size: 1.125rem;
      font-weight: 600;
      margin-bottom: 0.75rem;
      color: #1a1a1a;
    }

    .template-description {
      color: #64748b;
      margin-bottom: 1rem;
      line-height: 1.6;
    }

    .template-meta {
      display: flex;
      gap: 1rem;
      margin-bottom: 1rem;
    }

    .template-duration,
    .template-complexity {
      display: flex;
      align-items: center;
      gap: 0.25rem;
      font-size: 0.875rem;
      color: #64748b;
    }

    .template-btn {
      background: #2563eb;
      color: white;
      border: none;
      padding: 0.75rem 1.5rem;
      border-radius: 8px;
      font-weight: 600;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      transition: background 0.3s ease;
    }

    .template-btn:hover {
      background: #1d4ed8;
    }

    /* Enterprise Page Styles */
    .enterprise-page {
      background: white;
    }

    .enterprise-stats {
      padding: 4rem 0;
      background: #f8fafc;
    }

    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 2rem;
    }

    .stat-card {
      background: white;
      padding: 2rem;
      border-radius: 12px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
      text-align: center;
      transition: transform 0.3s ease, box-shadow 0.3s ease;
    }

    .stat-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
    }

    .stat-number {
      font-size: 2.5rem;
      font-weight: 800;
      color: #2563eb;
      margin-bottom: 0.5rem;
    }

    .stat-label {
      font-size: 1.125rem;
      font-weight: 600;
      color: #1a1a1a;
      margin-bottom: 0.5rem;
    }

    .stat-description {
      color: #64748b;
      font-size: 0.875rem;
    }

    .enterprise-features {
      padding: 4rem 0;
      background: white;
    }

    .enterprise-plans {
      padding: 4rem 0;
      background: #f8fafc;
    }

    .plans-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
      gap: 2rem;
    }

    .plan-card {
      background: white;
      border-radius: 12px;
      padding: 2rem;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
      transition: transform 0.3s ease, box-shadow 0.3s ease;
    }

    .plan-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
    }

    .plan-header {
      text-align: center;
      margin-bottom: 2rem;
    }

    .plan-name {
      font-size: 1.5rem;
      font-weight: 700;
      color: #1a1a1a;
      margin-bottom: 0.5rem;
    }

    .plan-price {
      font-size: 2rem;
      font-weight: 800;
      color: #2563eb;
      margin-bottom: 0.5rem;
    }

    .plan-description {
      color: #64748b;
    }

    .plan-features {
      list-style: none;
      margin-bottom: 2rem;
    }

    .plan-features li {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      padding: 0.5rem 0;
      color: #475569;
    }

    .plan-features mat-icon {
      color: #10b981;
      font-size: 1.25rem;
    }

    .plan-cta {
      width: 100%;
      background: #2563eb;
      color: white;
      border: none;
      padding: 1rem 2rem;
      border-radius: 8px;
      font-weight: 600;
      cursor: pointer;
      transition: background 0.3s ease;
    }

    .plan-cta:hover {
      background: #1d4ed8;
    }

    /* Resources Page Styles */
    .resources-page {
      background: white;
    }

    .resource-categories {
      padding: 4rem 0;
      background: #f8fafc;
    }

    .categories-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
      gap: 2rem;
    }

    .category-card {
      background: white;
      border-radius: 12px;
      padding: 2rem;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
      transition: transform 0.3s ease, box-shadow 0.3s ease;
    }

    .category-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
    }

    .category-header {
      display: flex;
      align-items: center;
      gap: 1rem;
      margin-bottom: 1.5rem;
    }

    .category-icon {
      width: 50px;
      height: 50px;
      background: linear-gradient(135deg, #667eea, #764ba2);
      border-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .category-icon mat-icon {
      color: white;
      font-size: 1.5rem;
    }

    .category-title {
      font-size: 1.25rem;
      font-weight: 600;
      color: #1a1a1a;
      margin-bottom: 0.5rem;
    }

    .category-description {
      color: #64748b;
      font-size: 0.875rem;
    }

    .category-items {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .resource-item {
      padding: 1rem;
      background: #f8fafc;
      border-radius: 8px;
      transition: background 0.3s ease;
    }

    .resource-item:hover {
      background: #f1f5f9;
    }

    .resource-meta {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 0.5rem;
    }

    .resource-type {
      background: #e0e7ff;
      color: #3730a3;
      padding: 0.25rem 0.5rem;
      border-radius: 4px;
      font-size: 0.75rem;
      font-weight: 600;
    }

    .resource-time {
      color: #64748b;
      font-size: 0.75rem;
    }

    .resource-title {
      font-size: 1rem;
      font-weight: 600;
      color: #1a1a1a;
      margin-bottom: 0.5rem;
    }

    .resource-link {
      color: #2563eb;
      text-decoration: none;
      font-weight: 600;
      display: inline-flex;
      align-items: center;
      gap: 0.25rem;
      font-size: 0.875rem;
    }

    .quick-start {
      padding: 4rem 0;
      background: white;
    }

    .quick-start-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 2rem;
    }

    .step-card {
      background: white;
      border: 1px solid #e2e8f0;
      border-radius: 12px;
      padding: 2rem;
      text-align: center;
      transition: transform 0.3s ease, box-shadow 0.3s ease;
    }

    .step-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
    }

    .step-number {
      width: 50px;
      height: 50px;
      background: linear-gradient(135deg, #667eea, #764ba2);
      color: white;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.25rem;
      font-weight: 700;
      margin: 0 auto 1.5rem;
    }

    .step-title {
      font-size: 1.25rem;
      font-weight: 600;
      color: #1a1a1a;
      margin-bottom: 1rem;
    }

    .step-description {
      color: #64748b;
      margin-bottom: 1.5rem;
      line-height: 1.6;
    }

    .step-link {
      color: #2563eb;
      text-decoration: none;
      font-weight: 600;
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
    }

    .community {
      padding: 4rem 0;
      background: #f8fafc;
    }

    .community-content {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 4rem;
      align-items: center;
    }

    .community-stats {
      display: flex;
      gap: 2rem;
      margin: 2rem 0;
    }

    .community-stat {
      text-align: center;
    }

    .community-stat .stat-number {
      font-size: 1.5rem;
      font-weight: 700;
      color: #2563eb;
      margin-bottom: 0.25rem;
    }

    .community-stat .stat-label {
      font-size: 0.875rem;
      color: #64748b;
    }

    .community-actions {
      display: flex;
      gap: 1rem;
    }

    .community-btn {
      padding: 0.75rem 1.5rem;
      border-radius: 8px;
      font-weight: 600;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      transition: all 0.3s ease;
    }

    .community-preview {
      background: white;
      border-radius: 12px;
      padding: 1.5rem;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
    }

    .preview-header {
      display: flex;
      align-items: center;
      gap: 1rem;
      margin-bottom: 1rem;
    }

    .preview-avatar {
      width: 40px;
      height: 40px;
      background: #2563eb;
      border-radius: 50%;
    }

    .preview-name {
      font-weight: 600;
      color: #1a1a1a;
    }

    .preview-role {
      font-size: 0.875rem;
      color: #64748b;
    }

    .preview-content p {
      color: #475569;
      margin-bottom: 1rem;
      line-height: 1.6;
    }

    .preview-meta {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .preview-time {
      font-size: 0.75rem;
      color: #64748b;
    }

    .preview-likes {
      font-size: 0.875rem;
      color: #64748b;
    }

    /* Responsive Design for New Sections */
    @media (max-width: 768px) {
      .team-grid,
      .use-cases-grid,
      .templates-grid,
      .stats-grid,
      .plans-grid,
      .categories-grid,
      .quick-start-grid {
        grid-template-columns: 1fr;
      }

      .community-content {
        grid-template-columns: 1fr;
        gap: 2rem;
      }

      .community-stats {
        justify-content: center;
      }

      .template-steps {
        flex-direction: column;
      }

      .step {
        min-width: auto;
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
      'features': 'The future of <span class="gradient-text">team collaboration</span> is here',
      'solutions': 'Solutions for every <span class="gradient-text">team and industry</span>',
      'enterprise': 'Enterprise-grade <span class="gradient-text">collaboration platform</span>',
      'resources': 'Everything you need to <span class="gradient-text">succeed with CollabX</span>',
      'pricing': 'Simple, transparent <span class="gradient-text">pricing for everyone</span>'
    };
    return titles[this.pageType] || 'Welcome to <span class="gradient-text">CollabX</span>';
  }

  getHeroSubtitle(): string {
    const subtitles: { [key: string]: string } = {
      'features': 'Transform how your team works together with AI-powered productivity tools, seamless integrations, and real-time collaboration that actually makes work fun.',
      'solutions': 'Discover industry-specific solutions designed to accelerate your team\'s productivity. From engineering to marketing, we have the tools you need to succeed.',
      'enterprise': 'Scale your organization with enterprise-grade security, compliance, and support. Built for teams that demand the highest standards of reliability and performance.',
      'resources': 'Access comprehensive guides, tutorials, and best practices to maximize your team\'s potential with CollabX. Learn from experts and grow your skills.',
      'pricing': 'Choose the perfect plan for your team. Start free and scale as you grow. No hidden fees, no surprises - just transparent pricing that works for everyone.'
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


  getIndustrySolutions(): any[] {
    return [
      {
        icon: 'engineering',
        name: 'Engineering Teams',
        description: 'Streamline development workflows with integrated project management, code collaboration, and automated testing pipelines.',
        features: ['Agile Project Management', 'Code Review Workflows', 'CI/CD Integration', 'Bug Tracking'],
        users: '10K+',
        projects: '50K+'
      },
      {
        icon: 'campaign',
        name: 'Marketing Teams',
        description: 'Launch campaigns faster with collaborative content creation, campaign management, and performance analytics.',
        features: ['Campaign Planning', 'Content Collaboration', 'Performance Analytics', 'A/B Testing'],
        users: '8K+',
        projects: '30K+'
      },
      {
        icon: 'support_agent',
        name: 'IT & Operations',
        description: 'Deliver exceptional service with integrated ticketing, incident management, and automation tools.',
        features: ['Incident Management', 'Service Desk', 'Automation Tools', 'SLA Tracking'],
        users: '5K+',
        projects: '20K+'
      },
      {
        icon: 'category',
        name: 'Product Management',
        description: 'Define, track, and launch products with roadmapping, feedback collection, and cross-functional collaboration.',
        features: ['Product Roadmaps', 'Feedback Management', 'Cross-team Collaboration', 'Release Planning'],
        users: '7K+',
        projects: '25K+'
      },
      {
        icon: 'people',
        name: 'HR & Recruiting',
        description: 'Manage talent acquisition, onboarding, and employee engagement with streamlined HR workflows.',
        features: ['Recruitment Pipeline', 'Onboarding Workflows', 'Employee Engagement', 'Performance Reviews'],
        users: '3K+',
        projects: '10K+'
      },
      {
        icon: 'attach_money',
        name: 'Sales Teams',
        description: 'Accelerate your sales cycle with CRM integrations, lead tracking, and collaborative deal management.',
        features: ['Lead Management', 'Deal Tracking', 'CRM Integration', 'Sales Analytics'],
        users: '6K+',
        projects: '15K+'
      }
    ];
  }

  getUseCases(): any[] {
    return [
      {
        icon: 'rocket_launch',
        category: 'Product Launch',
        time: '2 weeks',
        title: 'Launch a new product feature',
        description: 'From ideation to launch, manage the entire product development lifecycle with cross-functional teams.',
        features: ['Sprint Planning', 'Design Reviews', 'QA Testing', 'Release Management'],
        company: 'TechCorp'
      },
      {
        icon: 'campaign',
        category: 'Marketing Campaign',
        time: '1 month',
        title: 'Execute a multi-channel marketing campaign',
        description: 'Coordinate content creation, social media, email marketing, and analytics across multiple teams.',
        features: ['Content Planning', 'Asset Management', 'Campaign Tracking', 'Performance Analytics'],
        company: 'GrowthCo'
      },
      {
        icon: 'support_agent',
        category: 'Customer Support',
        time: '1 week',
        title: 'Improve customer satisfaction scores',
        description: 'Streamline support processes, reduce response times, and track customer satisfaction metrics.',
        features: ['Ticket Management', 'Knowledge Base', 'Team Training', 'Performance Metrics'],
        company: 'ServicePro'
      },
      {
        icon: 'engineering',
        category: 'Software Development',
        time: '3 months',
        title: 'Build and deploy a mobile app',
        description: 'Manage the complete development lifecycle from planning to deployment with agile methodologies.',
        features: ['Sprint Planning', 'Code Reviews', 'Testing', 'Deployment'],
        company: 'AppDev Inc'
      }
    ];
  }

  getDocumentationContent(): any[] {
    return [
      {
        icon: 'article',
        title: 'Getting Started Guide',
        description: 'Quickly set up your workspace and invite your team members to start collaborating.',
        type: 'Guide',
        time: '10 min read'
      },
      {
        icon: 'api',
        title: 'API Reference',
        description: 'Integrate CollabX with your existing tools and systems using our comprehensive API.',
        type: 'Technical',
        time: '15 min read'
      },
      {
        icon: 'integration_instructions',
        title: 'Integration Guides',
        description: 'Learn how to connect with Slack, GitHub, Jira, and other popular tools.',
        type: 'Tutorial',
        time: '8 min read'
      },
      {
        icon: 'lightbulb',
        title: 'Best Practices',
        description: 'Tips and tricks to maximize your team\'s productivity and collaboration.',
        type: 'Tips',
        time: '12 min read'
      }
    ];
  }

  getBlogContent(): any[] {
    return [
      {
        category: 'AI & Productivity',
        title: 'How AI is Revolutionizing Team Collaboration',
        description: 'Explore the latest trends in AI-powered productivity tools and how they\'re transforming modern workplaces.',
        author: 'Sarah Chen',
        date: 'Dec 15, 2023'
      },
      {
        category: 'Agile Methodologies',
        title: 'Mastering Agile: A Comprehensive Guide',
        description: 'Deep dive into Agile principles and practices for your team, with real-world examples and case studies.',
        author: 'Mike Rodriguez',
        date: 'Dec 12, 2023'
      },
      {
        category: 'Remote Work',
        title: 'Building High-Performing Remote Teams',
        description: 'Strategies for effective collaboration in a distributed environment, from communication to culture.',
        author: 'Alex Johnson',
        date: 'Dec 10, 2023'
      }
    ];
  }

  getLearningContent(): any[] {
    return [
      {
        icon: 'play_circle',
        title: 'Getting Started with CollabX',
        description: 'Learn the basics of CollabX and set up your first project in this comprehensive beginner course.',
        level: 'Beginner',
        duration: '2 hours',
        lessons: 8
      },
      {
        icon: 'workflow',
        title: 'Advanced Workflow Automation',
        description: 'Master advanced automation features to streamline your team\'s processes and boost productivity.',
        level: 'Advanced',
        duration: '4 hours',
        lessons: 12
      },
      {
        icon: 'analytics',
        title: 'Analytics and Reporting',
        description: 'Learn how to use CollabX analytics to make data-driven decisions and track team performance.',
        level: 'Intermediate',
        duration: '3 hours',
        lessons: 10
      }
    ];
  }

  getCommunityContent(): any[] {
    return [
      {
        icon: 'forum',
        title: 'Community Forum',
        description: 'Ask questions, share ideas, and connect with other CollabX users from around the world.',
        stat: '50K+ Members',
        buttonText: 'Join Forum'
      },
      {
        icon: 'help_center',
        title: 'Help Center',
        description: 'Find answers to common questions and troubleshooting tips in our comprehensive help center.',
        stat: '500+ Articles',
        buttonText: 'Visit Help Center'
      },
      {
        icon: 'contact_support',
        title: 'Contact Support',
        description: 'Get personalized assistance from our expert support team whenever you need help.',
        stat: '24/7 Support',
        buttonText: 'Get Support'
      }
    ];
  }


  getEnterpriseFeatures(): any[] {
    return [
      {
        icon: 'security',
        title: 'Enterprise Security',
        description: 'Bank-grade security with end-to-end encryption, SSO, and compliance with SOC2, GDPR, and HIPAA standards.',
        details: ['End-to-end encryption', 'Single Sign-On (SSO)', 'Multi-factor authentication', 'Audit logs']
      },
      {
        icon: 'scale',
        title: 'Unlimited Scale',
        description: 'Support for unlimited users, projects, and data storage. Scale from startup to enterprise without limits.',
        details: ['Unlimited users', 'Unlimited projects', 'Unlimited storage', 'Global infrastructure']
      },
      {
        icon: 'support',
        title: '24/7 Premium Support',
        description: 'Dedicated customer success manager, priority support, and custom training for your team.',
        details: ['Dedicated CSM', 'Priority support', 'Custom training', 'SLA guarantees']
      },
      {
        icon: 'integration',
        title: 'Advanced Integrations',
        description: 'Connect with 500+ enterprise tools including Salesforce, Microsoft 365, Google Workspace, and more.',
        details: ['500+ integrations', 'Custom APIs', 'Webhook support', 'Data migration']
      }
    ];
  }

  getResourcesContent(): any[] {
    return [
      {
        icon: 'article',
        title: 'Documentation',
        description: 'Comprehensive guides and API documentation to help you get the most out of CollabX.',
        links: ['Getting Started', 'API Reference', 'Integration Guides', 'Best Practices']
      },
      {
        icon: 'video_library',
        title: 'Video Tutorials',
        description: 'Step-by-step video tutorials covering everything from basic setup to advanced features.',
        links: ['Quick Start', 'Team Management', 'Advanced Features', 'Troubleshooting']
      },
      {
        icon: 'forum',
        title: 'Community',
        description: 'Connect with other CollabX users, share tips, and get help from the community.',
        links: ['User Forum', 'Feature Requests', 'Success Stories', 'Expert Tips']
      },
      {
        icon: 'school',
        title: 'Training & Certification',
        description: 'Official training programs and certifications to become a CollabX expert.',
        links: ['Online Courses', 'Webinars', 'Certification Program', 'Training Materials']
      }
    ];
  }

  getEnterpriseStats(): any[] {
    return [
      {
        number: '99.9%',
        label: 'Uptime SLA',
        description: 'Guaranteed availability with enterprise-grade infrastructure'
      },
      {
        number: '24/7',
        label: 'Support',
        description: 'Round-the-clock support from our dedicated team'
      },
      {
        number: '500+',
        label: 'Integrations',
        description: 'Connect with all your existing tools and workflows'
      },
      {
        number: 'SOC2',
        label: 'Compliance',
        description: 'Certified security and compliance standards'
      }
    ];
  }

  getEnterprisePlans(): any[] {
    return [
      {
        name: 'Enterprise',
        price: 'Custom',
        description: 'For large organizations with advanced needs',
        features: [
          'Unlimited users and projects',
          'Advanced security & compliance',
          'Dedicated customer success manager',
          'Custom integrations & API access',
          '24/7 priority support',
          'Advanced analytics & reporting',
          'Custom training & onboarding'
        ],
        cta: 'Contact Sales'
      },
      {
        name: 'Enterprise Plus',
        price: 'Custom',
        description: 'For organizations requiring maximum customization',
        features: [
          'Everything in Enterprise',
          'On-premise deployment options',
          'Custom development & features',
          'Dedicated infrastructure',
          'White-label options',
          'Advanced governance tools',
          'Custom SLA agreements'
        ],
        cta: 'Contact Sales'
      }
    ];
  }

  getResourceCategories(): any[] {
    return [
      {
        icon: 'library_books',
        title: 'Learning Center',
        description: 'Master CollabX with our comprehensive learning resources',
        items: [
          { title: 'Getting Started Guide', type: 'Guide', readTime: '10 min' },
          { title: 'Team Collaboration Best Practices', type: 'Article', readTime: '15 min' },
          { title: 'Project Management Fundamentals', type: 'Course', readTime: '2 hours' },
          { title: 'Advanced Workflow Automation', type: 'Tutorial', readTime: '45 min' }
        ]
      },
      {
        icon: 'code',
        title: 'Developer Resources',
        description: 'Build powerful integrations and custom solutions',
        items: [
          { title: 'API Documentation', type: 'Documentation', readTime: '30 min' },
          { title: 'Webhook Integration Guide', type: 'Guide', readTime: '20 min' },
          { title: 'SDK Examples', type: 'Code', readTime: '1 hour' },
          { title: 'Custom App Development', type: 'Tutorial', readTime: '3 hours' }
        ]
      },
      {
        icon: 'trending_up',
        title: 'Success Stories',
        description: 'Learn how teams achieve success with CollabX',
        items: [
          { title: 'How TechCorp Increased Productivity 40%', type: 'Case Study', readTime: '8 min' },
          { title: 'Marketing Team Collaboration Success', type: 'Story', readTime: '6 min' },
          { title: 'Enterprise Implementation Guide', type: 'Guide', readTime: '12 min' },
          { title: 'ROI Calculator', type: 'Tool', readTime: '5 min' }
        ]
      }
    ];
  }

  getFooterSections(): any[] {
    return [
      {
        title: 'Product',
        links: [
          { name: 'Home', route: 'home' },
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
