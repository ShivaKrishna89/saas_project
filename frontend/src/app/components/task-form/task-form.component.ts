import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { TaskService, Task, TaskCreate, TaskUpdate } from '../../services/task.service';
import { ApiService } from '../../services/api.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.less']
})
export class TaskFormComponent implements OnInit {
  @Input() taskId?: string;
  @Input() mode: 'create' | 'edit' = 'create';
  @Output() taskSaved = new EventEmitter<Task>();
  @Output() cancelled = new EventEmitter<void>();

  taskForm: FormGroup;
  isLoading = false;
  isSubmitting = false;
  currentTask?: Task;

  workTypes = [
    { value: 'feature', label: 'Feature' },
    { value: 'task', label: 'Task' },
    { value: 'bug', label: 'Bug' }
  ];

  statuses = [
    { value: 'todo', label: 'To Do' },
    { value: 'inprogress', label: 'In Progress' },
    { value: 'done', label: 'Done' }
  ];

  priorities = [
    { value: 'low', label: 'Low' },
    { value: 'medium', label: 'Medium' },
    { value: 'high', label: 'High' }
  ];

  userProjects: any[] = [];

  constructor(
    private fb: FormBuilder,
    private taskService: TaskService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private apiService: ApiService
  ) {
    this.taskForm = this.createForm();
  }

  ngOnInit(): void {
    if (this.mode === 'edit' && this.taskId) {
      this.loadTask();
    }
    // Load user's projects for dropdown when creating tasks
    this.apiService.getProjectsForCurrentUser().subscribe({
      next: (projects) => { this.userProjects = projects || []; },
      error: () => { this.userProjects = []; }
    });
  }

  private createForm(): FormGroup {
    return this.fb.group({
      project: ['', [Validators.minLength(1), Validators.maxLength(255)]],
      project_id: [null, Validators.required],
      work_type: ['feature', Validators.required],
      status: ['todo', Validators.required],
      summary: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(500)]],
      description: [''],
      priority: ['medium', Validators.required],
      assignee: [''],
      reporter: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(255)]]
    });
  }

  private loadTask(): void {
    if (!this.taskId) return;

    this.isLoading = true;
    this.taskService.getTaskById(this.taskId).subscribe({
      next: (task) => {
        this.currentTask = task;
        this.taskForm.patchValue({
          project: task.project,
          work_type: task.work_type,
          status: task.status === 'in-progress' ? 'inprogress' : task.status,
          summary: task.summary,
          description: task.description || '',
          priority: task.priority === 'urgent' ? 'high' : task.priority,
          assignee: typeof task.assignee === 'string' ? task.assignee : (task.assignee?.name || ''),
          reporter: task.reporter
        });
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading task:', error);
        this.snackBar.open('Failed to load task', 'Close', { duration: 3000 });
        this.isLoading = false;
      }
    });
  }

  onSubmit(): void {
    if (this.taskForm.invalid || this.isSubmitting) {
      return;
    }

    this.isSubmitting = true;
    const formValue = this.taskForm.value;

    // Trim string values
    const trimmedValue = {
      ...formValue,
      project: formValue.project?.trim(),
      summary: formValue.summary?.trim(),
      description: formValue.description?.trim() || null,
      assignee: formValue.assignee?.trim() || null,
      reporter: formValue.reporter?.trim()
    };

    if (this.mode === 'create') {
      this.createTask(trimmedValue);
    } else {
      this.updateTask(trimmedValue);
    }
  }

  private createTask(taskData: TaskCreate): void {
    const taskToCreate: Task = {
      id: undefined,
      title: taskData.summary,
      description: taskData.description || '',
      status: taskData.status === 'inprogress' ? 'in-progress' : taskData.status,
      priority: taskData.priority,
      assignee: taskData.assignee ? { id: '1', name: taskData.assignee } : undefined,
      dueDate: undefined,
      tags: [],
      comments: [],
      createdAt: new Date(),
      updatedAt: new Date(),
      project: taskData.project,
      project_id: (this.taskForm.get('project_id')?.value as number) || undefined,
      work_type: taskData.work_type,
      summary: taskData.summary,
      reporter: taskData.reporter
    };
    
    this.taskService.createTask(taskToCreate).subscribe({
      next: (createdTask) => {
        this.snackBar.open('Task created successfully!', 'Close', { duration: 3000 });
        this.taskSaved.emit(createdTask);
        this.navigateToTask(createdTask.id!);
        this.isSubmitting = false;
      },
      error: (error) => {
        console.error('Error creating task:', error);
        this.snackBar.open('Failed to create task', 'Close', { duration: 3000 });
        this.isSubmitting = false;
      }
    });
  }

  private updateTask(taskData: TaskUpdate): void {
    if (!this.taskId) return;

    this.taskService.updateTask(this.taskId, taskData).subscribe({
      next: (updatedTask) => {
        this.snackBar.open('Task updated successfully!', 'Close', { duration: 3000 });
        this.taskSaved.emit(updatedTask);
        this.navigateToTask(updatedTask.id!);
        this.isSubmitting = false;
      },
      error: (error) => {
        console.error('Error updating task:', error);
        this.snackBar.open('Failed to update task', 'Close', { duration: 3000 });
        this.isSubmitting = false;
      }
    });
  }

  onCancel(): void {
    this.cancelled.emit();
    this.navigateBack();
  }

  private navigateToTask(taskId: string): void {
    this.router.navigate(['/tasks', taskId]);
  }

  private navigateBack(): void {
    if (this.mode === 'edit' && this.taskId) {
      this.router.navigate(['/tasks', this.taskId]);
    } else {
      this.router.navigate(['/tasks']);
    }
  }

  getFieldError(fieldName: string): string {
    const field = this.taskForm.get(fieldName);
    if (field?.errors && field.touched) {
      if (field.errors['required']) {
        return `${this.getFieldLabel(fieldName)} is required`;
      }
      if (field.errors['minlength']) {
        return `${this.getFieldLabel(fieldName)} must be at least ${field.errors['minlength'].requiredLength} characters`;
      }
      if (field.errors['maxlength']) {
        return `${this.getFieldLabel(fieldName)} must be no more than ${field.errors['maxlength'].requiredLength} characters`;
      }
    }
    return '';
  }

  private getFieldLabel(fieldName: string): string {
    const labels: { [key: string]: string } = {
      project: 'Project',
      project_id: 'Project',
      work_type: 'Work Type',
      status: 'Status',
      summary: 'Summary',
      description: 'Description',
      priority: 'Priority',
      assignee: 'Assignee',
      reporter: 'Reporter'
    };
    return labels[fieldName] || fieldName;
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.taskForm.get(fieldName);
    return !!(field?.invalid && field?.touched);
  }
}
