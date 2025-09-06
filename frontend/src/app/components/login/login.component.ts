import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  template: `
    <div class="login-page">
      <div class="header">
        <div class="brand" (click)="goHome()">
          <mat-icon class="brand-mark">auto_awesome</mat-icon>
          <span class="brand-text">CollabX</span>
        </div>
      </div>

      <div class="card">
        <div class="form-head">
          <h1>Sign in to CollabX</h1>
          <p>Welcome back! Access your workspaces.</p>
        </div>

        <form [formGroup]="loginForm" (ngSubmit)="onSubmit()" class="form">
          <mat-form-field appearance="outline" class="field">
            <mat-label>Email</mat-label>
            <input matInput type="email" formControlName="email" required>
            <mat-icon matSuffix>email</mat-icon>
            <mat-error *ngIf="loginForm.get('email')?.hasError('required')">Required</mat-error>
            <mat-error *ngIf="loginForm.get('email')?.hasError('email')">Enter a valid email</mat-error>
          </mat-form-field>

          <mat-form-field appearance="outline" class="field">
            <mat-label>Password</mat-label>
            <input matInput [type]="hidePassword ? 'password' : 'text'" formControlName="password" required>
            <mat-icon matSuffix class="toggle" (click)="hidePassword = !hidePassword">{{ hidePassword ? 'visibility' : 'visibility_off' }}</mat-icon>
            <mat-error *ngIf="loginForm.get('password')?.hasError('required')">Required</mat-error>
          </mat-form-field>

          <div class="row-between">
            <mat-checkbox formControlName="rememberMe">Remember me</mat-checkbox>
            <a class="link" href="#">Forgot password?</a>
          </div>

          <button mat-raised-button color="primary" class="primary" type="submit" [disabled]="loginForm.invalid || isLoading">
            <mat-spinner *ngIf="isLoading" diameter="20" class="spinner"></mat-spinner>
            <span *ngIf="!isLoading">Sign in</span>
          </button>
        </form>

        <div class="foot">
          <span>New to CollabX?</span>
          <a routerLink="/auth/register">Create an account</a>
        </div>

        <div *ngIf="errorMessage" class="alert error"><mat-icon>error</mat-icon>{{ errorMessage }}</div>
        <div *ngIf="successMessage" class="alert success"><mat-icon>check_circle</mat-icon>{{ successMessage }}</div>
      </div>
    </div>
  `,
  styles: [`
    .login-page { min-height: 100vh; display:flex; flex-direction:column; background:#fff; }
    .header { padding:20px 24px; border-bottom:1px solid #eee; }
    .brand { display:flex; align-items:center; gap:8px; cursor:pointer; }
    .brand-mark { color:#4a154b; }
    .brand-text { font-weight:700; font-size:20px; color:#1a1a1a; }

    .card { max-width: 480px; width:100%; margin: 24px auto; border:1px solid #eee; border-radius:12px; background:#fff; box-shadow: 0 8px 24px rgba(0,0,0,.06); padding: 24px; }
    .form-head { text-align:center; margin-bottom: 12px; }
    .form-head h1 { margin:0 0 6px 0; font-size:24px; }
    .form-head p { margin:0; color: rgba(0,0,0,.65); }

    .form { display:flex; flex-direction:column; gap:16px; }
    .field { width:100%; }
    .row-between { display:flex; align-items:center; justify-content:space-between; }

    .primary { height:44px; font-weight:600; }
    .toggle { cursor:pointer; color: rgba(0,0,0,.54); }
    .link { color:#4a154b; text-decoration:none; font-weight:600; }

    .foot { text-align:center; margin-top: 8px; color: rgba(0,0,0,.7); }
    .foot a { margin-left:6px; color:#4a154b; font-weight:600; text-decoration:none; }

    .alert { display:flex; align-items:center; gap:8px; border-radius:8px; padding:10px 12px; margin-top:10px; font-size:14px; }
    .alert.error { background:#ffebee; color:#c62828; border:1px solid #ffcdd2; }
    .alert.success { background:#e8f5e9; color:#2e7d32; border:1px solid #c8e6c9; }

    @media (max-width: 768px) { .card { margin: 12px; } }
  `]
})
export class LoginComponent {
  loginForm: FormGroup;
  hidePassword = true;
  isLoading = false;
  errorMessage = '';
  successMessage = '';

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      rememberMe: [false]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.isLoading = true;
      this.errorMessage = '';
      this.successMessage = '';

      const { email, password, rememberMe } = this.loginForm.value;

      this.authService.login({ email, password }).subscribe({
        next: () => {
          this.isLoading = false;
          this.successMessage = 'Login successful!';
          if (rememberMe) localStorage.setItem('rememberMe', 'true');
          setTimeout(() => this.router.navigate(['/workspace-selector']), 800);
        },
        error: (error) => {
          this.isLoading = false;
          this.errorMessage = error.error?.detail || error.error?.message || 'Login failed. Please try again.';
        }
      });
    }
  }

  goHome() { this.router.navigate(['/']); }
}
