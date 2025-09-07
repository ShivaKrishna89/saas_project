import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

interface Task {
  id: string;
  title: string;
  description: string;
  status: 'todo' | 'in-progress' | 'review' | 'done';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  assignee?: {
    id: string;
    name: string;
  };
  dueDate?: Date;
  tags: string[];
  comments: Comment[];
  createdAt: Date;
  updatedAt: Date;
}

interface Comment {
  id: string;
  text: string;
  author: {
    id: string;
    name: string;
  };
  createdAt: Date;
}

interface TeamMember {
  id: string;
  name: string;
  email: string;
}

@Component({
  selector: 'app-task-management',
  templateUrl: './task-management.component.html',
  styleUrls: ['./task-management.component.less']
})
export class TaskManagementComponent implements OnInit {
  currentView: 'board' | 'list' | 'calendar' = 'board';
  selectedFilter: string = 'all';
  selectedTask: Task | null = null;
  newComment: string = '';
  notificationMessage: string = '';
  showNotification: boolean = false;

  boardColumns = [
    { title: 'To Do', status: 'todo' },
    { title: 'In Progress', status: 'in-progress' },
    { title: 'In Review', status: 'review' },
    { title: 'Done', status: 'done' }
  ];

  tasks: Task[] = [
    {
      id: '1',
      title: 'Design new landing page',
      description: 'Create a modern, responsive landing page for the marketing campaign',
      status: 'todo',
      priority: 'high',
      assignee: { id: '1', name: 'Sarah Johnson' },
      dueDate: new Date('2024-01-15'),
      tags: ['design', 'frontend'],
      comments: [],
      createdAt: new Date('2024-01-10'),
      updatedAt: new Date('2024-01-10')
    },
    {
      id: '2',
      title: 'Implement user authentication',
      description: 'Add JWT-based authentication system with login and registration',
      status: 'in-progress',
      priority: 'urgent',
      assignee: { id: '2', name: 'Mike Chen' },
      dueDate: new Date('2024-01-12'),
      tags: ['backend', 'security'],
      comments: [
        {
          id: '1',
          text: 'Started working on the JWT implementation',
          author: { id: '2', name: 'Mike Chen' },
          createdAt: new Date('2024-01-11')
        }
      ],
      createdAt: new Date('2024-01-08'),
      updatedAt: new Date('2024-01-11')
    },
    {
      id: '3',
      title: 'Write API documentation',
      description: 'Create comprehensive API documentation for all endpoints',
      status: 'review',
      priority: 'medium',
      assignee: { id: '3', name: 'Emily Rodriguez' },
      dueDate: new Date('2024-01-20'),
      tags: ['documentation', 'api'],
      comments: [],
      createdAt: new Date('2024-01-09'),
      updatedAt: new Date('2024-01-09')
    },
    {
      id: '4',
      title: 'Setup CI/CD pipeline',
      description: 'Configure automated testing and deployment pipeline',
      status: 'done',
      priority: 'high',
      assignee: { id: '4', name: 'Alex Thompson' },
      dueDate: new Date('2024-01-05'),
      tags: ['devops', 'automation'],
      comments: [
        {
          id: '2',
          text: 'Pipeline is working perfectly! All tests are passing.',
          author: { id: '4', name: 'Alex Thompson' },
          createdAt: new Date('2024-01-05')
        }
      ],
      createdAt: new Date('2024-01-01'),
      updatedAt: new Date('2024-01-05')
    },
    {
      id: '5',
      title: 'Optimize database queries',
      description: 'Review and optimize slow database queries for better performance',
      status: 'todo',
      priority: 'medium',
      dueDate: new Date('2024-01-25'),
      tags: ['database', 'performance'],
      comments: [],
      createdAt: new Date('2024-01-11'),
      updatedAt: new Date('2024-01-11')
    }
  ];

  teamMembers: TeamMember[] = [
    { id: '1', name: 'Sarah Johnson', email: 'sarah@company.com' },
    { id: '2', name: 'Mike Chen', email: 'mike@company.com' },
    { id: '3', name: 'Emily Rodriguez', email: 'emily@company.com' },
    { id: '4', name: 'Alex Thompson', email: 'alex@company.com' }
  ];

  currentDate = new Date();
  currentMonthYear = '';

  constructor(private authService: AuthService) {}

  showNotificationMessage(message: string) {
    this.notificationMessage = message;
    this.showNotification = true;
    setTimeout(() => {
      this.showNotification = false;
    }, 3000);
  }

  ngOnInit() {
    this.updateCurrentMonthYear();
    this.generateCalendarDays();
  }

  get filteredTasks(): Task[] {
    let filtered = this.tasks;

    switch (this.selectedFilter) {
      case 'assigned':
        const currentUser = this.authService.currentUserValue;
        filtered = filtered.filter(task => task.assignee?.id === currentUser?.id);
        break;
      case 'created':
        // For demo purposes, assume current user created all tasks
        break;
      case 'high':
        filtered = filtered.filter(task => task.priority === 'high' || task.priority === 'urgent');
        break;
      case 'overdue':
        filtered = filtered.filter(task => task.dueDate && this.isOverdue(task.dueDate));
        break;
    }

    return filtered;
  }

  getTasksByStatus(status: string): Task[] {
    return this.filteredTasks.filter(task => task.status === status);
  }

  getStatusLabel(status: string): string {
    const labels: { [key: string]: string } = {
      'todo': 'To Do',
      'in-progress': 'In Progress',
      'review': 'In Review',
      'done': 'Done'
    };
    return labels[status] || status;
  }

  isOverdue(dueDate: Date | undefined): boolean {
    if (!dueDate) return false;
    return new Date(dueDate) < new Date() && new Date(dueDate).toDateString() !== new Date().toDateString();
  }

  formatDate(date: Date | undefined): string {
    if (!date) return '';
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  }

  createNewTask() {
    const newTask: Task = {
      id: Date.now().toString(),
      title: 'New Task',
      description: 'Click to edit this task description',
      status: 'todo',
      priority: 'medium',
      tags: ['new'],
      comments: [],
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    this.tasks.unshift(newTask);
    this.openTaskDetail(newTask);
    this.showNotificationMessage('New task created successfully!');
    console.log('Created new task:', newTask);
  }

  openTaskDetail(task: Task) {
    this.selectedTask = { ...task };
    console.log('Opening task detail:', task);
  }

  closeTaskDetail() {
    this.selectedTask = null;
    this.newComment = '';
  }

  updateTask() {
    if (!this.selectedTask) return;
    
    const index = this.tasks.findIndex(task => task.id === this.selectedTask!.id);
    if (index !== -1) {
      this.tasks[index] = { ...this.selectedTask, updatedAt: new Date() };
      this.showNotificationMessage('Task updated successfully!');
      console.log('Updated task:', this.selectedTask);
    }
  }

  assignTask(event: any) {
    if (!this.selectedTask) return;
    
    const assigneeId = event.value;
    if (assigneeId) {
      const assignee = this.teamMembers.find(member => member.id === assigneeId);
      this.selectedTask.assignee = assignee;
      console.log('Assigned task to:', assignee);
    } else {
      this.selectedTask.assignee = undefined;
      console.log('Unassigned task');
    }
    
    this.updateTask();
  }

  addComment() {
    if (!this.selectedTask || !this.newComment.trim()) return;
    
    const currentUser = this.authService.currentUserValue;
    const comment: Comment = {
      id: Date.now().toString(),
      text: this.newComment,
      author: {
        id: currentUser?.id?.toString() || '1',
        name: currentUser?.full_name || 'Current User'
      },
      createdAt: new Date()
    };
    
    this.selectedTask.comments.push(comment);
    this.showNotificationMessage('Comment added successfully!');
    console.log('Added comment:', comment);
    this.newComment = '';
    this.updateTask();
  }

  editTask(task: Task, event: Event) {
    event.stopPropagation();
    this.openTaskDetail(task);
    console.log('Editing task:', task);
  }

  deleteTask(task: Task, event: Event) {
    event.stopPropagation();
    if (confirm('Are you sure you want to delete this task?')) {
      const index = this.tasks.findIndex(t => t.id === task.id);
      if (index !== -1) {
        this.tasks.splice(index, 1);
        this.showNotificationMessage('Task deleted successfully!');
        console.log('Deleted task:', task);
      }
    }
  }

  onViewChange(event: any) {
    this.currentView = event.value;
    console.log('Changed view to:', event.value);
  }

  onFilterChange(event: any) {
    this.selectedFilter = event.value;
    console.log('Changed filter to:', event.value);
  }

  refreshTasks() {
    // In a real app, this would fetch tasks from the server
    console.log('Refreshing tasks...');
    // Simulate refresh by updating timestamps
    this.tasks.forEach(task => {
      task.updatedAt = new Date();
    });
  }

  // Calendar methods
  updateCurrentMonthYear() {
    this.currentMonthYear = this.currentDate.toLocaleDateString('en-US', {
      month: 'long',
      year: 'numeric'
    });
  }

  generateCalendarDays() {
    // This would generate calendar days with tasks
    // For demo purposes, we'll keep it simple
  }

  previousMonth() {
    this.currentDate.setMonth(this.currentDate.getMonth() - 1);
    this.updateCurrentMonthYear();
    this.generateCalendarDays();
    console.log('Previous month:', this.currentMonthYear);
  }

  nextMonth() {
    this.currentDate.setMonth(this.currentDate.getMonth() + 1);
    this.updateCurrentMonthYear();
    this.generateCalendarDays();
    console.log('Next month:', this.currentMonthYear);
  }

  get calendarDays() {
    // Generate calendar days for the current month
    const year = this.currentDate.getFullYear();
    const month = this.currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push({
        date: '',
        isCurrentMonth: false,
        tasks: []
      });
    }

    // Add days of the current month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const dayTasks = this.tasks.filter(task => 
        task.dueDate && 
        task.dueDate.getDate() === day &&
        task.dueDate.getMonth() === month &&
        task.dueDate.getFullYear() === year
      );

      days.push({
        date: day.toString(),
        isCurrentMonth: true,
        tasks: dayTasks
      });
    }

    return days;
  }
}
