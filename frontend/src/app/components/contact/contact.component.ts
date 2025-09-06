import { Component } from '@angular/core';

@Component({
  selector: 'app-contact',
  template: `
    <div class="contact-page">
      <div class="hero-section">
        <div class="container">
          <h1>Get in Touch</h1>
          <p class="hero-subtitle">We'd love to hear from you. Send us a message and we'll respond as soon as possible.</p>
        </div>
      </div>

      <div class="content-section">
        <div class="container">
          <div class="contact-grid">
            <div class="contact-form-section">
              <h2>Send us a Message</h2>
              <form class="contact-form">
                <div class="form-row">
                  <mat-form-field appearance="outline" class="form-field">
                    <mat-label>First Name</mat-label>
                    <input matInput type="text" required>
                  </mat-form-field>
                  <mat-form-field appearance="outline" class="form-field">
                    <mat-label>Last Name</mat-label>
                    <input matInput type="text" required>
                  </mat-form-field>
                </div>
                
                <mat-form-field appearance="outline" class="form-field full-width">
                  <mat-label>Email</mat-label>
                  <input matInput type="email" required>
                </mat-form-field>
                
                <mat-form-field appearance="outline" class="form-field full-width">
                  <mat-label>Company</mat-label>
                  <input matInput type="text">
                </mat-form-field>
                
                <mat-form-field appearance="outline" class="form-field full-width">
                  <mat-label>Subject</mat-label>
                  <mat-select required>
                    <mat-option value="general">General Inquiry</mat-option>
                    <mat-option value="sales">Sales</mat-option>
                    <mat-option value="support">Technical Support</mat-option>
                    <mat-option value="partnership">Partnership</mat-option>
                    <mat-option value="media">Media & Press</mat-option>
                  </mat-select>
                </mat-form-field>
                
                <mat-form-field appearance="outline" class="form-field full-width">
                  <mat-label>Message</mat-label>
                  <textarea matInput rows="6" required></textarea>
                </mat-form-field>
                
                <button mat-raised-button color="primary" type="submit" class="submit-btn">
                  Send Message
                </button>
              </form>
            </div>

            <div class="contact-info-section">
              <h2>Contact Information</h2>
              
              <div class="contact-methods">
                <div class="contact-method">
                  <mat-icon>email</mat-icon>
                  <div class="method-content">
                    <h3>Email</h3>
                    <p>hello&#64;collabx.com</p>
                    <p>support&#64;collabx.com</p>
                  </div>
                </div>
                
                <div class="contact-method">
                  <mat-icon>phone</mat-icon>
                  <div class="method-content">
                    <h3>Phone</h3>
                    <p>+1 (555) 123-4567</p>
                    <p>Mon-Fri 9AM-6PM PST</p>
                  </div>
                </div>
                
                <div class="contact-method">
                  <mat-icon>location_on</mat-icon>
                  <div class="method-content">
                    <h3>Office</h3>
                    <p>123 Innovation Drive</p>
                    <p>San Francisco, CA 94105</p>
                  </div>
                </div>
                
                <div class="contact-method">
                  <mat-icon>schedule</mat-icon>
                  <div class="method-content">
                    <h3>Business Hours</h3>
                    <p>Monday - Friday: 9:00 AM - 6:00 PM PST</p>
                    <p>Saturday - Sunday: Closed</p>
                  </div>
                </div>
              </div>

              <div class="social-links">
                <h3>Follow Us</h3>
                <div class="social-icons">
                  <a href="#" class="social-link">
                    <mat-icon>facebook</mat-icon>
                  </a>
                  <a href="#" class="social-link">
                    <mat-icon>twitter</mat-icon>
                  </a>
                  <a href="#" class="social-link">
                    <mat-icon>linkedin</mat-icon>
                  </a>
                  <a href="#" class="social-link">
                    <mat-icon>youtube</mat-icon>
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div class="faq-section">
            <h2>Frequently Asked Questions</h2>
            <div class="faq-list">
              <mat-expansion-panel>
                <mat-expansion-panel-header>
                  <mat-panel-title>How do I get started with CollabX?</mat-panel-title>
                </mat-expansion-panel-header>
                <p>Getting started is easy! Simply sign up for a free account, create your workspace, and invite your team members. You can start collaborating immediately.</p>
              </mat-expansion-panel>
              
              <mat-expansion-panel>
                <mat-expansion-panel-header>
                  <mat-panel-title>Is there a free trial available?</mat-panel-title>
                </mat-expansion-panel-header>
                <p>Yes! We offer a free plan that includes basic features for small teams. You can upgrade to our paid plans anytime for additional features and storage.</p>
              </mat-expansion-panel>
              
              <mat-expansion-panel>
                <mat-expansion-panel-header>
                  <mat-panel-title>How secure is my data?</mat-panel-title>
                </mat-expansion-panel-header>
                <p>Security is our top priority. We use enterprise-grade encryption, regular security audits, and comply with industry standards like SOC 2 and GDPR.</p>
              </mat-expansion-panel>
              
              <mat-expansion-panel>
                <mat-expansion-panel-header>
                  <mat-panel-title>Can I integrate with other tools?</mat-panel-title>
                </mat-expansion-panel-header>
                <p>Absolutely! We offer integrations with popular tools like Google Workspace, Microsoft 365, Slack, and many others through our API and webhooks.</p>
              </mat-expansion-panel>
              
              <mat-expansion-panel>
                <mat-expansion-panel-header>
                  <mat-panel-title>What kind of support do you offer?</mat-panel-title>
                </mat-expansion-panel-header>
                <p>We provide 24/7 email support for all users, plus priority support and dedicated account managers for enterprise customers.</p>
              </mat-expansion-panel>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .contact-page {
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

    .contact-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 80px;
      margin-bottom: 80px;
    }

    .contact-form-section h2, .contact-info-section h2 {
      font-size: 32px;
      font-weight: 700;
      margin-bottom: 32px;
      color: #1a1a1a;
    }

    .contact-form {
      display: flex;
      flex-direction: column;
      gap: 24px;
    }

    .form-row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 16px;
    }

    .form-field {
      width: 100%;
    }

    .full-width {
      grid-column: 1 / -1;
    }

    .submit-btn {
      font-size: 16px;
      font-weight: 600;
      padding: 12px 32px;
      align-self: flex-start;
    }

    .contact-methods {
      display: flex;
      flex-direction: column;
      gap: 32px;
      margin-bottom: 40px;
    }

    .contact-method {
      display: flex;
      align-items: flex-start;
      gap: 16px;
    }

    .contact-method mat-icon {
      font-size: 32px;
      color: #4a154b;
      margin-top: 4px;
    }

    .method-content h3 {
      font-size: 18px;
      font-weight: 600;
      margin-bottom: 8px;
      color: #1a1a1a;
    }

    .method-content p {
      color: rgba(0, 0, 0, 0.7);
      margin-bottom: 4px;
    }

    .social-links h3 {
      font-size: 20px;
      font-weight: 600;
      margin-bottom: 16px;
      color: #1a1a1a;
    }

    .social-icons {
      display: flex;
      gap: 16px;
    }

    .social-link {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 48px;
      height: 48px;
      background: #f0f0f0;
      border-radius: 50%;
      color: #4a154b;
      text-decoration: none;
      transition: all 0.2s;
    }

    .social-link:hover {
      background: #4a154b;
      color: white;
      transform: translateY(-2px);
    }

    .faq-section h2 {
      font-size: 36px;
      font-weight: 700;
      margin-bottom: 40px;
      color: #1a1a1a;
      text-align: center;
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

    @media (max-width: 768px) {
      .hero-section h1 {
        font-size: 36px;
      }
      
      .hero-subtitle {
        font-size: 18px;
      }
      
      .contact-grid {
        grid-template-columns: 1fr;
        gap: 40px;
      }
      
      .form-row {
        grid-template-columns: 1fr;
      }
      
      .social-icons {
        justify-content: center;
      }
    }
  `]
})
export class ContactComponent {}
