import { Component } from '@angular/core';

@Component({
  selector: 'app-blog',
  template: `
    <div class="blog-page">
      <div class="hero-section">
        <div class="container">
          <h1>CollabX Blog</h1>
          <p class="hero-subtitle">Insights, tips, and stories about team collaboration and productivity</p>
        </div>
      </div>

      <div class="content-section">
        <div class="container">
          <div class="featured-post">
            <div class="featured-content">
              <div class="featured-text">
                <span class="featured-badge">Featured</span>
                <h2>The Future of Remote Work: How Teams Are Adapting in 2024</h2>
                <p>Explore the latest trends in remote work and how modern teams are building stronger connections despite physical distance.</p>
                <div class="post-meta">
                  <span class="author">By Sarah Johnson</span>
                  <span class="date">March 15, 2024</span>
                  <span class="read-time">5 min read</span>
                </div>
                <button mat-raised-button color="primary" class="read-more-btn">Read More</button>
              </div>
              <div class="featured-image">
                <div class="image-placeholder">
                  <mat-icon>article</mat-icon>
                </div>
              </div>
            </div>
          </div>

          <div class="blog-grid">
            <div class="blog-post">
              <div class="post-image">
                <div class="image-placeholder">
                  <mat-icon>group</mat-icon>
                </div>
              </div>
              <div class="post-content">
                <h3>10 Tips for Better Team Communication</h3>
                <p>Learn practical strategies to improve communication within your team and boost productivity.</p>
                <div class="post-meta">
                  <span class="author">By Mike Chen</span>
                  <span class="date">March 12, 2024</span>
                </div>
              </div>
            </div>

            <div class="blog-post">
              <div class="post-image">
                <div class="image-placeholder">
                  <mat-icon>trending_up</mat-icon>
                </div>
              </div>
              <div class="post-content">
                <h3>Scaling Your Team: Lessons from Growing Startups</h3>
                <p>Discover how successful startups manage team growth while maintaining culture and productivity.</p>
                <div class="post-meta">
                  <span class="author">By Emily Rodriguez</span>
                  <span class="date">March 10, 2024</span>
                </div>
              </div>
            </div>

            <div class="blog-post">
              <div class="post-image">
                <div class="image-placeholder">
                  <mat-icon>security</mat-icon>
                </div>
              </div>
              <div class="post-content">
                <h3>Data Security Best Practices for Remote Teams</h3>
                <p>Essential security measures every remote team should implement to protect sensitive information.</p>
                <div class="post-meta">
                  <span class="author">By David Kim</span>
                  <span class="date">March 8, 2024</span>
                </div>
              </div>
            </div>

            <div class="blog-post">
              <div class="post-image">
                <div class="image-placeholder">
                  <mat-icon>psychology</mat-icon>
                </div>
              </div>
              <div class="post-content">
                <h3>The Psychology of Effective Collaboration</h3>
                <p>Understanding the human factors that make teams work better together.</p>
                <div class="post-meta">
                  <span class="author">By Dr. Lisa Wang</span>
                  <span class="date">March 5, 2024</span>
                </div>
              </div>
            </div>

            <div class="blog-post">
              <div class="post-image">
                <div class="image-placeholder">
                  <mat-icon>analytics</mat-icon>
                </div>
              </div>
              <div class="post-content">
                <h3>Measuring Team Productivity: Key Metrics to Track</h3>
                <p>Learn which metrics matter most when evaluating team performance and productivity.</p>
                <div class="post-meta">
                  <span class="author">By Alex Thompson</span>
                  <span class="date">March 3, 2024</span>
                </div>
              </div>
            </div>

            <div class="blog-post">
              <div class="post-image">
                <div class="image-placeholder">
                  <mat-icon>diversity_3</mat-icon>
                </div>
              </div>
              <div class="post-content">
                <h3>Building Inclusive Remote Teams</h3>
                <p>Strategies for creating an inclusive environment that supports all team members.</p>
                <div class="post-meta">
                  <span class="author">By Maria Santos</span>
                  <span class="date">March 1, 2024</span>
                </div>
              </div>
            </div>
          </div>

          <div class="newsletter-section">
            <div class="newsletter-content">
              <h2>Stay Updated</h2>
              <p>Get the latest insights on team collaboration delivered to your inbox.</p>
              <div class="newsletter-form">
                <mat-form-field appearance="outline" class="email-field">
                  <mat-label>Email Address</mat-label>
                  <input matInput type="email" placeholder="Enter your email">
                </mat-form-field>
                <button mat-raised-button color="primary" class="subscribe-btn">Subscribe</button>
              </div>
              <p class="newsletter-note">No spam, unsubscribe at any time.</p>
            </div>
          </div>

          <div class="categories-section">
            <h2>Browse by Category</h2>
            <div class="categories-grid">
              <div class="category-card">
                <mat-icon>group</mat-icon>
                <h3>Team Management</h3>
                <p>12 articles</p>
              </div>
              <div class="category-card">
                <mat-icon>work</mat-icon>
                <h3>Remote Work</h3>
                <p>8 articles</p>
              </div>
              <div class="category-card">
                <mat-icon>trending_up</mat-icon>
                <h3>Productivity</h3>
                <p>15 articles</p>
              </div>
              <div class="category-card">
                <mat-icon>security</mat-icon>
                <h3>Security</h3>
                <p>6 articles</p>
              </div>
              <div class="category-card">
                <mat-icon>psychology</mat-icon>
                <h3>Workplace Culture</h3>
                <p>10 articles</p>
              </div>
              <div class="category-card">
                <mat-icon>analytics</mat-icon>
                <h3>Analytics</h3>
                <p>4 articles</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .blog-page {
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

    .featured-post {
      margin-bottom: 80px;
      background: white;
      border-radius: 12px;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
      overflow: hidden;
    }

    .featured-content {
      display: grid;
      grid-template-columns: 1fr 1fr;
      min-height: 400px;
    }

    .featured-text {
      padding: 48px;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }

    .featured-badge {
      background: #4a154b;
      color: white;
      padding: 6px 16px;
      border-radius: 20px;
      font-size: 12px;
      font-weight: 600;
      align-self: flex-start;
      margin-bottom: 16px;
    }

    .featured-text h2 {
      font-size: 32px;
      font-weight: 700;
      margin-bottom: 16px;
      color: #1a1a1a;
    }

    .featured-text p {
      font-size: 18px;
      color: rgba(0, 0, 0, 0.7);
      margin-bottom: 24px;
    }

    .post-meta {
      display: flex;
      gap: 16px;
      margin-bottom: 24px;
      font-size: 14px;
      color: rgba(0, 0, 0, 0.6);
    }

    .read-more-btn {
      align-self: flex-start;
      font-weight: 600;
    }

    .featured-image {
      background: #f8f9fa;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .image-placeholder {
      width: 200px;
      height: 200px;
      background: #e0e0e0;
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .image-placeholder mat-icon {
      font-size: 64px;
      color: #999;
    }

    .blog-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
      gap: 32px;
      margin-bottom: 80px;
    }

    .blog-post {
      background: white;
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      overflow: hidden;
      transition: transform 0.2s;
    }

    .blog-post:hover {
      transform: translateY(-4px);
    }

    .post-image {
      height: 200px;
      background: #f8f9fa;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .post-content {
      padding: 24px;
    }

    .post-content h3 {
      font-size: 20px;
      font-weight: 600;
      margin-bottom: 12px;
      color: #1a1a1a;
    }

    .post-content p {
      color: rgba(0, 0, 0, 0.7);
      margin-bottom: 16px;
    }

    .newsletter-section {
      background: linear-gradient(135deg, #4a154b 0%, #611f69 100%);
      color: white;
      padding: 60px;
      border-radius: 12px;
      text-align: center;
      margin-bottom: 80px;
    }

    .newsletter-content h2 {
      font-size: 32px;
      font-weight: 700;
      margin-bottom: 16px;
    }

    .newsletter-content p {
      font-size: 18px;
      opacity: 0.9;
      margin-bottom: 32px;
    }

    .newsletter-form {
      display: flex;
      gap: 16px;
      max-width: 500px;
      margin: 0 auto 16px;
    }

    .email-field {
      flex: 1;
    }

    .email-field ::ng-deep .mat-mdc-form-field {
      background: white;
    }

    .subscribe-btn {
      font-weight: 600;
    }

    .newsletter-note {
      font-size: 14px;
      opacity: 0.8;
    }

    .categories-section h2 {
      font-size: 36px;
      font-weight: 700;
      margin-bottom: 40px;
      text-align: center;
      color: #1a1a1a;
    }

    .categories-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 24px;
    }

    .category-card {
      background: white;
      padding: 32px 24px;
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      text-align: center;
      transition: transform 0.2s;
    }

    .category-card:hover {
      transform: translateY(-4px);
    }

    .category-card mat-icon {
      font-size: 48px;
      color: #4a154b;
      margin-bottom: 16px;
    }

    .category-card h3 {
      font-size: 18px;
      font-weight: 600;
      margin-bottom: 8px;
      color: #1a1a1a;
    }

    .category-card p {
      color: rgba(0, 0, 0, 0.6);
      font-size: 14px;
    }

    @media (max-width: 768px) {
      .hero-section h1 {
        font-size: 36px;
      }
      
      .hero-subtitle {
        font-size: 18px;
      }
      
      .featured-content {
        grid-template-columns: 1fr;
      }
      
      .featured-text {
        padding: 32px 24px;
      }
      
      .featured-text h2 {
        font-size: 24px;
      }
      
      .blog-grid {
        grid-template-columns: 1fr;
      }
      
      .newsletter-form {
        flex-direction: column;
      }
      
      .categories-grid {
        grid-template-columns: repeat(2, 1fr);
      }
    }
  `]
})
export class BlogComponent {}
