import { Component } from '@angular/core';

@Component({
  selector: 'app-terms',
  template: `
    <div class="terms-page">
      <div class="hero-section">
        <div class="container">
          <h1>Terms of Service</h1>
          <p class="hero-subtitle">Last updated: March 15, 2024</p>
        </div>
      </div>

      <div class="content-section">
        <div class="container">
          <div class="terms-content">
            <section class="terms-section">
              <h2>1. Acceptance of Terms</h2>
              <p>By accessing and using CollabX services, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.</p>
            </section>

            <section class="terms-section">
              <h2>2. Description of Service</h2>
              <p>CollabX provides a collaboration platform that enables teams to communicate, share files, and work together effectively. Our service includes messaging, file sharing, workspace management, and integration capabilities.</p>
            </section>

            <section class="terms-section">
              <h2>3. User Accounts</h2>
              <p>To use our services, you must create an account. You are responsible for:</p>
              <ul>
                <li>Providing accurate and complete information</li>
                <li>Maintaining the security of your account</li>
                <li>All activities that occur under your account</li>
                <li>Notifying us of any unauthorized use</li>
              </ul>
            </section>

            <section class="terms-section">
              <h2>4. Acceptable Use</h2>
              <p>You agree to use our services only for lawful purposes and in accordance with these terms. You may not:</p>
              <ul>
                <li>Violate any applicable laws or regulations</li>
                <li>Transmit harmful or malicious content</li>
                <li>Interfere with the proper functioning of our services</li>
                <li>Attempt to gain unauthorized access to our systems</li>
                <li>Use our services for spam or unsolicited communications</li>
              </ul>
            </section>

            <section class="terms-section">
              <h2>5. Content and Intellectual Property</h2>
              <p>You retain ownership of content you create and share through our services. By using our services, you grant us a license to use, store, and process your content as necessary to provide our services.</p>
              
              <h3>Our Intellectual Property</h3>
              <p>CollabX and its original content, features, and functionality are owned by us and are protected by international copyright, trademark, and other intellectual property laws.</p>
            </section>

            <section class="terms-section">
              <h2>6. Privacy and Data Protection</h2>
              <p>Your privacy is important to us. Our collection and use of personal information is governed by our Privacy Policy, which is incorporated into these terms by reference.</p>
            </section>

            <section class="terms-section">
              <h2>7. Service Availability</h2>
              <p>We strive to provide reliable service, but we cannot guarantee uninterrupted access. We may modify, suspend, or discontinue any part of our services at any time with or without notice.</p>
            </section>

            <section class="terms-section">
              <h2>8. Billing and Payments</h2>
              <p>For paid services:</p>
              <ul>
                <li>Fees are billed in advance on a recurring basis</li>
                <li>All fees are non-refundable unless otherwise stated</li>
                <li>We may change our pricing with 30 days notice</li>
                <li>You are responsible for all applicable taxes</li>
              </ul>
            </section>

            <section class="terms-section">
              <h2>9. Termination</h2>
              <p>Either party may terminate this agreement at any time. Upon termination:</p>
              <ul>
                <li>Your right to use our services will cease immediately</li>
                <li>We may delete your account and data</li>
                <li>You remain responsible for any outstanding payments</li>
              </ul>
            </section>

            <section class="terms-section">
              <h2>10. Disclaimers and Limitations</h2>
              <p>Our services are provided "as is" without warranties of any kind. We disclaim all warranties, express or implied, including but not limited to merchantability and fitness for a particular purpose.</p>
              
              <p>In no event shall we be liable for any indirect, incidental, special, or consequential damages arising out of or in connection with your use of our services.</p>
            </section>

            <section class="terms-section">
              <h2>11. Indemnification</h2>
              <p>You agree to indemnify and hold us harmless from any claims, damages, or expenses arising from your use of our services or violation of these terms.</p>
            </section>

            <section class="terms-section">
              <h2>12. Governing Law</h2>
              <p>These terms shall be governed by and construed in accordance with the laws of the State of California, without regard to its conflict of law provisions.</p>
            </section>

            <section class="terms-section">
              <h2>13. Changes to Terms</h2>
              <p>We reserve the right to modify these terms at any time. We will notify users of any material changes by posting the new terms on this page and updating the "Last updated" date.</p>
            </section>

            <section class="terms-section">
              <h2>14. Contact Information</h2>
              <p>If you have any questions about these terms, please contact us:</p>
              <div class="contact-info">
                <p><strong>Email:</strong> legal&#64;collabx.com</p>
                <p><strong>Address:</strong> 123 Innovation Drive, San Francisco, CA 94105</p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .terms-page {
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

    .terms-content {
      background: white;
      padding: 60px;
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }

    .terms-section {
      margin-bottom: 40px;
    }

    .terms-section h2 {
      font-size: 28px;
      font-weight: 700;
      margin-bottom: 16px;
      color: #1a1a1a;
    }

    .terms-section h3 {
      font-size: 20px;
      font-weight: 600;
      margin: 24px 0 12px 0;
      color: #1a1a1a;
    }

    .terms-section p {
      font-size: 16px;
      color: rgba(0, 0, 0, 0.8);
      margin-bottom: 16px;
    }

    .terms-section ul {
      margin: 16px 0;
      padding-left: 24px;
    }

    .terms-section li {
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
      
      .terms-content {
        padding: 32px 24px;
      }
      
      .terms-section h2 {
        font-size: 24px;
      }
    }
  `]
})
export class TermsComponent {}
