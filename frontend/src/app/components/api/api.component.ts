import { Component } from '@angular/core';

@Component({
  selector: 'app-api',
  template: `
    <div class="api-page">
      <div class="hero-section">
        <div class="container">
          <h1>API Documentation</h1>
          <p class="hero-subtitle">Complete reference for the CollabX API</p>
        </div>
      </div>

      <div class="content-section">
        <div class="container">
          <div class="api-intro">
            <h2>Getting Started</h2>
            <p>The CollabX API is a RESTful API that allows you to integrate CollabX functionality into your applications. All API requests are made to <code>https://api.collabx.com/v1</code> and require authentication.</p>
          </div>

          <div class="authentication">
            <h2>Authentication</h2>
            <p>All API requests require an API token in the Authorization header:</p>
            <div class="code-block">
              <pre><code>Authorization: Bearer YOUR_API_TOKEN</code></pre>
            </div>
          </div>

          <div class="endpoints">
            <h2>API Endpoints</h2>
            <div class="endpoint-list">
              <div class="endpoint-group">
                <h3>Workspaces</h3>
                <div class="endpoint-item">
                  <span class="method get">GET</span>
                  <span class="path">/workspaces</span>
                  <span class="description">List all workspaces</span>
                </div>
                <div class="endpoint-item">
                  <span class="method get">GET</span>
                  <span class="path">/workspaces/{{ '{' }}id{{ '}' }}</span>
                  <span class="description">Get workspace details</span>
                </div>
                <div class="endpoint-item">
                  <span class="method post">POST</span>
                  <span class="path">/workspaces</span>
                  <span class="description">Create a new workspace</span>
                </div>
              </div>

              <div class="endpoint-group">
                <h3>Messages</h3>
                <div class="endpoint-item">
                  <span class="method get">GET</span>
                  <span class="path">/messages</span>
                  <span class="description">List messages</span>
                </div>
                <div class="endpoint-item">
                  <span class="method post">POST</span>
                  <span class="path">/messages</span>
                  <span class="description">Send a message</span>
                </div>
                <div class="endpoint-item">
                  <span class="method put">PUT</span>
                  <span class="path">/messages/{{ '{' }}id{{ '}' }}</span>
                  <span class="description">Update a message</span>
                </div>
                <div class="endpoint-item">
                  <span class="method delete">DELETE</span>
                  <span class="path">/messages/{{ '{' }}id{{ '}' }}</span>
                  <span class="description">Delete a message</span>
                </div>
              </div>

              <div class="endpoint-group">
                <h3>Users</h3>
                <div class="endpoint-item">
                  <span class="method get">GET</span>
                  <span class="path">/users</span>
                  <span class="description">List users</span>
                </div>
                <div class="endpoint-item">
                  <span class="method get">GET</span>
                  <span class="path">/users/{{ '{' }}id{{ '}' }}</span>
                  <span class="description">Get user details</span>
                </div>
                <div class="endpoint-item">
                  <span class="method post">POST</span>
                  <span class="path">/users</span>
                  <span class="description">Create a new user</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .api-page {
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
    }

    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 24px;
    }

    .content-section {
      padding: 80px 0;
    }

    .api-intro, .authentication, .endpoints {
      margin-bottom: 60px;
    }

    .api-intro h2, .authentication h2, .endpoints h2 {
      font-size: 32px;
      font-weight: 700;
      margin-bottom: 24px;
      color: #1a1a1a;
    }

    .api-intro p, .authentication p {
      font-size: 18px;
      color: rgba(0, 0, 0, 0.7);
      margin-bottom: 16px;
    }

    .api-intro code {
      background: #f0f0f0;
      padding: 2px 8px;
      border-radius: 4px;
      font-family: 'Courier New', monospace;
    }

    .code-block {
      background: #1a1a1a;
      color: #f0f0f0;
      padding: 16px;
      border-radius: 8px;
      margin: 16px 0;
    }

    .code-block pre {
      margin: 0;
      font-family: 'Courier New', monospace;
    }

    .endpoint-group {
      margin-bottom: 40px;
    }

    .endpoint-group h3 {
      font-size: 24px;
      font-weight: 600;
      margin-bottom: 16px;
      color: #1a1a1a;
    }

    .endpoint-item {
      display: grid;
      grid-template-columns: 80px 1fr 2fr;
      gap: 16px;
      align-items: center;
      padding: 12px 0;
      border-bottom: 1px solid #e0e0e0;
    }

    .method {
      padding: 4px 8px;
      border-radius: 4px;
      font-size: 12px;
      font-weight: 600;
      text-align: center;
    }

    .method.get {
      background: #e8f5e8;
      color: #2e7d32;
    }

    .method.post {
      background: #e3f2fd;
      color: #1976d2;
    }

    .method.put {
      background: #fff3e0;
      color: #f57c00;
    }

    .method.delete {
      background: #ffebee;
      color: #d32f2f;
    }

    .path {
      font-family: 'Courier New', monospace;
      font-weight: 500;
    }

    .description {
      color: rgba(0, 0, 0, 0.7);
    }

    @media (max-width: 768px) {
      .hero-section h1 {
        font-size: 36px;
      }
      
      .endpoint-item {
        grid-template-columns: 1fr;
        gap: 8px;
      }
    }
  `]
})
export class ApiComponent {}
