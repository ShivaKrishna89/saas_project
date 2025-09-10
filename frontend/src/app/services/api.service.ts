import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient, private authService: AuthService) {}

  private getHeaders(eventType?: string): HttpHeaders {
    const token = this.authService.token;
    const headers: Record<string, string> = {
      'Content-Type': 'application/json'
    };
    if (eventType) {
      headers['X-Event-Type'] = eventType;
    }
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    return new HttpHeaders(headers);
  }

  // Projects API calls
  getProjectsForCurrentUser(): Observable<any> {
    return this.http.get(`${this.baseUrl}/projects/mine`, {
      headers: this.getHeaders('PROJECTS_CLICKED')
    });
  }

  getProject(projectId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/projects/${projectId}`, {
      headers: this.getHeaders('PROJECT_VIEWED')
    });
  }

  createProject(projectData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/projects/`, projectData, {
      headers: this.getHeaders('PROJECT_CREATED')
    });
  }

  deleteProject(projectId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/projects/${projectId}`, {
      headers: this.getHeaders('PROJECT_DELETED')
    });
  }

  // Issues/Tasks API calls
  getIssues(projectId?: number): Observable<any> {
    const url = projectId 
      ? `${this.baseUrl}/issues?project_id=${projectId}`
      : `${this.baseUrl}/issues`;
    return this.http.get(url, {
      headers: this.getHeaders('TASKS_CLICKED')
    });
  }

  getIssue(issueId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/issues/${issueId}`, {
      headers: this.getHeaders('TASK_VIEWED')
    });
  }

  createIssue(issueData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/issues/`, issueData, {
      headers: this.getHeaders('TASK_CREATED')
    });
  }

  // Workspaces API calls
  getWorkspaces(): Observable<any> {
    return this.http.get(`${this.baseUrl}/workspaces`, {
      headers: this.getHeaders('CALENDAR_CLICKED')
    });
  }

  createWorkspace(data: { name: string; description?: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}/workspaces/`, data, {
      headers: this.getHeaders('WORKSPACE_CREATED')
    });
  }

  getWorkspace(workspaceId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/workspaces/${workspaceId}`, {
      headers: this.getHeaders('WORKSPACE_VIEWED')
    });
  }

  // User API calls
  getCurrentUser(): Observable<any> {
    return this.http.get(`${this.baseUrl}/users/me`, {
      headers: this.getHeaders('TEAM_CLICKED')
    });
  }

  // Messages API calls
  getMessages(channelId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/messages/history/${channelId}`);
  }

  sendMessage(messageData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/messages/`, messageData);
  }
}
