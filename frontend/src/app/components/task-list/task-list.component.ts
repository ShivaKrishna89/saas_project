import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TaskService, Task } from '../../services/task.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.less']
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];
  isLoading = true;
  searchTerm = '';
  selectedProject = '';
  selectedStatus = '';
  selectedWorkType = '';

  projects: string[] = [];
  statuses = [
    { value: '', label: 'All Statuses' },
    { value: 'todo', label: 'To Do' },
    { value: 'inprogress', label: 'In Progress' },
    { value: 'done', label: 'Done' }
  ];
  workTypes = [
    { value: '', label: 'All Types' },
    { value: 'feature', label: 'Feature' },
    { value: 'task', label: 'Task' },
    { value: 'bug', label: 'Bug' }
  ];

  constructor(
    private taskService: TaskService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this.isLoading = true;
    const params: any = {};
    
    if (this.selectedProject) {
      params.project = this.selectedProject;
    }
    if (this.selectedStatus) {
      params.status = this.selectedStatus;
    }
    if (this.selectedWorkType) {
      params.work_type = this.selectedWorkType;
    }

    this.taskService.getTasks(params).subscribe({
      next: (tasks) => {
        this.tasks = tasks;
        this.extractProjects();
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading tasks:', error);
        this.snackBar.open('Failed to load tasks', 'Close', { duration: 3000 });
        this.isLoading = false;
      }
    });
  }

  private extractProjects(): void {
    const projectSet = new Set<string>();
    this.tasks.forEach(task => {
      if (task.project) {
        projectSet.add(task.project);
      }
    });
    this.projects = Array.from(projectSet).sort();
  }

  onSearch(): void {
    this.loadTasks();
  }

  onFilterChange(): void {
    this.loadTasks();
  }

  clearFilters(): void {
    this.searchTerm = '';
    this.selectedProject = '';
    this.selectedStatus = '';
    this.selectedWorkType = '';
    this.loadTasks();
  }

  createNewTask(): void {
    this.router.navigate(['/tasks/new']);
  }

  goToWorkspace(): void {
    this.router.navigate(['/app']);
  }

  viewTask(task: Task): void {
    this.router.navigate(['/tasks', task.id]);
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'todo': return 'status-todo';
      case 'inprogress':
      case 'in-progress': return 'status-inprogress';
      case 'done': return 'status-done';
      default: return 'status-default';
    }
  }

  getPriorityClass(priority: string): string {
    switch (priority) {
      case 'low': return 'priority-low';
      case 'medium': return 'priority-medium';
      case 'high': return 'priority-high';
      default: return 'priority-default';
    }
  }

  getWorkTypeClass(workType?: string): string {
    switch (workType) {
      case 'feature': return 'worktype-feature';
      case 'task': return 'worktype-task';
      case 'bug': return 'worktype-bug';
      default: return 'worktype-default';
    }
  }

  formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  }

  get filteredTasks(): Task[] {
    if (!this.searchTerm) {
      return this.tasks;
    }
    
    const term = this.searchTerm.toLowerCase();
    return this.tasks.filter(task => 
      (task.summary || '').toLowerCase().includes(term) ||
      (task.description || '').toLowerCase().includes(term) ||
      (task.project || '').toLowerCase().includes(term) ||
      (task.assignee?.name || '').toLowerCase().includes(term) ||
      (task.reporter || '').toLowerCase().includes(term)
    );
  }
}
