import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  template: `
    <div class="register-page">
      <div class="header">
        <div class="brand" (click)="goHome()">
          <mat-icon class="brand-mark">auto_awesome</mat-icon>
          <span class="brand-text">CollabX</span>
        </div>
      </div>

      <div class="card">
        <div class="form-head">
          <h1>Create your account</h1>
          <p>Use your work email to get started. No credit card required.</p>
        </div>

        <form [formGroup]="registerForm" (ngSubmit)="onSubmit()" class="form">
          <div class="row-2">
            <mat-form-field appearance="outline" class="field">
              <mat-label>First name</mat-label>
              <input matInput formControlName="firstName" required>
              <mat-error *ngIf="registerForm.get('firstName')?.hasError('required')">Required</mat-error>
            </mat-form-field>

            <mat-form-field appearance="outline" class="field">
              <mat-label>Last name</mat-label>
              <input matInput formControlName="lastName" required>
              <mat-error *ngIf="registerForm.get('lastName')?.hasError('required')">Required</mat-error>
            </mat-form-field>
          </div>

          <mat-form-field appearance="outline" class="field">
            <mat-label>Username</mat-label>
            <input matInput formControlName="username" required>
            <mat-icon matSuffix>person</mat-icon>
            <mat-error *ngIf="registerForm.get('username')?.hasError('required')">Required</mat-error>
          </mat-form-field>

          <mat-form-field appearance="outline" class="field">
            <mat-label>Work email</mat-label>
            <input matInput type="email" formControlName="email" required>
            <mat-icon matSuffix>email</mat-icon>
            <mat-error *ngIf="registerForm.get('email')?.hasError('required')">Required</mat-error>
            <mat-error *ngIf="registerForm.get('email')?.hasError('email')">Enter a valid email</mat-error>
          </mat-form-field>

          <div class="row-2">
            <mat-form-field appearance="outline" class="field">
              <mat-label>Password</mat-label>
              <input matInput [type]="hidePassword ? 'password' : 'text'" formControlName="password" required>
              <mat-icon matSuffix (click)="hidePassword = !hidePassword" class="toggle">{{ hidePassword ? 'visibility' : 'visibility_off' }}</mat-icon>
              <mat-error *ngIf="registerForm.get('password')?.hasError('required')">Required</mat-error>
              <mat-error *ngIf="registerForm.get('password')?.hasError('minlength')">Min 6 characters</mat-error>
            </mat-form-field>

            <mat-form-field appearance="outline" class="field">
              <mat-label>Confirm password</mat-label>
              <input matInput [type]="hideConfirmPassword ? 'password' : 'text'" formControlName="confirmPassword" required>
              <mat-icon matSuffix (click)="hideConfirmPassword = !hideConfirmPassword" class="toggle">{{ hideConfirmPassword ? 'visibility' : 'visibility_off' }}</mat-icon>
              <mat-error *ngIf="registerForm.get('confirmPassword')?.hasError('required')">Required</mat-error>
              <mat-error *ngIf="registerForm.get('confirmPassword')?.hasError('passwordMismatch')">Passwords do not match</mat-error>
            </mat-form-field>
          </div>

          <mat-checkbox formControlName="agreeToTerms" class="terms">I agree to the <a href="#">Terms</a> and <a href="#">Privacy</a></mat-checkbox>

          <button mat-raised-button color="primary" class="primary" type="submit" [disabled]="registerForm.invalid || isLoading">
            <mat-spinner *ngIf="isLoading" diameter="20" class="spinner"></mat-spinner>
            <span *ngIf="!isLoading">Create account</span>
          </button>
        </form>

        <div class="foot">
          <span>Already have an account?</span>
          <a routerLink="/auth/login">Sign in</a>
        </div>

        <div *ngIf="errorMessage" class="alert error"><mat-icon>error</mat-icon>{{ errorMessage }}</div>
        <div *ngIf="successMessage" class="alert success"><mat-icon>check_circle</mat-icon>{{ successMessage }}</div>
      </div>
    </div>
  `,
  styles: [`
    .register-page { min-height: 100vh; display:flex; flex-direction:column; background:#fff; }
    .header { padding: 20px 24px; border-bottom: 1px solid #eee; }
    .brand { display:flex; align-items:center; gap:8px; cursor:pointer; }
    .brand-mark { color:#4a154b; }
    .brand-text { font-weight:700; font-size:20px; color:#1a1a1a; }

    .card { max-width: 560px; width:100%; margin: 24px auto; border:1px solid #eee; border-radius:12px; background:#fff; box-shadow: 0 8px 24px rgba(0,0,0,.06); padding: 24px; }
    .form-head { text-align:center; margin-bottom: 16px; }
    .form-head h1 { margin:0 0 6px 0; font-size:26px; }
    .form-head p { margin:0; color: rgba(0,0,0,.65); }

    .form { display:flex; flex-direction:column; gap:16px; }
    .row-2 { display:grid; grid-template-columns: 1fr 1fr; gap: 12px; }
    .field { width:100%; }

    .terms { color: rgba(0,0,0,.7); }
    .primary { height: 44px; font-weight:600; }
    .toggle { cursor:pointer; color: rgba(0,0,0,.54); }

    .foot { text-align:center; margin-top: 8px; color: rgba(0,0,0,.7); }
    .foot a { margin-left:6px; color:#4a154b; font-weight:600; text-decoration:none; }

    .alert { display:flex; align-items:center; gap:8px; border-radius:8px; padding:10px 12px; margin-top:10px; font-size:14px; }
    .alert.error { background:#ffebee; color:#c62828; border:1px solid #ffcdd2; }
    .alert.success { background:#e8f5e9; color:#2e7d32; border:1px solid #c8e6c9; }

    @media (max-width: 768px) { .row-2 { grid-template-columns:1fr; } .card { margin: 12px; } }
  `]
})
export class RegisterComponent {
  registerForm: FormGroup;
  hidePassword = true;
  hideConfirmPassword = true;
  isLoading = false;
  errorMessage = '';
  successMessage = '';

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      agreeToTerms: [false, Validators.requiredTrue]
    }, { validators: this.passwordMatchValidator });
  }

  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password');
    const confirmPassword = form.get('confirmPassword');
    if (password && confirmPassword && password.value !== confirmPassword.value) {
      confirmPassword.setErrors({ passwordMismatch: true });
      return { passwordMismatch: true };
    }
    if (confirmPassword && confirmPassword.hasError('passwordMismatch')) {
      confirmPassword.setErrors(null);
    }
    return null;
  }

  onSubmit() {
    if (this.registerForm.valid) {
      this.isLoading = true;
      this.errorMessage = '';
      this.successMessage = '';
      const { firstName, lastName, username, email, password } = this.registerForm.value;
      const userData = { full_name: `${firstName} ${lastName}`, username, email, password };
      this.authService.register(userData).subscribe({
        next: () => {
          this.isLoading = false;
          this.successMessage = 'Account created successfully! Please sign in.';
          setTimeout(() => this.router.navigate(['/auth/login']), 1200);
        },
        error: (error) => {
          this.isLoading = false;
          this.errorMessage = error.error?.message || 'Registration failed. Please try again.';
        }
      });
    }
  }

  goHome() { this.router.navigate(['/']); }
}
