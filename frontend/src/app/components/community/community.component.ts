import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-community',
  template: `
    <div class="community-page">
      <div class="hero-section">
        <div class="container">
          <h1>Community</h1>
          <p class="hero-subtitle">Connect with other CollabX users, share ideas, and get help from the community</p>
        </div>
      </div>

      <div class="content-section">
        <div class="container">
          <div class="community-stats">
            <div class="stat-item">
              <div class="stat-number">10,000+</div>
              <div class="stat-label">Active Users</div>
            </div>
            <div class="stat-item">
              <div class="stat-number">500+</div>
              <div class="stat-label">Daily Discussions</div>
            </div>
            <div class="stat-item">
              <div class="stat-number">50+</div>
              <div class="stat-label">Countries</div>
            </div>
            <div class="stat-item">
              <div class="stat-number">24/7</div>
              <div class="stat-label">Support</div>
            </div>
          </div>

          <div class="community-platforms">
            <h2>Join the Conversation</h2>
            <div class="platforms-grid">
              <div class="platform-card">
                <mat-icon>forum</mat-icon>
                <h3>Community Forum</h3>
                <p>Ask questions, share tips, and connect with other users in our official forum.</p>
                <button mat-raised-button color="primary" (click)="joinForum()">Join Forum</button>
              </div>
              
              <div class="platform-card">
                <mat-icon>chat</mat-icon>
                <h3>Discord Server</h3>
                <p>Real-time chat with the community. Get instant help and share your experiences.</p>
                <button mat-raised-button color="primary" (click)="joinDiscord()">Join Discord</button>
              </div>
              
              <div class="platform-card">
                <mat-icon>code</mat-icon>
                <h3>GitHub</h3>
                <p>Contribute to open source projects, report issues, and collaborate on integrations.</p>
                <button mat-raised-button color="primary" (click)="viewGitHub()">View on GitHub</button>
              </div>
              
              <div class="platform-card">
                <mat-icon>groups</mat-icon>
                <h3>User Groups</h3>
                <p>Join local user groups and attend meetups in your area.</p>
                <button mat-raised-button color="primary" (click)="findGroups()">Find Groups</button>
              </div>
            </div>
          </div>

          <div class="featured-content">
            <h2>Featured Discussions</h2>
            <div class="discussions-list">
              <div class="discussion-item">
                <div class="discussion-header">
                  <h3>Best practices for remote team communication</h3>
                  <span class="discussion-meta">by Sarah M. • 2 days ago</span>
                </div>
                <p>Sharing some tips that have worked well for our distributed team...</p>
                <div class="discussion-stats">
                  <span class="stat">👍 24 likes</span>
                  <span class="stat">💬 8 comments</span>
                </div>
              </div>
              
              <div class="discussion-item">
                <div class="discussion-header">
                  <h3>Custom integration with Salesforce</h3>
                  <span class="discussion-meta">by Mike R. • 1 week ago</span>
                </div>
                <p>Built a custom integration to sync our sales data with CollabX channels...</p>
                <div class="discussion-stats">
                  <span class="stat">👍 18 likes</span>
                  <span class="stat">💬 12 comments</span>
                </div>
              </div>
              
              <div class="discussion-item">
                <div class="discussion-header">
                  <h3>Workflow automation ideas</h3>
                  <span class="discussion-meta">by Alex T. • 2 weeks ago</span>
                </div>
                <p>Looking for ideas to automate common team workflows using webhooks...</p>
                <div class="discussion-stats">
                  <span class="stat">👍 31 likes</span>
                  <span class="stat">💬 15 comments</span>
                </div>
              </div>
            </div>
          </div>

          <div class="events-section">
            <h2>Upcoming Events</h2>
            <div class="events-grid">
              <div class="event-card">
                <div class="event-date">
                  <span class="month">Mar</span>
                  <span class="day">25</span>
                </div>
                <div class="event-content">
                  <h3>CollabX User Meetup - San Francisco</h3>
                  <p>Join us for an evening of networking and learning about new features.</p>
                  <span class="event-location">📍 San Francisco, CA</span>
                </div>
              </div>
              
              <div class="event-card">
                <div class="event-date">
                  <span class="month">Apr</span>
                  <span class="day">02</span>
                </div>
                <div class="event-content">
                  <h3>Webinar: Advanced API Usage</h3>
                  <p>Learn how to build powerful integrations with our API.</p>
                  <span class="event-location">🌐 Online</span>
                </div>
              </div>
              
              <div class="event-card">
                <div class="event-date">
                  <span class="month">Apr</span>
                  <span class="day">15</span>
                </div>
                <div class="event-content">
                  <h3>CollabX User Meetup - New York</h3>
                  <p>Connect with other users and share your CollabX success stories.</p>
                  <span class="event-location">📍 New York, NY</span>
                </div>
              </div>
            </div>
          </div>

          <div class="contribute-section">
            <h2>Contribute to the Community</h2>
            <div class="contribute-options">
              <div class="contribute-option">
                <mat-icon>edit</mat-icon>
                <h3>Write a Tutorial</h3>
                <p>Share your knowledge by writing tutorials and guides for other users.</p>
                <button mat-stroked-button (click)="submitTutorial()">Submit Tutorial</button>
              </div>
              
              <div class="contribute-option">
                <mat-icon>bug_report</mat-icon>
                <h3>Report Issues</h3>
                <p>Help improve CollabX by reporting bugs and suggesting new features.</p>
                <button mat-stroked-button (click)="reportIssue()">Report Issue</button>
              </div>
              
              <div class="contribute-option">
                <mat-icon>code</mat-icon>
                <h3>Build Integrations</h3>
                <p>Create integrations and share them with the community.</p>
                <button mat-stroked-button>Share Integration</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .community-page {
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

    .community-stats {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 32px;
      margin-bottom: 80px;
    }

    .stat-item {
      text-align: center;
      padding: 32px 24px;
      background: linear-gradient(135deg, #4a154b 0%, #611f69 100%);
      color: white;
      border-radius: 8px;
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

    .community-platforms, .featured-content, .events-section, .contribute-section {
      margin-bottom: 80px;
    }

    .community-platforms h2, .featured-content h2, .events-section h2, .contribute-section h2 {
      font-size: 36px;
      font-weight: 700;
      margin-bottom: 40px;
      color: #1a1a1a;
      text-align: center;
    }

    .platforms-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 32px;
    }

    .platform-card {
      background: white;
      padding: 32px 24px;
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      text-align: center;
      transition: transform 0.2s;
    }

    .platform-card:hover {
      transform: translateY(-4px);
    }

    .platform-card mat-icon {
      font-size: 48px;
      color: #4a154b;
      margin-bottom: 16px;
    }

    .platform-card h3 {
      font-size: 20px;
      font-weight: 600;
      margin-bottom: 12px;
      color: #1a1a1a;
    }

    .platform-card p {
      color: rgba(0, 0, 0, 0.7);
      margin-bottom: 20px;
    }

    .discussions-list {
      max-width: 800px;
      margin: 0 auto;
    }

    .discussion-item {
      background: white;
      padding: 24px;
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      margin-bottom: 16px;
    }

    .discussion-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 12px;
    }

    .discussion-header h3 {
      font-size: 18px;
      font-weight: 600;
      color: #1a1a1a;
      margin: 0;
    }

    .discussion-meta {
      color: rgba(0, 0, 0, 0.6);
      font-size: 14px;
    }

    .discussion-item p {
      color: rgba(0, 0, 0, 0.7);
      margin-bottom: 16px;
    }

    .discussion-stats {
      display: flex;
      gap: 16px;
    }

    .discussion-stats .stat {
      color: rgba(0, 0, 0, 0.6);
      font-size: 14px;
    }

    .events-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 24px;
    }

    .event-card {
      background: white;
      padding: 24px;
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      display: flex;
      gap: 16px;
    }

    .event-date {
      background: #4a154b;
      color: white;
      padding: 16px;
      border-radius: 8px;
      text-align: center;
      min-width: 60px;
    }

    .event-date .month {
      display: block;
      font-size: 12px;
      font-weight: 600;
    }

    .event-date .day {
      display: block;
      font-size: 24px;
      font-weight: 700;
    }

    .event-content h3 {
      font-size: 18px;
      font-weight: 600;
      margin-bottom: 8px;
      color: #1a1a1a;
    }

    .event-content p {
      color: rgba(0, 0, 0, 0.7);
      margin-bottom: 8px;
    }

    .event-location {
      color: #4a154b;
      font-size: 14px;
      font-weight: 500;
    }

    .contribute-options {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 32px;
    }

    .contribute-option {
      background: white;
      padding: 32px 24px;
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      text-align: center;
      transition: transform 0.2s;
    }

    .contribute-option:hover {
      transform: translateY(-4px);
    }

    .contribute-option mat-icon {
      font-size: 48px;
      color: #4a154b;
      margin-bottom: 16px;
    }

    .contribute-option h3 {
      font-size: 20px;
      font-weight: 600;
      margin-bottom: 12px;
      color: #1a1a1a;
    }

    .contribute-option p {
      color: rgba(0, 0, 0, 0.7);
      margin-bottom: 20px;
    }

    @media (max-width: 768px) {
      .hero-section h1 {
        font-size: 36px;
      }
      
      .hero-subtitle {
        font-size: 18px;
      }
      
      .community-stats {
        grid-template-columns: repeat(2, 1fr);
      }
      
      .discussion-header {
        flex-direction: column;
        gap: 8px;
      }
      
      .event-card {
        flex-direction: column;
        text-align: center;
      }
    }
  `]
})
export class CommunityComponent {
  constructor(private router: Router) {}

  joinForum() {
    // In a real implementation, this would redirect to the forum
    alert('Forum coming soon! This would redirect to our community forum.');
  }

  joinDiscord() {
    // In a real implementation, this would redirect to Discord
    alert('Discord server coming soon! This would redirect to our Discord server.');
  }

  viewGitHub() {
    // In a real implementation, this would redirect to GitHub
    alert('GitHub repository coming soon! This would redirect to our GitHub repository.');
  }

  findGroups() {
    // In a real implementation, this would redirect to user groups
    alert('User groups coming soon! This would redirect to our user groups page.');
  }

  submitTutorial() {
    // In a real implementation, this would redirect to tutorial submission
    alert('Tutorial submission coming soon! This would redirect to our tutorial submission form.');
  }

  reportIssue() {
    // In a real implementation, this would redirect to issue reporting
    alert('Issue reporting coming soon! This would redirect to our issue reporting form.');
  }

  shareIntegration() {
    // In a real implementation, this would redirect to integration sharing
    alert('Integration sharing coming soon! This would redirect to our integration sharing form.');
  }
}
