import { Component } from '@angular/core';

@Component({
  selector: 'app-help-center',
  template: `
    <div class="help-center-page">
      <div class="hero-section">
        <div class="container">
          <h1>Help Center</h1>
          <p class="hero-subtitle">Find answers to your questions and learn how to get the most out of CollabX</p>
          <div class="search-section">
            <mat-form-field appearance="outline" class="search-field">
              <mat-label>Search for help</mat-label>
              <input matInput placeholder="Type your question here...">
              <mat-icon matSuffix>search</mat-icon>
            </mat-form-field>
          </div>
        </div>
      </div>

      <div class="content-section">
        <div class="container">
          <div class="help-categories">
            <h2>Popular Topics</h2>
            <div class="categories-grid">
              <div class="category-card">
                <mat-icon>rocket_launch</mat-icon>
                <h3>Getting Started</h3>
                <p>Learn the basics of CollabX</p>
                <ul>
                  <li>Creating your workspace</li>
                  <li>Inviting team members</li>
                  <li>Setting up channels</li>
                </ul>
              </div>
              
              <div class="category-card">
                <mat-icon>chat</mat-icon>
                <h3>Messaging</h3>
                <p>Everything about messaging</p>
                <ul>
                  <li>Sending messages</li>
                  <li>File sharing</li>
                  <li>Message formatting</li>
                </ul>
              </div>
              
              <div class="category-card">
                <mat-icon>group</mat-icon>
                <h3>Team Management</h3>
                <p>Managing your team</p>
                <ul>
                  <li>Adding members</li>
                  <li>Setting permissions</li>
                  <li>Workspace settings</li>
                </ul>
              </div>
              
              <div class="category-card">
                <mat-icon>security</mat-icon>
                <h3>Security & Privacy</h3>
                <p>Keep your data safe</p>
                <ul>
                  <li>Account security</li>
                  <li>Data privacy</li>
                  <li>Two-factor authentication</li>
                </ul>
              </div>
              
              <div class="category-card">
                <mat-icon>phone_android</mat-icon>
                <h3>Mobile Apps</h3>
                <p>Using CollabX on mobile</p>
                <ul>
                  <li>iOS app guide</li>
                  <li>Android app guide</li>
                  <li>Push notifications</li>
                </ul>
              </div>
              
              <div class="category-card">
                <mat-icon>settings</mat-icon>
                <h3>Integrations</h3>
                <p>Connect with other tools</p>
                <ul>
                  <li>Google Workspace</li>
                  <li>Microsoft 365</li>
                  <li>API documentation</li>
                </ul>
              </div>
            </div>
          </div>

          <div class="faq-section">
            <h2>Frequently Asked Questions</h2>
            <div class="faq-list">
              <mat-expansion-panel>
                <mat-expansion-panel-header>
                  <mat-panel-title>How do I create a new workspace?</mat-panel-title>
                </mat-expansion-panel-header>
                <p>To create a new workspace, click on the "Create Workspace" button in the top navigation, enter your workspace name, and invite your team members. You can also import data from other collaboration tools during setup.</p>
              </mat-expansion-panel>
              
              <mat-expansion-panel>
                <mat-expansion-panel-header>
                  <mat-panel-title>How many team members can I invite?</mat-panel-title>
                </mat-expansion-panel-header>
                <p>Our free plan supports up to 10 team members. Paid plans support unlimited team members with additional features like advanced analytics, priority support, and custom integrations.</p>
              </mat-expansion-panel>
              
              <mat-expansion-panel>
                <mat-expansion-panel-header>
                  <mat-panel-title>Can I use CollabX on my mobile device?</mat-panel-title>
                </mat-expansion-panel-header>
                <p>Yes! CollabX has native mobile apps for both iOS and Android. You can download them from the App Store or Google Play Store. All features are available on mobile devices.</p>
              </mat-expansion-panel>
              
              <mat-expansion-panel>
                <mat-expansion-panel-header>
                  <mat-panel-title>How secure is my data?</mat-panel-title>
                </mat-expansion-panel-header>
                <p>We take security seriously. All data is encrypted in transit and at rest using industry-standard encryption. We're SOC 2 compliant and regularly undergo security audits.</p>
              </mat-expansion-panel>
              
              <mat-expansion-panel>
                <mat-expansion-panel-header>
                  <mat-panel-title>Can I export my data?</mat-panel-title>
                </mat-expansion-panel-header>
                <p>Yes, you can export all your data including messages, files, and user information. Go to Settings > Data & Privacy > Export Data to request a complete export of your workspace data.</p>
              </mat-expansion-panel>
              
              <mat-expansion-panel>
                <mat-expansion-panel-header>
                  <mat-panel-title>How do I set up two-factor authentication?</mat-panel-title>
                </mat-expansion-panel-header>
                <p>Go to your profile settings, click on "Security", and enable two-factor authentication. You'll need to scan a QR code with an authenticator app like Google Authenticator or Authy.</p>
              </mat-expansion-panel>
            </div>
          </div>

          <div class="contact-support">
            <h2>Still Need Help?</h2>
            <p>Can't find what you're looking for? Our support team is here to help.</p>
            <div class="support-options">
              <div class="support-option">
                <mat-icon>email</mat-icon>
                <h3>Email Support</h3>
                <p>Get help via email within 24 hours</p>
                <button mat-raised-button color="primary">Contact Support</button>
              </div>
              
              <div class="support-option">
                <mat-icon>chat</mat-icon>
                <h3>Live Chat</h3>
                <p>Chat with our support team in real-time</p>
                <button mat-raised-button color="primary">Start Chat</button>
              </div>
              
              <div class="support-option">
                <mat-icon>video_call</mat-icon>
                <h3>Video Call</h3>
                <p>Schedule a one-on-one session with our experts</p>
                <button mat-raised-button color="primary">Schedule Call</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .help-center-page {
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
      margin: 0 auto 32px;
    }

    .search-section {
      max-width: 500px;
      margin: 0 auto;
    }

    .search-field {
      width: 100%;
    }

    .search-field ::ng-deep .mat-mdc-form-field {
      background: white;
    }

    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 24px;
    }

    .content-section {
      padding: 80px 0;
    }

    .help-categories, .faq-section, .contact-support {
      margin-bottom: 80px;
    }

    .help-categories h2, .faq-section h2, .contact-support h2 {
      font-size: 36px;
      font-weight: 700;
      margin-bottom: 40px;
      color: #1a1a1a;
      text-align: center;
    }

    .categories-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 32px;
    }

    .category-card {
      background: white;
      padding: 32px 24px;
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
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
      font-size: 20px;
      font-weight: 600;
      margin-bottom: 8px;
      color: #1a1a1a;
    }

    .category-card p {
      color: rgba(0, 0, 0, 0.7);
      margin-bottom: 16px;
    }

    .category-card ul {
      list-style: none;
      padding: 0;
      margin: 0;
    }

    .category-card li {
      padding: 4px 0;
      color: rgba(0, 0, 0, 0.6);
      font-size: 14px;
    }

    .category-card li:before {
      content: "•";
      color: #4a154b;
      margin-right: 8px;
    }

    .faq-list {
      max-width: 800px;
      margin: 0 auto;
    }

    .faq-list mat-expansion-panel {
      margin-bottom: 16px;
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }

    .faq-list mat-panel-title {
      font-weight: 600;
      color: #1a1a1a;
    }

    .faq-list p {
      color: rgba(0, 0, 0, 0.7);
      line-height: 1.6;
    }

    .contact-support {
      text-align: center;
    }

    .contact-support p {
      font-size: 18px;
      color: rgba(0, 0, 0, 0.7);
      margin-bottom: 40px;
    }

    .support-options {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 32px;
    }

    .support-option {
      background: white;
      padding: 32px 24px;
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      text-align: center;
    }

    .support-option mat-icon {
      font-size: 48px;
      color: #4a154b;
      margin-bottom: 16px;
    }

    .support-option h3 {
      font-size: 20px;
      font-weight: 600;
      margin-bottom: 8px;
      color: #1a1a1a;
    }

    .support-option p {
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
      
      .categories-grid {
        grid-template-columns: 1fr;
      }
      
      .support-options {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class HelpCenterComponent {}
