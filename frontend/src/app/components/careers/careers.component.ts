import { Component } from '@angular/core';

@Component({
  selector: 'app-careers',
  template: `
    <div class="careers-page">
      <div class="hero-section">
        <div class="container">
          <h1>Join Our Team</h1>
          <p class="hero-subtitle">Help us build the future of team collaboration</p>
        </div>
      </div>

      <div class="content-section">
        <div class="container">
          <div class="why-join-section">
            <h2>Why Join CollabX?</h2>
            <div class="benefits-grid">
              <div class="benefit-card">
                <mat-icon>rocket_launch</mat-icon>
                <h3>Fast-Growing Startup</h3>
                <p>Be part of a rapidly scaling company with huge growth potential</p>
              </div>
              <div class="benefit-card">
                <mat-icon>work</mat-icon>
                <h3>Remote-First Culture</h3>
                <p>Work from anywhere with flexible hours and unlimited PTO</p>
              </div>
              <div class="benefit-card">
                <mat-icon>trending_up</mat-icon>
                <h3>Career Growth</h3>
                <p>Opportunities to learn, grow, and take on new challenges</p>
              </div>
              <div class="benefit-card">
                <mat-icon>diversity_3</mat-icon>
                <h3>Diverse Team</h3>
                <p>Work with talented people from around the world</p>
              </div>
              <div class="benefit-card">
                <mat-icon>fitness_center</mat-icon>
                <h3>Health & Wellness</h3>
                <p>Comprehensive health coverage and wellness programs</p>
              </div>
              <div class="benefit-card">
                <mat-icon>school</mat-icon>
                <h3>Learning Budget</h3>
                <p>$2,000 annual learning and development budget</p>
              </div>
            </div>
          </div>

          <div class="open-positions-section">
            <h2>Open Positions</h2>
            <div class="positions-list">
              <div class="position-card">
                <div class="position-header">
                  <h3>Senior Frontend Engineer</h3>
                  <span class="position-type">Full-time • Remote</span>
                </div>
                <p class="position-description">Build beautiful, responsive user interfaces using Angular and TypeScript</p>
                <div class="position-tags">
                  <span class="tag">Angular</span>
                  <span class="tag">TypeScript</span>
                  <span class="tag">Material UI</span>
                </div>
                <button mat-raised-button color="primary" class="apply-btn" (click)="applyForPosition()">Apply Now</button>
              </div>

              <div class="position-card">
                <div class="position-header">
                  <h3>Backend Engineer</h3>
                  <span class="position-type">Full-time • Remote</span>
                </div>
                <p class="position-description">Design and build scalable APIs using FastAPI and Python</p>
                <div class="position-tags">
                  <span class="tag">Python</span>
                  <span class="tag">FastAPI</span>
                  <span class="tag">PostgreSQL</span>
                </div>
                <button mat-raised-button color="primary" class="apply-btn" (click)="applyForPosition()">Apply Now</button>
              </div>

              <div class="position-card">
                <div class="position-header">
                  <h3>DevOps Engineer</h3>
                  <span class="position-type">Full-time • Remote</span>
                </div>
                <p class="position-description">Manage infrastructure and deployment pipelines in AWS</p>
                <div class="position-tags">
                  <span class="tag">AWS</span>
                  <span class="tag">Docker</span>
                  <span class="tag">Kubernetes</span>
                </div>
                <button mat-raised-button color="primary" class="apply-btn" (click)="applyForPosition()">Apply Now</button>
              </div>

              <div class="position-card">
                <div class="position-header">
                  <h3>Product Manager</h3>
                  <span class="position-type">Full-time • Remote</span>
                </div>
                <p class="position-description">Lead product strategy and work with engineering teams</p>
                <div class="position-tags">
                  <span class="tag">Product Strategy</span>
                  <span class="tag">User Research</span>
                  <span class="tag">Agile</span>
                </div>
                <button mat-raised-button color="primary" class="apply-btn" (click)="applyForPosition()">Apply Now</button>
              </div>

              <div class="position-card">
                <div class="position-header">
                  <h3>UX Designer</h3>
                  <span class="position-type">Full-time • Remote</span>
                </div>
                <p class="position-description">Create intuitive user experiences and beautiful interfaces</p>
                <div class="position-tags">
                  <span class="tag">Figma</span>
                  <span class="tag">User Research</span>
                  <span class="tag">Prototyping</span>
                </div>
                <button mat-raised-button color="primary" class="apply-btn" (click)="applyForPosition()">Apply Now</button>
              </div>

              <div class="position-card">
                <div class="position-header">
                  <h3>Customer Success Manager</h3>
                  <span class="position-type">Full-time • Remote</span>
                </div>
                <p class="position-description">Help customers succeed and grow with our platform</p>
                <div class="position-tags">
                  <span class="tag">Customer Support</span>
                  <span class="tag">SaaS</span>
                  <span class="tag">Communication</span>
                </div>
                <button mat-raised-button color="primary" class="apply-btn" (click)="applyForPosition()">Apply Now</button>
              </div>
            </div>
          </div>

          <div class="culture-section">
            <h2>Our Culture</h2>
            <div class="culture-content">
              <div class="culture-text">
                <p>At CollabX, we believe that great products are built by great teams. We foster a culture of collaboration, innovation, and continuous learning.</p>
                <p>Our team is distributed across the globe, bringing together diverse perspectives and experiences. We value transparency, ownership, and the freedom to experiment and learn from failures.</p>
                <p>We're not just building a product - we're building the future of how teams work together.</p>
              </div>
              <div class="culture-stats">
                <div class="culture-stat">
                  <div class="stat-number">15+</div>
                  <div class="stat-label">Countries</div>
                </div>
                <div class="culture-stat">
                  <div class="stat-number">50+</div>
                  <div class="stat-label">Team Members</div>
                </div>
                <div class="culture-stat">
                  <div class="stat-number">100%</div>
                  <div class="stat-label">Remote</div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  `,
  styles: [`
    .careers-page {
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

    .why-join-section, .open-positions-section, .culture-section {
      margin-bottom: 80px;
    }

    .why-join-section h2, .open-positions-section h2, .culture-section h2 {
      font-size: 36px;
      font-weight: 700;
      margin-bottom: 40px;
      color: #1a1a1a;
      text-align: center;
    }

    .benefits-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 32px;
    }

    .benefit-card {
      text-align: center;
      padding: 32px 24px;
      border-radius: 8px;
      background: #f8f9fa;
      transition: transform 0.2s;
    }

    .benefit-card:hover {
      transform: translateY(-4px);
    }

    .benefit-card mat-icon {
      font-size: 48px;
      color: #4a154b;
      margin-bottom: 16px;
    }

    .benefit-card h3 {
      font-size: 20px;
      font-weight: 600;
      margin-bottom: 12px;
      color: #1a1a1a;
    }

    .benefit-card p {
      color: rgba(0, 0, 0, 0.7);
    }

    .positions-list {
      display: grid;
      gap: 24px;
    }

    .position-card {
      padding: 32px;
      border-radius: 8px;
      background: white;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      border-left: 4px solid #4a154b;
    }

    .position-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 12px;
    }

    .position-header h3 {
      font-size: 24px;
      font-weight: 600;
      color: #1a1a1a;
      margin: 0;
    }

    .position-type {
      color: #4a154b;
      font-weight: 500;
      font-size: 14px;
    }

    .position-description {
      color: rgba(0, 0, 0, 0.7);
      margin-bottom: 16px;
    }

    .position-tags {
      display: flex;
      gap: 8px;
      margin-bottom: 20px;
      flex-wrap: wrap;
    }

    .tag {
      background: #f0f0f0;
      color: #1a1a1a;
      padding: 4px 12px;
      border-radius: 16px;
      font-size: 12px;
      font-weight: 500;
    }

    .apply-btn {
      font-weight: 600;
    }

    .culture-content {
      display: grid;
      grid-template-columns: 2fr 1fr;
      gap: 60px;
      align-items: center;
    }

    .culture-text p {
      font-size: 18px;
      color: rgba(0, 0, 0, 0.8);
      margin-bottom: 16px;
    }

    .culture-stats {
      display: flex;
      flex-direction: column;
      gap: 32px;
    }

    .culture-stat {
      text-align: center;
      padding: 24px;
      border-radius: 8px;
      background: linear-gradient(135deg, #4a154b 0%, #611f69 100%);
      color: white;
    }

    .stat-number {
      font-size: 36px;
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
      
      .benefits-grid {
        grid-template-columns: 1fr;
      }
      
      .position-header {
        flex-direction: column;
        gap: 8px;
      }
      
      .culture-content {
        grid-template-columns: 1fr;
        gap: 40px;
      }
    }
  `]
})
export class CareersComponent {
  applyForPosition() {
    alert('Thank you for applying. The role is no longer available');
  }
}
