import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  template: `
    <div class="about-page">
      <div class="hero-section">
        <div class="container">
          <h1>About CollabX</h1>
          <p class="hero-subtitle">Empowering teams to work better together through seamless collaboration</p>
        </div>
      </div>

      <div class="content-section">
        <div class="container">
          <div class="mission-section">
            <h2>Our Mission</h2>
            <p>We believe that great work happens when teams can communicate, collaborate, and coordinate effortlessly. CollabX is designed to break down barriers and bring your team together in one unified workspace.</p>
          </div>

          <div class="story-section">
            <h2>Our Story</h2>
            <p>Founded in 2024, CollabX was born from the frustration of scattered communication tools and fragmented workflows. We saw teams struggling with multiple platforms, lost messages, and disconnected processes.</p>
            <p>Our founders, experienced in building enterprise software, set out to create a solution that would bring everything together - messaging, file sharing, project management, and team coordination - in one intuitive platform.</p>
          </div>

          <div class="values-section">
            <h2>Our Values</h2>
            <div class="values-grid">
              <div class="value-card">
                <mat-icon>group</mat-icon>
                <h3>Team First</h3>
                <p>Every feature we build is designed with team collaboration at its core</p>
              </div>
              <div class="value-card">
                <mat-icon>security</mat-icon>
                <h3>Security & Privacy</h3>
                <p>Your data and conversations are protected with enterprise-grade security</p>
              </div>
              <div class="value-card">
                <mat-icon>speed</mat-icon>
                <h3>Simplicity</h3>
                <p>Powerful features that are easy to use and don't get in your way</p>
              </div>
              <div class="value-card">
                <mat-icon>trending_up</mat-icon>
                <h3>Innovation</h3>
                <p>Continuously evolving to meet the changing needs of modern teams</p>
              </div>
            </div>
          </div>

          <div class="team-section">
            <h2>Leadership Team</h2>
            <div class="team-grid">
              <div class="team-member">
                <div class="member-avatar">JD</div>
                <h3>John Doe</h3>
                <p class="role">CEO & Co-Founder</p>
                <p>Former VP of Engineering at TechCorp with 15+ years building collaboration tools</p>
              </div>
              <div class="team-member">
                <div class="member-avatar">JS</div>
                <h3>Jane Smith</h3>
                <p class="role">CTO & Co-Founder</p>
                <p>Ex-Google engineer specializing in real-time communication systems</p>
              </div>
              <div class="team-member">
                <div class="member-avatar">MJ</div>
                <h3>Mike Johnson</h3>
                <p class="role">Head of Product</p>
                <p>Product leader with experience scaling SaaS platforms to millions of users</p>
              </div>
            </div>
          </div>

          <div class="stats-section">
            <h2>By the Numbers</h2>
            <div class="stats-grid">
              <div class="stat-item">
                <div class="stat-number">10,000+</div>
                <div class="stat-label">Active Teams</div>
              </div>
              <div class="stat-item">
                <div class="stat-number">50M+</div>
                <div class="stat-label">Messages Sent</div>
              </div>
              <div class="stat-item">
                <div class="stat-number">99.9%</div>
                <div class="stat-label">Uptime</div>
              </div>
              <div class="stat-item">
                <div class="stat-number">24/7</div>
                <div class="stat-label">Support</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .about-page {
      font-family: 'Roboto', sans-serif;
      line-height: 1.6;
      color: #1a1a1a;
    }

    .hero-section {
      background: linear-gradient(135deg, #4a154b 0%, #611f69 100%);
      color: white;
      padding: 120px 0 80px;
      text-align: center;
    }

    .hero-section h1 {
      font-size: 48px;
      font-weight: 700;
      margin-bottom: 16px;
    }

    .hero-subtitle {
      font-size: 20px;
      opacity: 0.9;
      max-width: 600px;
      margin: 0 auto;
    }

    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 24px;
    }

    .content-section {
      padding: 80px 0;
    }

    .mission-section, .story-section, .values-section, .team-section, .stats-section {
      margin-bottom: 80px;
    }

    .mission-section h2, .story-section h2, .values-section h2, .team-section h2, .stats-section h2 {
      font-size: 36px;
      font-weight: 700;
      margin-bottom: 24px;
      color: #1a1a1a;
    }

    .story-section p {
      font-size: 18px;
      margin-bottom: 16px;
      color: rgba(0, 0, 0, 0.8);
    }

    .values-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 32px;
      margin-top: 40px;
    }

    .value-card {
      text-align: center;
      padding: 32px 24px;
      border-radius: 8px;
      background: #f8f9fa;
      transition: transform 0.2s;
    }

    .value-card:hover {
      transform: translateY(-4px);
    }

    .value-card mat-icon {
      font-size: 48px;
      color: #4a154b;
      margin-bottom: 16px;
    }

    .value-card h3 {
      font-size: 20px;
      font-weight: 600;
      margin-bottom: 12px;
      color: #1a1a1a;
    }

    .value-card p {
      color: rgba(0, 0, 0, 0.7);
    }

    .team-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 40px;
      margin-top: 40px;
    }

    .team-member {
      text-align: center;
      padding: 32px 24px;
      border-radius: 8px;
      background: white;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }

    .member-avatar {
      width: 80px;
      height: 80px;
      background: #4a154b;
      color: white;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 24px;
      font-weight: 600;
      margin: 0 auto 16px;
    }

    .team-member h3 {
      font-size: 24px;
      font-weight: 600;
      margin-bottom: 8px;
      color: #1a1a1a;
    }

    .role {
      font-weight: 600;
      color: #4a154b;
      margin-bottom: 12px;
    }

    .team-member p:last-child {
      color: rgba(0, 0, 0, 0.7);
    }

    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 40px;
      margin-top: 40px;
    }

    .stat-item {
      text-align: center;
      padding: 32px 24px;
      border-radius: 8px;
      background: linear-gradient(135deg, #4a154b 0%, #611f69 100%);
      color: white;
    }

    .stat-number {
      font-size: 48px;
      font-weight: 700;
      margin-bottom: 8px;
    }

    .stat-label {
      font-size: 16px;
      opacity: 0.9;
    }

    @media (max-width: 768px) {
      .hero-section h1 {
        font-size: 36px;
      }
      
      .hero-subtitle {
        font-size: 18px;
      }
      
      .values-grid, .team-grid, .stats-grid {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class AboutComponent {}
