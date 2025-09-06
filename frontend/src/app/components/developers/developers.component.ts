import { Component } from '@angular/core';

@Component({
  selector: 'app-developers',
  template: `
    <div class="developers-page">
      <div class="hero-section">
        <div class="container">
          <h1>Developer Resources</h1>
          <p class="hero-subtitle">Build powerful integrations and extend CollabX with our comprehensive developer tools</p>
        </div>
      </div>

      <div class="content-section">
        <div class="container">
          <div class="api-overview">
            <h2>CollabX API</h2>
            <p>Our RESTful API allows you to integrate CollabX with your existing tools and build custom applications. Access all core functionality including messaging, user management, and workspace operations.</p>
            
            <div class="api-features">
              <div class="feature-item">
                <mat-icon>api</mat-icon>
                <h3>RESTful API</h3>
                <p>Clean, intuitive REST endpoints with comprehensive documentation</p>
              </div>
              <div class="feature-item">
                <mat-icon>security</mat-icon>
                <h3>OAuth 2.0</h3>
                <p>Secure authentication using industry-standard OAuth 2.0</p>
              </div>
              <div class="feature-item">
                <mat-icon>speed</mat-icon>
                <h3>Real-time Events</h3>
                <p>WebSocket support for real-time messaging and notifications</p>
              </div>
              <div class="feature-item">
                <mat-icon>webhook</mat-icon>
                <h3>Webhooks</h3>
                <p>Receive instant notifications when events occur in your workspace</p>
              </div>
            </div>
          </div>

          <div class="quick-start">
            <h2>Quick Start</h2>
            <div class="quick-start-content">
              <div class="steps">
                <div class="step">
                  <div class="step-number">1</div>
                  <div class="step-content">
                    <h3>Get Your API Key</h3>
                    <p>Create an app in your workspace settings to get your API credentials</p>
                  </div>
                </div>
                <div class="step">
                  <div class="step-number">2</div>
                  <div class="step-content">
                    <h3>Make Your First Request</h3>
                    <p>Test the API with a simple GET request to list your workspaces</p>
                  </div>
                </div>
                <div class="step">
                  <div class="step-number">3</div>
                  <div class="step-content">
                    <h3>Build Your Integration</h3>
                    <p>Use our SDKs and examples to build your custom integration</p>
                  </div>
                </div>
              </div>
              
              <div class="code-example">
                <h3>Example: List Workspaces</h3>
                <div class="code-block">
                  <pre><code>curl -X GET "https://api.collabx.com/v1/workspaces" \
  -H "Authorization: Bearer YOUR_API_TOKEN" \
  -H "Content-Type: application/json"</code></pre>
                </div>
              </div>
            </div>
          </div>

          <div class="sdks-section">
            <h2>Official SDKs</h2>
            <div class="sdks-grid">
              <div class="sdk-card">
                <div class="sdk-icon">🐍</div>
                <h3>Python</h3>
                <p>pip install collabx-python</p>
                <button mat-stroked-button>View Docs</button>
              </div>
              <div class="sdk-card">
                <div class="sdk-icon">🟢</div>
                <h3>Node.js</h3>
                <p>npm install &#64;collabx/node-sdk</p>
                <button mat-stroked-button>View Docs</button>
              </div>
              <div class="sdk-card">
                <div class="sdk-icon">☕</div>
                <h3>Java</h3>
                <p>Maven: com.collabx:java-sdk</p>
                <button mat-stroked-button>View Docs</button>
              </div>
              <div class="sdk-card">
                <div class="sdk-icon">🔷</div>
                <h3>C#</h3>
                <p>NuGet: CollabX.DotNet</p>
                <button mat-stroked-button>View Docs</button>
              </div>
            </div>
          </div>

          <div class="webhooks-section">
            <h2>Webhooks</h2>
            <p>Stay informed about events in your workspace with webhooks. Configure endpoints to receive real-time notifications.</p>
            
            <div class="webhook-events">
              <h3>Available Events</h3>
              <div class="events-grid">
                <div class="event-item">
                  <mat-icon>chat</mat-icon>
                  <div class="event-info">
                    <h4>message.created</h4>
                    <p>Triggered when a new message is posted</p>
                  </div>
                </div>
                <div class="event-item">
                  <mat-icon>group_add</mat-icon>
                  <div class="event-info">
                    <h4>member.joined</h4>
                    <p>Triggered when a new member joins the workspace</p>
                  </div>
                </div>
                <div class="event-item">
                  <mat-icon>folder</mat-icon>
                  <div class="event-info">
                    <h4>file.uploaded</h4>
                    <p>Triggered when a file is uploaded</p>
                  </div>
                </div>
                <div class="event-item">
                  <mat-icon>settings</mat-icon>
                  <div class="event-info">
                    <h4>workspace.updated</h4>
                    <p>Triggered when workspace settings change</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="documentation-section">
            <h2>Documentation</h2>
            <div class="docs-grid">
              <div class="doc-card">
                <mat-icon>api</mat-icon>
                <h3>API Reference</h3>
                <p>Complete reference for all API endpoints, parameters, and responses</p>
                <button mat-raised-button color="primary">View API Docs</button>
              </div>
              <div class="doc-card">
                <mat-icon>code</mat-icon>
                <h3>Code Examples</h3>
                <p>Ready-to-use code samples in multiple programming languages</p>
                <button mat-raised-button color="primary">View Examples</button>
              </div>
              <div class="doc-card">
                <mat-icon>school</mat-icon>
                <h3>Tutorials</h3>
                <p>Step-by-step guides to help you build your first integration</p>
                <button mat-raised-button color="primary">Start Learning</button>
              </div>
            </div>
          </div>

          <div class="community-section">
            <h2>Developer Community</h2>
            <div class="community-content">
              <div class="community-text">
                <p>Join our developer community to get help, share ideas, and stay updated on the latest API changes.</p>
                <div class="community-links">
                  <a href="#" class="community-link">
                    <mat-icon>forum</mat-icon>
                    <span>Developer Forum</span>
                  </a>
                  <a href="#" class="community-link">
                    <mat-icon>code</mat-icon>
                    <span>GitHub</span>
                  </a>
                  <a href="#" class="community-link">
                    <mat-icon>chat</mat-icon>
                    <span>Discord</span>
                  </a>
                </div>
              </div>
              <div class="community-stats">
                <div class="stat">
                  <div class="stat-number">500+</div>
                  <div class="stat-label">Active Developers</div>
                </div>
                <div class="stat">
                  <div class="stat-number">50+</div>
                  <div class="stat-label">Open Source Projects</div>
                </div>
                <div class="stat">
                  <div class="stat-number">24/7</div>
                  <div class="stat-label">Community Support</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .developers-page {
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

    .api-overview, .quick-start, .sdks-section, .webhooks-section, .documentation-section, .community-section {
      margin-bottom: 80px;
    }

    .api-overview h2, .quick-start h2, .sdks-section h2, .webhooks-section h2, .documentation-section h2, .community-section h2 {
      font-size: 36px;
      font-weight: 700;
      margin-bottom: 24px;
      color: #1a1a1a;
    }

    .api-overview p, .webhooks-section p {
      font-size: 18px;
      color: rgba(0, 0, 0, 0.7);
      margin-bottom: 40px;
    }

    .api-features {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 32px;
    }

    .feature-item {
      text-align: center;
      padding: 32px 24px;
      border-radius: 8px;
      background: #f8f9fa;
    }

    .feature-item mat-icon {
      font-size: 48px;
      color: #4a154b;
      margin-bottom: 16px;
    }

    .feature-item h3 {
      font-size: 20px;
      font-weight: 600;
      margin-bottom: 12px;
      color: #1a1a1a;
    }

    .feature-item p {
      color: rgba(0, 0, 0, 0.7);
    }

    .quick-start-content {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 60px;
      align-items: start;
    }

    .steps {
      display: flex;
      flex-direction: column;
      gap: 32px;
    }

    .step {
      display: flex;
      align-items: flex-start;
      gap: 16px;
    }

    .step-number {
      width: 40px;
      height: 40px;
      background: #4a154b;
      color: white;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 600;
      flex-shrink: 0;
    }

    .step-content h3 {
      font-size: 18px;
      font-weight: 600;
      margin-bottom: 8px;
      color: #1a1a1a;
    }

    .step-content p {
      color: rgba(0, 0, 0, 0.7);
    }

    .code-example {
      background: #f8f9fa;
      padding: 24px;
      border-radius: 8px;
    }

    .code-example h3 {
      font-size: 18px;
      font-weight: 600;
      margin-bottom: 16px;
      color: #1a1a1a;
    }

    .code-block {
      background: #1a1a1a;
      color: #f0f0f0;
      padding: 16px;
      border-radius: 4px;
      overflow-x: auto;
    }

    .code-block pre {
      margin: 0;
      font-family: 'Courier New', monospace;
      font-size: 14px;
    }

    .sdks-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 24px;
    }

    .sdk-card {
      background: white;
      padding: 32px 24px;
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      text-align: center;
      transition: transform 0.2s;
    }

    .sdk-card:hover {
      transform: translateY(-4px);
    }

    .sdk-icon {
      font-size: 48px;
      margin-bottom: 16px;
    }

    .sdk-card h3 {
      font-size: 20px;
      font-weight: 600;
      margin-bottom: 8px;
      color: #1a1a1a;
    }

    .sdk-card p {
      color: rgba(0, 0, 0, 0.7);
      margin-bottom: 16px;
      font-family: 'Courier New', monospace;
      font-size: 14px;
    }

    .webhook-events h3 {
      font-size: 24px;
      font-weight: 600;
      margin-bottom: 24px;
      color: #1a1a1a;
    }

    .events-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 24px;
    }

    .event-item {
      display: flex;
      align-items: flex-start;
      gap: 16px;
      padding: 24px;
      background: white;
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }

    .event-item mat-icon {
      color: #4a154b;
      margin-top: 4px;
    }

    .event-info h4 {
      font-size: 16px;
      font-weight: 600;
      margin-bottom: 4px;
      color: #1a1a1a;
    }

    .event-info p {
      color: rgba(0, 0, 0, 0.7);
      font-size: 14px;
    }

    .docs-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 32px;
    }

    .doc-card {
      background: white;
      padding: 32px 24px;
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      text-align: center;
      transition: transform 0.2s;
    }

    .doc-card:hover {
      transform: translateY(-4px);
    }

    .doc-card mat-icon {
      font-size: 48px;
      color: #4a154b;
      margin-bottom: 16px;
    }

    .doc-card h3 {
      font-size: 20px;
      font-weight: 600;
      margin-bottom: 12px;
      color: #1a1a1a;
    }

    .doc-card p {
      color: rgba(0, 0, 0, 0.7);
      margin-bottom: 20px;
    }

    .community-content {
      display: grid;
      grid-template-columns: 2fr 1fr;
      gap: 60px;
      align-items: center;
    }

    .community-text p {
      font-size: 18px;
      color: rgba(0, 0, 0, 0.7);
      margin-bottom: 24px;
    }

    .community-links {
      display: flex;
      gap: 24px;
    }

    .community-link {
      display: flex;
      align-items: center;
      gap: 8px;
      color: #4a154b;
      text-decoration: none;
      font-weight: 500;
      transition: color 0.2s;
    }

    .community-link:hover {
      color: #611f69;
    }

    .community-stats {
      display: flex;
      flex-direction: column;
      gap: 24px;
    }

    .stat {
      text-align: center;
      padding: 24px;
      background: linear-gradient(135deg, #4a154b 0%, #611f69 100%);
      color: white;
      border-radius: 8px;
    }

    .stat-number {
      font-size: 32px;
      font-weight: 700;
      margin-bottom: 4px;
    }

    .stat-label {
      font-size: 14px;
      opacity: 0.9;
    }

    @media (max-width: 768px) {
      .hero-section h1 {
        font-size: 36px;
      }
      
      .hero-subtitle {
        font-size: 18px;
      }
      
      .quick-start-content {
        grid-template-columns: 1fr;
        gap: 40px;
      }
      
      .community-content {
        grid-template-columns: 1fr;
        gap: 40px;
      }
      
      .community-links {
        flex-direction: column;
        gap: 16px;
      }
    }
  `]
})
export class DevelopersComponent {}
