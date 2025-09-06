import { Component } from '@angular/core';

@Component({
  selector: 'app-security',
  template: `
    <div class="security-page">
      <div class="hero-section">
        <div class="container">
          <h1>Security</h1>
          <p class="hero-subtitle">Your data security is our top priority</p>
        </div>
      </div>

      <div class="content-section">
        <div class="container">
          <div class="security-overview">
            <h2>Security Overview</h2>
            <p>At CollabX, we implement comprehensive security measures to protect your data and ensure the confidentiality, integrity, and availability of our services.</p>
          </div>

          <div class="security-features">
            <h2>Security Features</h2>
            <div class="features-grid">
              <div class="feature-card">
                <mat-icon>lock</mat-icon>
                <h3>End-to-End Encryption</h3>
                <p>All data is encrypted in transit and at rest using industry-standard AES-256 encryption.</p>
              </div>
              
              <div class="feature-card">
                <mat-icon>verified_user</mat-icon>
                <h3>Two-Factor Authentication</h3>
                <p>Optional 2FA provides an additional layer of security for your account.</p>
              </div>
              
              <div class="feature-card">
                <mat-icon>security</mat-icon>
                <h3>Access Controls</h3>
                <p>Granular permissions and role-based access control to protect sensitive information.</p>
              </div>
              
              <div class="feature-card">
                <mat-icon>monitor</mat-icon>
                <h3>Security Monitoring</h3>
                <p>24/7 monitoring and threat detection to identify and respond to security incidents.</p>
              </div>
              
              <div class="feature-card">
                <mat-icon>backup</mat-icon>
                <h3>Data Backup</h3>
                <p>Regular automated backups with geographic redundancy to ensure data availability.</p>
              </div>
              
              <div class="feature-card">
                <mat-icon>admin_panel_settings</mat-icon>
                <h3>Audit Logs</h3>
                <p>Comprehensive audit trails for all user actions and system events.</p>
              </div>
            </div>
          </div>

          <div class="compliance-section">
            <h2>Compliance & Certifications</h2>
            <div class="compliance-grid">
              <div class="compliance-item">
                <mat-icon>verified</mat-icon>
                <h3>SOC 2 Type II</h3>
                <p>Certified for security, availability, and confidentiality controls</p>
              </div>
              
              <div class="compliance-item">
                <mat-icon>gavel</mat-icon>
                <h3>GDPR Compliant</h3>
                <p>Full compliance with European data protection regulations</p>
              </div>
              
              <div class="compliance-item">
                <mat-icon>shield</mat-icon>
                <h3>ISO 27001</h3>
                <p>Information security management system certification</p>
              </div>
              
              <div class="compliance-item">
                <mat-icon>business</mat-icon>
                <h3>HIPAA Ready</h3>
                <p>Healthcare data protection compliance for covered entities</p>
              </div>
            </div>
          </div>

          <div class="infrastructure-section">
            <h2>Infrastructure Security</h2>
            <div class="infrastructure-content">
              <div class="infrastructure-text">
                <h3>Cloud Security</h3>
                <p>Our infrastructure is hosted on leading cloud providers with enterprise-grade security controls, including:</p>
                <ul>
                  <li>Multi-layered network security</li>
                  <li>DDoS protection and mitigation</li>
                  <li>Regular security assessments</li>
                  <li>Automated security updates</li>
                </ul>
                
                <h3>Data Centers</h3>
                <p>Our data centers feature:</p>
                <ul>
                  <li>24/7 physical security</li>
                  <li>Environmental controls</li>
                  <li>Redundant power and cooling</li>
                  <li>Geographic distribution</li>
                </ul>
              </div>
              
              <div class="infrastructure-visual">
                <div class="security-layers">
                  <div class="layer">
                    <mat-icon>cloud</mat-icon>
                    <span>Cloud Infrastructure</span>
                  </div>
                  <div class="layer">
                    <mat-icon>network_check</mat-icon>
                    <span>Network Security</span>
                  </div>
                  <div class="layer">
                    <mat-icon>storage</mat-icon>
                    <span>Data Encryption</span>
                  </div>
                  <div class="layer">
                    <mat-icon>person</mat-icon>
                    <span>Access Control</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="incident-response">
            <h2>Incident Response</h2>
            <p>We have a comprehensive incident response plan to quickly identify, contain, and remediate security incidents:</p>
            <div class="response-steps">
              <div class="step">
                <div class="step-number">1</div>
                <div class="step-content">
                  <h3>Detection</h3>
                  <p>Automated monitoring and threat detection systems</p>
                </div>
              </div>
              <div class="step">
                <div class="step-number">2</div>
                <div class="step-content">
                  <h3>Assessment</h3>
                  <p>Rapid assessment of the scope and impact</p>
                </div>
              </div>
              <div class="step">
                <div class="step-number">3</div>
                <div class="step-content">
                  <h3>Containment</h3>
                  <p>Immediate containment to prevent further damage</p>
                </div>
              </div>
              <div class="step">
                <div class="step-number">4</div>
                <div class="step-content">
                  <h3>Recovery</h3>
                  <p>Restoration of services and data integrity</p>
                </div>
              </div>
            </div>
          </div>

          <div class="best-practices">
            <h2>Security Best Practices</h2>
            <div class="practices-grid">
              <div class="practice-item">
                <mat-icon>password</mat-icon>
                <h3>Strong Passwords</h3>
                <p>Use complex passwords and enable two-factor authentication</p>
              </div>
              
              <div class="practice-item">
                <mat-icon>update</mat-icon>
                <h3>Regular Updates</h3>
                <p>Keep your software and devices updated with latest security patches</p>
              </div>
              
              <div class="practice-item">
                <mat-icon>visibility_off</mat-icon>
                <h3>Secure Networks</h3>
                <p>Use secure, encrypted networks when accessing CollabX</p>
              </div>
              
              <div class="practice-item">
                <mat-icon>report</mat-icon>
                <h3>Report Issues</h3>
                <p>Report any security concerns to our team immediately</p>
              </div>
            </div>
          </div>

          <div class="contact-security">
            <h2>Security Contact</h2>
            <p>For security-related questions or to report a security issue:</p>
            <div class="contact-info">
              <p><strong>Email:</strong> security&#64;collabx.com</p>
              <p><strong>Security Hotline:</strong> +1 (555) 123-SAFE</p>
              <p><strong>Bug Bounty:</strong> bugbounty&#64;collabx.com</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .security-page {
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

    .security-overview, .security-features, .compliance-section, .infrastructure-section, .incident-response, .best-practices, .contact-security {
      margin-bottom: 80px;
    }

    .security-overview h2, .security-features h2, .compliance-section h2, .infrastructure-section h2, .incident-response h2, .best-practices h2, .contact-security h2 {
      font-size: 36px;
      font-weight: 700;
      margin-bottom: 24px;
      color: #1a1a1a;
    }

    .security-overview p {
      font-size: 18px;
      color: rgba(0, 0, 0, 0.7);
    }

    .features-grid, .compliance-grid, .practices-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 32px;
    }

    .feature-card, .compliance-item, .practice-item {
      background: white;
      padding: 32px 24px;
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      text-align: center;
      transition: transform 0.2s;
    }

    .feature-card:hover, .compliance-item:hover, .practice-item:hover {
      transform: translateY(-4px);
    }

    .feature-card mat-icon, .compliance-item mat-icon, .practice-item mat-icon {
      font-size: 48px;
      color: #4a154b;
      margin-bottom: 16px;
    }

    .feature-card h3, .compliance-item h3, .practice-item h3 {
      font-size: 20px;
      font-weight: 600;
      margin-bottom: 12px;
      color: #1a1a1a;
    }

    .feature-card p, .compliance-item p, .practice-item p {
      color: rgba(0, 0, 0, 0.7);
    }

    .infrastructure-content {
      display: grid;
      grid-template-columns: 2fr 1fr;
      gap: 60px;
      align-items: start;
    }

    .infrastructure-text h3 {
      font-size: 24px;
      font-weight: 600;
      margin: 32px 0 16px 0;
      color: #1a1a1a;
    }

    .infrastructure-text p {
      font-size: 16px;
      color: rgba(0, 0, 0, 0.7);
      margin-bottom: 12px;
    }

    .infrastructure-text ul {
      margin: 16px 0;
      padding-left: 24px;
    }

    .infrastructure-text li {
      color: rgba(0, 0, 0, 0.7);
      margin-bottom: 8px;
    }

    .security-layers {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .layer {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 16px;
      background: #f8f9fa;
      border-radius: 8px;
      border-left: 4px solid #4a154b;
    }

    .layer mat-icon {
      color: #4a154b;
    }

    .response-steps {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 32px;
      margin-top: 40px;
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

    .contact-security {
      text-align: center;
    }

    .contact-security p {
      font-size: 18px;
      color: rgba(0, 0, 0, 0.7);
      margin-bottom: 24px;
    }

    .contact-info {
      background: #f8f9fa;
      padding: 32px;
      border-radius: 8px;
      max-width: 500px;
      margin: 0 auto;
    }

    .contact-info p {
      margin-bottom: 8px;
      font-size: 16px;
    }

    @media (max-width: 768px) {
      .hero-section h1 {
        font-size: 36px;
      }
      
      .hero-subtitle {
        font-size: 18px;
      }
      
      .features-grid, .compliance-grid, .practices-grid {
        grid-template-columns: 1fr;
      }
      
      .infrastructure-content {
        grid-template-columns: 1fr;
        gap: 40px;
      }
      
      .response-steps {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class SecurityComponent {}
