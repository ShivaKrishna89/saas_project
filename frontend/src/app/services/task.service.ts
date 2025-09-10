import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

export interface Task {
  id?: string;
  title: string;
  description: string;
  status: 'todo' | 'in-progress' | 'done';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  assignee?: {
    id: string;
    name: string;
  };
  dueDate?: Date;
  tags: string[];
  comments: any[];
  createdAt: Date;
  updatedAt: Date;
  // Backend fields for API calls
  project?: string;
  work_type?: 'feature' | 'task' | 'bug';
  summary?: string;
  reporter?: string;
  created_at?: string;
  updated_at?: string;
  // New optional linkage to Projects table
  project_id?: number;
}

export interface TaskCreate {
  project: string;
  work_type: 'feature' | 'task' | 'bug';
  status: 'todo' | 'inprogress' | 'done';
  summary: string;
  description?: string;
  priority: 'low' | 'medium' | 'high';
  assignee?: string;
  reporter: string;
}

export interface TaskUpdate {
  project?: string;
  work_type?: 'feature' | 'task' | 'bug';
  status?: 'todo' | 'inprogress' | 'done';
  summary?: string;
  description?: string;
  priority?: 'low' | 'medium' | 'high';
  assignee?: string;
  reporter?: string;
}

export interface TaskListResponse {
  tasks: Task[];
  total: number;
  limit: number;
  offset: number;
}

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private baseUrl = `${environment.apiUrl}/tasks`;

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('slack_token');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
      'X-Event-Type': 'TASK_OPERATION'
    });
  }

  createTask(task: Task): Observable<Task> {
    const backendTask = {
      project: task.project || 'Default Project',
      work_type: task.work_type || 'task',
      status: task.status === 'in-progress' ? 'inprogress' : task.status,
      summary: task.title,
      description: task.description,
      priority: task.priority === 'urgent' ? 'high' : task.priority,
      assignee: task.assignee?.name,
      reporter: task.reporter || 'Current User',
      project_id: task.project_id
    };
    return this.http.post<any>(this.baseUrl, backendTask, {
      headers: this.getHeaders()
    });
  }

  getTaskById(id: string): Observable<Task> {
    return this.http.get<Task>(`${this.baseUrl}/${id}`, {
      headers: this.getHeaders()
    });
  }

  updateTask(id: string, task: TaskUpdate): Observable<Task> {
    return this.http.put<Task>(`${this.baseUrl}/${id}`, task, {
      headers: this.getHeaders()
    });
  }

  deleteTask(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`, {
      headers: this.getHeaders()
    });
  }

  getTasks(params?: {
    project?: string;
    status?: string;
    work_type?: string;
    limit?: number;
    offset?: number;
  }): Observable<Task[]> {
    let queryParams = '';
    if (params) {
      const searchParams = new URLSearchParams();
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          searchParams.append(key, value.toString());
        }
      });
      queryParams = searchParams.toString() ? `?${searchParams.toString()}` : '';
    }

    return this.http.get<any[]>(`${this.baseUrl}${queryParams}`, {
      headers: this.getHeaders()
    }).pipe(
      // Normalize backend tasks to UI Task shape
      map((backendTasks: any[]) => backendTasks.map((task: any): Task => ({
        id: task.id?.toString() || '',
        title: task.summary || 'Untitled Task',
        description: task.description || '',
        status: task.status === 'inprogress' ? 'in-progress' : task.status,
        priority: (task.priority === 'urgent' ? 'urgent' : task.priority) as Task['priority'],
        assignee: task.assignee ? { id: '1', name: task.assignee as string } : undefined,
        dueDate: undefined,
        tags: [],
        comments: [],
        createdAt: new Date(task.created_at || Date.now()),
        updatedAt: new Date(task.updated_at || Date.now()),
        project: task.project,
        work_type: task.work_type,
        summary: task.summary,
        reporter: task.reporter,
        created_at: task.created_at,
        updated_at: task.updated_at
      })))
    );
  }
}
