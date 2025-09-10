import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService, Task } from '../../services/task.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.less']
})
export class TaskDetailComponent implements OnInit {
  task: Task | null = null;
  isLoading = true;
  isEditing = false;
  taskId?: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private taskService: TaskService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.taskId = params['id'];
      if (this.taskId) {
        this.loadTask();
      }
    });
  }

  loadTask(): void {
    if (!this.taskId) return;

    this.isLoading = true;
    this.taskService.getTaskById(this.taskId).subscribe({
      next: (task) => {
        this.task = task;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading task:', error);
        this.snackBar.open('Failed to load task', 'Close', { duration: 3000 });
        this.isLoading = false;
      }
    });
  }

  editTask(): void {
    this.isEditing = true;
  }

  onTaskSaved(task: Task): void {
    this.task = task;
    this.isEditing = false;
  }

  onEditCancelled(): void {
    this.isEditing = false;
  }

  deleteTask(): void {
    if (!this.taskId || !confirm('Are you sure you want to delete this task?')) {
      return;
    }

    this.taskService.deleteTask(this.taskId).subscribe({
      next: () => {
        this.snackBar.open('Task deleted successfully', 'Close', { duration: 3000 });
        this.router.navigate(['/tasks']);
      },
      error: (error) => {
        console.error('Error deleting task:', error);
        this.snackBar.open('Failed to delete task', 'Close', { duration: 3000 });
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/tasks']);
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'todo': return 'status-todo';
      case 'inprogress': return 'status-inprogress';
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
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }
}
