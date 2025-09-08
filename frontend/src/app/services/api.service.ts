import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  // Projects API calls
  getProjects(workspaceId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/projects/workspace/${workspaceId}`, {
      headers: { 'X-Event-Type': 'PROJECTS_CLICKED' }
    });
  }

  getProject(projectId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/projects/${projectId}`, {
      headers: { 'X-Event-Type': 'PROJECT_VIEWED' }
    });
  }

  createProject(projectData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/projects/`, projectData, {
      headers: { 'X-Event-Type': 'PROJECT_CREATED' }
    });
  }

  // Issues/Tasks API calls
  getIssues(projectId?: number): Observable<any> {
    const url = projectId 
      ? `${this.baseUrl}/issues?project_id=${projectId}`
      : `${this.baseUrl}/issues`;
    return this.http.get(url, {
      headers: { 'X-Event-Type': 'TASKS_CLICKED' }
    });
  }

  getIssue(issueId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/issues/${issueId}`, {
      headers: { 'X-Event-Type': 'TASK_VIEWED' }
    });
  }

  createIssue(issueData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/issues/`, issueData, {
      headers: { 'X-Event-Type': 'TASK_CREATED' }
    });
  }

  // Workspaces API calls
  getWorkspaces(): Observable<any> {
    return this.http.get(`${this.baseUrl}/workspaces`, {
      headers: { 'X-Event-Type': 'CALENDAR_CLICKED' }
    });
  }

  getWorkspace(workspaceId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/workspaces/${workspaceId}`, {
      headers: { 'X-Event-Type': 'WORKSPACE_VIEWED' }
    });
  }

  // User API calls
  getCurrentUser(): Observable<any> {
    return this.http.get(`${this.baseUrl}/users/me`, {
      headers: { 'X-Event-Type': 'TEAM_CLICKED' }
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
