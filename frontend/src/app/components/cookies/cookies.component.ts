import { Component } from '@angular/core';

@Component({
  selector: 'app-cookies',
  template: `
    <div class="cookies-page">
      <div class="hero-section">
        <div class="container">
          <h1>Cookie Policy</h1>
          <p class="hero-subtitle">Last updated: March 15, 2024</p>
        </div>
      </div>

      <div class="content-section">
        <div class="container">
          <div class="cookies-content">
            <section class="cookies-section">
              <h2>What Are Cookies?</h2>
              <p>Cookies are small text files that are stored on your device when you visit our website. They help us provide you with a better experience by remembering your preferences and enabling certain functionality.</p>
            </section>

            <section class="cookies-section">
              <h2>How We Use Cookies</h2>
              <p>We use cookies for several purposes:</p>
              <ul>
                <li>To remember your login status and preferences</li>
                <li>To analyze how you use our website</li>
                <li>To improve our services and user experience</li>
                <li>To provide personalized content and features</li>
                <li>To ensure security and prevent fraud</li>
              </ul>
            </section>

            <section class="cookies-section">
              <h2>Types of Cookies We Use</h2>
              
              <div class="cookie-types">
                <div class="cookie-type">
                  <h3>Essential Cookies</h3>
                  <p>These cookies are necessary for the website to function properly. They enable basic functions like page navigation, access to secure areas, and remembering your login status.</p>
                  <div class="cookie-details">
                    <p><strong>Examples:</strong> Authentication tokens, session management</p>
                    <p><strong>Duration:</strong> Session or up to 30 days</p>
                  </div>
                </div>
                
                <div class="cookie-type">
                  <h3>Analytics Cookies</h3>
                  <p>These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously.</p>
                  <div class="cookie-details">
                    <p><strong>Examples:</strong> Google Analytics, usage statistics</p>
                    <p><strong>Duration:</strong> Up to 2 years</p>
                  </div>
                </div>
                
                <div class="cookie-type">
                  <h3>Functional Cookies</h3>
                  <p>These cookies enable enhanced functionality and personalization, such as remembering your preferences and settings.</p>
                  <div class="cookie-details">
                    <p><strong>Examples:</strong> Language preferences, theme settings</p>
                    <p><strong>Duration:</strong> Up to 1 year</p>
                  </div>
                </div>
                
                <div class="cookie-type">
                  <h3>Marketing Cookies</h3>
                  <p>These cookies are used to track visitors across websites to display relevant and engaging advertisements.</p>
                  <div class="cookie-details">
                    <p><strong>Examples:</strong> Advertising networks, retargeting</p>
                    <p><strong>Duration:</strong> Up to 1 year</p>
                  </div>
                </div>
              </div>
            </section>

            <section class="cookies-section">
              <h2>Third-Party Cookies</h2>
              <p>We may also use third-party services that set their own cookies:</p>
              <ul>
                <li><strong>Google Analytics:</strong> To analyze website usage and performance</li>
                <li><strong>Google Maps:</strong> To display interactive maps</li>
                <li><strong>Social Media:</strong> For social sharing and login functionality</li>
                <li><strong>Customer Support:</strong> To provide chat and support services</li>
              </ul>
            </section>

            <section class="cookies-section">
              <h2>Managing Your Cookie Preferences</h2>
              <p>You can control and manage cookies in several ways:</p>
              
              <div class="cookie-controls">
                <div class="control-method">
                  <h3>Browser Settings</h3>
                  <p>Most web browsers allow you to control cookies through their settings. You can:</p>
                  <ul>
                    <li>Block all cookies</li>
                    <li>Block third-party cookies</li>
                    <li>Delete existing cookies</li>
                    <li>Set preferences for specific websites</li>
                  </ul>
                </div>
                
              </div>
            </section>

            <section class="cookies-section">
              <h2>Impact of Disabling Cookies</h2>
              <p>If you choose to disable cookies, some features of our website may not function properly:</p>
              <ul>
                <li>You may need to log in repeatedly</li>
                <li>Your preferences may not be saved</li>
                <li>Some personalized features may not work</li>
                <li>We may not be able to provide optimal user experience</li>
              </ul>
            </section>

            <section class="cookies-section">
              <h2>Updates to This Policy</h2>
              <p>We may update this Cookie Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. We will notify you of any material changes by posting the updated policy on this page.</p>
            </section>

            <section class="cookies-section">
              <h2>Contact Us</h2>
              <p>If you have any questions about our use of cookies, please contact us:</p>
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
    .cookies-page {
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

    .cookies-content {
      background: white;
      padding: 60px;
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }

    .cookies-section {
      margin-bottom: 40px;
    }

    .cookies-section h2 {
      font-size: 28px;
      font-weight: 700;
      margin-bottom: 16px;
      color: #1a1a1a;
    }

    .cookies-section h3 {
      font-size: 20px;
      font-weight: 600;
      margin: 24px 0 12px 0;
      color: #1a1a1a;
    }

    .cookies-section p {
      font-size: 16px;
      color: rgba(0, 0, 0, 0.8);
      margin-bottom: 16px;
    }

    .cookies-section ul {
      margin: 16px 0;
      padding-left: 24px;
    }

    .cookies-section li {
      font-size: 16px;
      color: rgba(0, 0, 0, 0.8);
      margin-bottom: 8px;
    }

    .cookie-types {
      display: grid;
      gap: 24px;
      margin-top: 24px;
    }

    .cookie-type {
      background: #f8f9fa;
      padding: 24px;
      border-radius: 8px;
      border-left: 4px solid #4a154b;
    }

    .cookie-type h3 {
      color: #4a154b;
      margin-bottom: 12px;
    }

    .cookie-details {
      margin-top: 16px;
      padding-top: 16px;
      border-top: 1px solid #e0e0e0;
    }

    .cookie-details p {
      margin-bottom: 8px;
      font-size: 14px;
    }

    .cookie-controls {
      display: grid;
      grid-template-columns: 1fr;
      gap: 40px;
      margin-top: 24px;
    }

    .control-method {
      background: #f8f9fa;
      padding: 24px;
      border-radius: 8px;
    }

    .control-method h3 {
      color: #4a154b;
      margin-bottom: 12px;
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
      
      .cookies-content {
        padding: 32px 24px;
      }
      
      .cookies-section h2 {
        font-size: 24px;
      }
      
      .cookie-controls {
        grid-template-columns: 1fr;
        gap: 24px;
      }
    }
  `]
})
export class CookiesComponent {}
