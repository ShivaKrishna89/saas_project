import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';

import { User, UserLogin, UserCreate, AuthResponse } from '../models/user.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();
  
  private tokenKey = 'slack_token';
  private userKey = 'slack_user';

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    this.loadStoredUser();
  }

  public get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }

  public get token(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  login(credentials: UserLogin): Observable<AuthResponse> {
    const formData = new FormData();
    formData.append('username', credentials.email);
    formData.append('password', credentials.password);

    return this.http.post<AuthResponse>(`${environment.apiUrl}/auth/login`, formData, {
      headers: { 'X-Event-Type': 'SIGNIN' }
    })
      .pipe(
        tap(response => {
          this.storeAuthData(response);
          this.currentUserSubject.next(response.user);
        }),
        catchError(error => {
          console.error('Login error:', error);
          return throwError(() => error);
        })
      );
  }

  register(userData: UserCreate): Observable<User> {
    return this.http.post<User>(`${environment.apiUrl}/auth/register`, userData)
      .pipe(
        catchError(error => {
          console.error('Registration error:', error);
          return throwError(() => error);
        })
      );
  }

  logout(): void {
    // Send logout event to backend before clearing local storage
    this.http.post(`${environment.apiUrl}/auth/logout`, {}, {
      headers: { 'X-Event-Type': 'SIGNOUT' }
    }).subscribe({
      next: () => {
        console.log('Logout event logged');
      },
      error: (error) => {
        console.error('Failed to log logout event:', error);
      }
    });

    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.userKey);
    this.currentUserSubject.next(null);
    this.router.navigate(['/home']);
  }

  refreshToken(): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${environment.apiUrl}/auth/refresh`, {})
      .pipe(
        tap(response => {
          this.storeAuthData(response);
          this.currentUserSubject.next(response.user);
        }),
        catchError(error => {
          this.logout();
          return throwError(() => error);
        })
      );
  }

  isAuthenticated(): boolean {
    const token = this.token;
    if (!token) return false;

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const expiry = payload.exp * 1000; // Convert to milliseconds
      return Date.now() < expiry;
    } catch (error) {
      return false;
    }
  }

  updateProfile(userData: Partial<User>): Observable<User> {
    return this.http.put<User>(`${environment.apiUrl}/users/me`, userData)
      .pipe(
        tap(user => {
          this.currentUserSubject.next(user);
          localStorage.setItem(this.userKey, JSON.stringify(user));
        }),
        catchError(error => {
          console.error('Profile update error:', error);
          return throwError(() => error);
        })
      );
  }

  private storeAuthData(response: AuthResponse): void {
    localStorage.setItem(this.tokenKey, response.access_token);
    localStorage.setItem(this.userKey, JSON.stringify(response.user));
  }

  private loadStoredUser(): void {
    const userStr = localStorage.getItem(this.userKey);
    if (userStr && this.isAuthenticated()) {
      try {
        const user = JSON.parse(userStr);
        this.currentUserSubject.next(user);
      } catch (error) {
        console.error('Error parsing stored user:', error);
        this.logout();
      }
    }
  }

  // Auto-refresh token before expiry
  startTokenRefresh(): void {
    const token = this.token;
    if (!token) return;

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const expiry = payload.exp * 1000;
      const now = Date.now();
      const timeUntilExpiry = expiry - now;
      
      // Refresh token 5 minutes before expiry
      const refreshTime = Math.max(timeUntilExpiry - (5 * 60 * 1000), 0);
      
      setTimeout(() => {
        this.refreshToken().subscribe();
      }, refreshTime);
    } catch (error) {
      console.error('Error parsing token for refresh:', error);
    }
  }
}
