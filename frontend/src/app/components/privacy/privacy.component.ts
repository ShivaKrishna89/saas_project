import { Component } from '@angular/core';

@Component({
  selector: 'app-privacy',
  template: `
    <div class="privacy-page">
      <div class="hero-section">
        <div class="container">
          <h1>Privacy Policy</h1>
          <p class="hero-subtitle">Last updated: March 15, 2024</p>
        </div>
      </div>

      <div class="content-section">
        <div class="container">
          <div class="privacy-content">
            <section class="privacy-section">
              <h2>1. Information We Collect</h2>
              <p>We collect information you provide directly to us, such as when you create an account, use our services, or contact us for support.</p>
              
              <h3>Account Information</h3>
              <ul>
                <li>Name and email address</li>
                <li>Profile information and preferences</li>
                <li>Workspace and team information</li>
              </ul>
              
              <h3>Usage Information</h3>
              <ul>
                <li>Messages, files, and content you create</li>
                <li>How you interact with our services</li>
                <li>Device and connection information</li>
              </ul>
            </section>

            <section class="privacy-section">
              <h2>2. How We Use Your Information</h2>
              <p>We use the information we collect to provide, maintain, and improve our services:</p>
              <ul>
                <li>Provide and deliver our services</li>
                <li>Process transactions and send related information</li>
                <li>Send technical notices and support messages</li>
                <li>Respond to your comments and questions</li>
                <li>Improve our services and develop new features</li>
              </ul>
            </section>

            <section class="privacy-section">
              <h2>3. Information Sharing</h2>
              <p>We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except in the following circumstances:</p>
              <ul>
                <li>With your explicit consent</li>
                <li>To comply with legal obligations</li>
                <li>To protect our rights and prevent fraud</li>
                <li>With service providers who assist us in operating our services</li>
              </ul>
            </section>

            <section class="privacy-section">
              <h2>4. Data Security</h2>
              <p>We implement appropriate security measures to protect your personal information:</p>
              <ul>
                <li>Encryption of data in transit and at rest</li>
                <li>Regular security audits and assessments</li>
                <li>Access controls and authentication</li>
                <li>Employee training on data protection</li>
              </ul>
            </section>

            <section class="privacy-section">
              <h2>5. Your Rights</h2>
              <p>You have certain rights regarding your personal information:</p>
              <ul>
                <li>Access and update your information</li>
                <li>Delete your account and data</li>
                <li>Export your data</li>
                <li>Opt out of certain communications</li>
                <li>Object to processing of your data</li>
              </ul>
            </section>

            <section class="privacy-section">
              <h2>6. Data Retention</h2>
              <p>We retain your information for as long as your account is active or as needed to provide you services. We may retain certain information for legitimate business purposes or legal requirements.</p>
            </section>

            <section class="privacy-section">
              <h2>7. International Transfers</h2>
              <p>Your information may be transferred to and processed in countries other than your own. We ensure appropriate safeguards are in place to protect your information in accordance with this privacy policy.</p>
            </section>

            <section class="privacy-section">
              <h2>8. Children's Privacy</h2>
              <p>Our services are not intended for children under 13. We do not knowingly collect personal information from children under 13. If we become aware that we have collected such information, we will take steps to delete it.</p>
            </section>

            <section class="privacy-section">
              <h2>9. Changes to This Policy</h2>
              <p>We may update this privacy policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the "Last updated" date.</p>
            </section>

            <section class="privacy-section">
              <h2>10. Contact Us</h2>
              <p>If you have any questions about this privacy policy, please contact us:</p>
              <div class="contact-info">
                <p><strong>Email:</strong> privacy&#64;collabx.com</p>
                <p><strong>Address:</strong> 123 Innovation Drive, San Francisco, CA 94105</p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .privacy-page {
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
      font-size: 18px;
      opacity: 0.9;
    }

    .container {
      max-width: 800px;
      margin: 0 auto;
      padding: 0 24px;
    }

    .content-section {
      padding: 80px 0;
    }

    .privacy-content {
      background: white;
      padding: 60px;
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }

    .privacy-section {
      margin-bottom: 40px;
    }

    .privacy-section h2 {
      font-size: 28px;
      font-weight: 700;
      margin-bottom: 16px;
      color: #1a1a1a;
    }

    .privacy-section h3 {
      font-size: 20px;
      font-weight: 600;
      margin: 24px 0 12px 0;
      color: #1a1a1a;
    }

    .privacy-section p {
      font-size: 16px;
      color: rgba(0, 0, 0, 0.8);
      margin-bottom: 16px;
    }

    .privacy-section ul {
      margin: 16px 0;
      padding-left: 24px;
    }

    .privacy-section li {
      font-size: 16px;
      color: rgba(0, 0, 0, 0.8);
      margin-bottom: 8px;
    }

    .contact-info {
      background: #f8f9fa;
      padding: 24px;
      border-radius: 8px;
      margin-top: 16px;
    }

    .contact-info p {
      margin-bottom: 8px;
    }

    @media (max-width: 768px) {
      .hero-section h1 {
        font-size: 36px;
      }
      
      .privacy-content {
        padding: 32px 24px;
      }
      
      .privacy-section h2 {
        font-size: 24px;
      }
    }
  `]
})
export class PrivacyComponent {}
