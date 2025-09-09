import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact-sales',
  template: `
    <div class="contact-sales-page">
      <!-- Navigation Bar -->
      <nav class="navbar">
        <div class="nav-container">
          <div class="nav-left">
            <div class="logo" (click)="goHome()">
              <mat-icon class="logo-icon">rocket_launch</mat-icon>
              <span class="logo-text brand">CollabX</span>
            </div>
          </div>
          
          <div class="nav-center">
            <a [routerLink]="['/home']" class="nav-link">Home</a>
            <a [routerLink]="['/solutions']" class="nav-link">Solutions</a>
            <a [routerLink]="['/enterprise']" class="nav-link">Enterprise</a>
            <a [routerLink]="['/resources']" class="nav-link">Resources</a>
            <a [routerLink]="['/pricing']" class="nav-link">Pricing</a>
          </div>
          
          <div class="nav-right">
            <button mat-stroked-button class="nav-button" (click)="navigateToLogin()">
              Sign In
            </button>
            <button mat-raised-button color="primary" class="nav-button cta-btn" (click)="navigateToRegister()">
              Get Started Free
            </button>
          </div>
        </div>
      </nav>

      <!-- Hero Section -->
      <section class="hero">
        <div class="container">
          <div class="hero-content">
            <h1 class="hero-title">Talk to Our Sales Team</h1>
            <p class="hero-subtitle">Get personalized guidance on how CollabX can transform your team's collaboration and productivity</p>
          </div>
        </div>
      </section>

      <!-- Contact Form Section -->
      <section class="contact-form-section">
        <div class="container">
          <div class="form-container">
            <div class="form-header">
              <h2 class="form-title">Schedule a Demo</h2>
              <p class="form-subtitle">Fill out the form below and our sales team will get back to you within 24 hours</p>
            </div>
            
            <form [formGroup]="contactForm" (ngSubmit)="onSubmit()" class="contact-form">
              <div class="form-row">
                <div class="form-group">
                  <label for="firstName">First Name *</label>
                  <input 
                    type="text" 
                    id="firstName" 
                    formControlName="firstName" 
                    placeholder="Enter your first name"
                    [class.error]="contactForm.get('firstName')?.invalid && contactForm.get('firstName')?.touched"
                  >
                  <div class="error-message" *ngIf="contactForm.get('firstName')?.invalid && contactForm.get('firstName')?.touched">
                    First name is required
                  </div>
                </div>
                
                <div class="form-group">
                  <label for="lastName">Last Name *</label>
                  <input 
                    type="text" 
                    id="lastName" 
                    formControlName="lastName" 
                    placeholder="Enter your last name"
                    [class.error]="contactForm.get('lastName')?.invalid && contactForm.get('lastName')?.touched"
                  >
                  <div class="error-message" *ngIf="contactForm.get('lastName')?.invalid && contactForm.get('lastName')?.touched">
                    Last name is required
                  </div>
                </div>
              </div>
              
              <div class="form-row">
                <div class="form-group">
                  <label for="email">Work Email *</label>
                  <input 
                    type="email" 
                    id="email" 
                    formControlName="email" 
                    placeholder="Enter your work email"
                    [class.error]="contactForm.get('email')?.invalid && contactForm.get('email')?.touched"
                  >
                  <div class="error-message" *ngIf="contactForm.get('email')?.invalid && contactForm.get('email')?.touched">
                    <span *ngIf="contactForm.get('email')?.errors?.['required']">Email is required</span>
                    <span *ngIf="contactForm.get('email')?.errors?.['email']">Please enter a valid email</span>
                  </div>
                </div>
                
                <div class="form-group">
                  <label for="phone">Phone Number</label>
                  <input 
                    type="tel" 
                    id="phone" 
                    formControlName="phone" 
                    placeholder="Enter your phone number"
                  >
                </div>
              </div>
              
              <div class="form-row">
                <div class="form-group">
                  <label for="company">Company *</label>
                  <input 
                    type="text" 
                    id="company" 
                    formControlName="company" 
                    placeholder="Enter your company name"
                    [class.error]="contactForm.get('company')?.invalid && contactForm.get('company')?.touched"
                  >
                  <div class="error-message" *ngIf="contactForm.get('company')?.invalid && contactForm.get('company')?.touched">
                    Company name is required
                  </div>
                </div>
                
                <div class="form-group">
                  <label for="jobTitle">Job Title</label>
                  <input 
                    type="text" 
                    id="jobTitle" 
                    formControlName="jobTitle" 
                    placeholder="Enter your job title"
                  >
                </div>
              </div>
              
              <div class="form-group">
                <label for="teamSize">Team Size</label>
                <select id="teamSize" formControlName="teamSize">
                  <option value="">Select team size</option>
                  <option value="1-10">1-10 employees</option>
                  <option value="11-50">11-50 employees</option>
                  <option value="51-200">51-200 employees</option>
                  <option value="201-500">201-500 employees</option>
                  <option value="500+">500+ employees</option>
                </select>
              </div>
              
              <div class="form-group">
                <label for="message">Message</label>
                <textarea 
                  id="message" 
                  formControlName="message" 
                  placeholder="Tell us about your team's collaboration needs and any specific questions you have"
                  rows="4"
                ></textarea>
              </div>
              
              <div class="form-actions">
                <button 
                  type="submit" 
                  mat-raised-button 
                  color="primary" 
                  class="submit-btn"
                  [disabled]="contactForm.invalid || isSubmitting"
                >
                  <mat-icon *ngIf="!isSubmitting">send</mat-icon>
                  <mat-icon *ngIf="isSubmitting" class="spinning">refresh</mat-icon>
                  {{ isSubmitting ? 'Sending...' : 'Send Message' }}
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      <!-- Contact Info Section -->
      <section class="contact-info">
        <div class="container">
          <div class="info-grid">
            <div class="info-card">
              <div class="info-icon">
                <mat-icon>phone</mat-icon>
              </div>
              <h3>Phone</h3>
              <p>+1 (555) 123-4567</p>
              <p>Mon-Fri 9AM-6PM EST</p>
            </div>
            <div class="info-card">
              <div class="info-icon">
                <mat-icon>email</mat-icon>
              </div>
              <h3>Email</h3>
              <p>sales&#64;collabx.com</p>
              <p>We'll respond within 24 hours</p>
            </div>
            <div class="info-card">
              <div class="info-icon">
                <mat-icon>schedule</mat-icon>
              </div>
              <h3>Schedule</h3>
              <p>Book a demo call</p>
              <p>30-minute personalized demo</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  `,
  styles: [`
    .contact-sales-page {
      min-height: 100vh;
      background: #ffffff;
      font-family: 'Inter', 'Roboto', sans-serif;
    }

    .navbar {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      background: rgba(255, 255, 255, 0.95);
      backdrop-filter: blur(20px);
      border-bottom: 1px solid rgba(0, 0, 0, 0.05);
      z-index: 1000;
      padding: 0;
    }

    .nav-container {
      max-width: 1400px;
      margin: 0 auto;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 32px;
      height: 72px;
    }

    .nav-left {
      display: flex;
      align-items: center;
    }

    .logo {
      display: flex;
      align-items: center;
      gap: 12px;
      text-decoration: none;
      color: #1976d2;
      cursor: pointer;
      transition: transform 0.2s ease;
    }

    .logo:hover {
      transform: scale(1.05);
    }

    .logo-icon {
      font-size: 32px;
      width: 32px;
      height: 32px;
      background: linear-gradient(135deg, #4f46e5, #a855f7);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    .logo-text {
      font-size: 24px;
      font-weight: 700;
      background: linear-gradient(135deg, #4f46e5, #a855f7);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    .brand {
      font-size: 28px;
    }

    .nav-center {
      display: flex;
      align-items: center;
      gap: 40px;
    }

    .nav-link {
      text-decoration: none;
      color: #374151;
      font-weight: 500;
      font-size: 15px;
      transition: all 0.2s ease;
      position: relative;
      padding: 8px 0;
    }

    .nav-link:hover {
      color: #4f46e5;
    }

    .nav-right {
      display: flex;
      align-items: center;
      gap: 16px;
    }

    .nav-button {
      padding: 12px 24px;
      min-width: auto;
      font-size: 14px;
      transition: all 0.2s ease;
    }

    .nav-button.cta-btn {
      background: linear-gradient(135deg, #4f46e5, #a855f7);
      color: white;
      border: none;
      box-shadow: 0 4px 15px rgba(79, 70, 229, 0.3);
    }

    .nav-button.cta-btn:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 25px rgba(79, 70, 229, 0.4);
    }

    .hero {
      padding: 120px 0 80px;
      background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
      text-align: center;
    }

    .container {
      max-width: 1400px;
      margin: 0 auto;
      padding: 0 32px;
    }

    .hero-content {
      max-width: 800px;
      margin: 0 auto;
    }

    .hero-title {
      font-size: 3.5rem;
      font-weight: 800;
      color: #1a202c;
      margin: 0 0 1.5rem 0;
      line-height: 1.1;
      letter-spacing: -0.02em;
    }

    .hero-subtitle {
      font-size: 1.25rem;
      color: #64748b;
      margin: 0;
      line-height: 1.6;
      font-weight: 400;
    }

    .contact-form-section {
      padding: 6rem 0;
      background: white;
    }

    .form-container {
      max-width: 800px;
      margin: 0 auto;
    }

    .form-header {
      text-align: center;
      margin-bottom: 3rem;
    }

    .form-title {
      font-size: 2.5rem;
      font-weight: 700;
      color: #1a202c;
      margin: 0 0 1rem 0;
    }

    .form-subtitle {
      font-size: 1.125rem;
      color: #64748b;
      margin: 0;
      line-height: 1.6;
    }

    .contact-form {
      background: #f8fafc;
      border-radius: 16px;
      padding: 3rem;
      border: 1px solid #e2e8f0;
    }

    .form-row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1.5rem;
      margin-bottom: 1.5rem;
    }

    .form-group {
      display: flex;
      flex-direction: column;
    }

    .form-group label {
      font-weight: 600;
      color: #374151;
      margin-bottom: 0.5rem;
      font-size: 0.875rem;
    }

    .form-group input,
    .form-group select,
    .form-group textarea {
      padding: 0.75rem 1rem;
      border: 1px solid #d1d5db;
      border-radius: 8px;
      font-size: 1rem;
      transition: all 0.2s ease;
      background: white;
    }

    .form-group input:focus,
    .form-group select:focus,
    .form-group textarea:focus {
      outline: none;
      border-color: #4f46e5;
      box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1);
    }

    .form-group input.error,
    .form-group select.error,
    .form-group textarea.error {
      border-color: #ef4444;
    }

    .form-group textarea {
      resize: vertical;
      min-height: 100px;
    }

    .error-message {
      color: #ef4444;
      font-size: 0.75rem;
      margin-top: 0.25rem;
    }

    .form-actions {
      text-align: center;
      margin-top: 2rem;
    }

    .submit-btn {
      background: linear-gradient(135deg, #4f46e5, #a855f7);
      color: white;
      border: none;
      padding: 1rem 2rem;
      border-radius: 12px;
      font-weight: 600;
      font-size: 1rem;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      transition: all 0.3s ease;
      box-shadow: 0 4px 15px rgba(79, 70, 229, 0.3);
    }

    .submit-btn:hover:not(:disabled) {
      transform: translateY(-2px);
      box-shadow: 0 8px 25px rgba(79, 70, 229, 0.4);
    }

    .submit-btn:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }

    .spinning {
      animation: spin 1s linear infinite;
    }

    @keyframes spin {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }

    .contact-info {
      padding: 6rem 0;
      background: #f8fafc;
    }

    .info-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 2rem;
    }

    .info-card {
      background: white;
      border-radius: 16px;
      padding: 2rem;
      text-align: center;
      border: 1px solid #e2e8f0;
      transition: all 0.3s ease;
    }

    .info-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
    }

    .info-icon {
      width: 3rem;
      height: 3rem;
      background: linear-gradient(135deg, #4f46e5, #a855f7);
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto 1.5rem auto;
    }

    .info-icon mat-icon {
      font-size: 1.5rem;
      width: 1.5rem;
      height: 1.5rem;
      color: white;
    }

    .info-card h3 {
      font-size: 1.25rem;
      font-weight: 700;
      color: #1a202c;
      margin: 0 0 1rem 0;
    }

    .info-card p {
      font-size: 1rem;
      color: #64748b;
      margin: 0 0 0.5rem 0;
    }

    .info-card p:last-child {
      margin-bottom: 0;
    }

    @media (max-width: 768px) {
      .nav-center {
        display: none;
      }

      .hero-title {
        font-size: 2.5rem;
      }

      .form-row {
        grid-template-columns: 1fr;
      }

      .contact-form {
        padding: 2rem;
      }

      .info-grid {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class ContactSalesComponent {
  contactForm: FormGroup;
  isSubmitting = false;

  constructor(
    private router: Router,
    private fb: FormBuilder
  ) {
    this.contactForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: [''],
      company: ['', Validators.required],
      jobTitle: [''],
      teamSize: [''],
      message: ['']
    });
  }

  goHome() {
    this.router.navigate(['/home']);
  }

  navigateToLogin() {
    this.router.navigate(['/auth/login']);
  }

  navigateToRegister() {
    this.router.navigate(['/auth/register']);
  }

  onSubmit() {
    if (this.contactForm.valid) {
      this.isSubmitting = true;
      
      // Simulate form submission
      setTimeout(() => {
        this.isSubmitting = false;
        alert('Thank you for your interest! Our sales team will contact you within 24 hours.');
        this.contactForm.reset();
      }, 2000);
    } else {
      // Mark all fields as touched to show validation errors
      Object.keys(this.contactForm.controls).forEach(key => {
        this.contactForm.get(key)?.markAsTouched();
      });
    }
  }
}
