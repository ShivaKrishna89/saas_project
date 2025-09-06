import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { WebSocketService } from '../../services/websocket.service';

@Component({
  selector: 'app-main-layout',
  template: `
    <div class="slack-app">
      <!-- Top Bar -->
      <mat-toolbar class="top-bar">
        <div class="top-bar-left">
          <div class="workspace-info" (click)="toggleWorkspaceMenu()">
            <div class="workspace-avatar">
              <span>{{ currentWorkspace?.name?.charAt(0)?.toUpperCase() || 'S' }}</span>
            </div>
            <span class="workspace-name">{{ currentWorkspace?.name || 'Slack Clone' }}</span>
            <mat-icon class="expand-icon">expand_more</mat-icon>
          </div>
          
          <mat-menu #workspaceMenu="matMenu" class="workspace-menu">
            <div class="workspace-menu-header">
              <h3>Workspaces</h3>
            </div>
            <mat-divider></mat-divider>
            <button mat-menu-item *ngFor="let workspace of availableWorkspaces" (click)="switchWorkspace(workspace)">
              <div class="menu-workspace-item">
                <div class="menu-workspace-avatar">
                  <span>{{ workspace.name.charAt(0).toUpperCase() }}</span>
                </div>
                <span>{{ workspace.name }}</span>
              </div>
            </button>
            <mat-divider></mat-divider>
            <button mat-menu-item (click)="createNewWorkspace()">
              <mat-icon>add</mat-icon>
              <span>Create a new workspace</span>
            </button>
          </mat-menu>
        </div>

        <div class="top-bar-center">
          <div class="search-container">
            <mat-icon class="search-icon">search</mat-icon>
            <input 
              type="text" 
              placeholder="Search Slack Clone" 
              class="search-input"
              (focus)="onSearchFocus()">
          </div>
        </div>

        <div class="top-bar-right">
          <button mat-icon-button matTooltip="Help" class="top-bar-btn">
            <mat-icon>help_outline</mat-icon>
          </button>
          <button mat-icon-button matTooltip="Notifications" class="top-bar-btn">
            <mat-icon>notifications</mat-icon>
          </button>
          <button mat-icon-button [matMenuTriggerFor]="userMenu" class="user-menu-trigger">
            <div class="user-avatar">
              <span>{{ getUserInitials() }}</span>
            </div>
          </button>
          
          <mat-menu #userMenu="matMenu">
            <div class="user-menu-header">
              <div class="user-menu-avatar">
                <span>{{ getUserInitials() }}</span>
              </div>
              <div class="user-menu-info">
                <h4>{{ currentUser?.full_name || 'Current User' }}</h4>
                <p>{{ currentUser?.email || 'user@example.com' }}</p>
              </div>
            </div>
            <mat-divider></mat-divider>
            <button mat-menu-item>
              <mat-icon>person</mat-icon>
              <span>Profile</span>
            </button>
            <button mat-menu-item>
              <mat-icon>settings</mat-icon>
              <span>Preferences</span>
            </button>
            <button mat-menu-item>
              <mat-icon>notifications</mat-icon>
              <span>Notifications</span>
            </button>
            <mat-divider></mat-divider>
            <button mat-menu-item (click)="logout()">
              <mat-icon>exit_to_app</mat-icon>
              <span>Sign out</span>
            </button>
          </mat-menu>
        </div>
      </mat-toolbar>

      <!-- Main Content -->
      <div class="main-content">
        <!-- Left Sidebar -->
        <mat-sidenav #sidenav mode="side" opened class="sidebar" [style.width.px]="280">
          <div class="sidebar-content">
            <!-- Workspaces List -->
            <div class="workspaces-list">
              <div class="workspace-item active">
                <div class="workspace-indicator">
                  <span>{{ currentWorkspace?.name?.charAt(0)?.toUpperCase() || 'S' }}</span>
                </div>
              </div>
              <div class="workspace-item" *ngFor="let workspace of availableWorkspaces.slice(0, 4)">
                <div class="workspace-indicator">
                  <span>{{ workspace.name.charAt(0).toUpperCase() }}</span>
                </div>
              </div>
              <div class="workspace-item add-workspace">
                <div class="workspace-indicator">
                  <mat-icon>add</mat-icon>
                </div>
              </div>
            </div>

            <!-- Channels Section -->
            <app-channel-list 
              [channels]="channels"
              [selectedChannel]="currentChannel"
              [expanded]="channelsExpanded"
              (channelSelected)="selectChannel($event)"
              (addChannelClicked)="addChannel()">
            </app-channel-list>

            <!-- Direct Messages Section -->
            <app-user-list 
              [users]="users"
              [selectedUser]="currentDM"
              [expanded]="dmsExpanded"
              (userSelected)="selectDM($event)"
              (addUserClicked)="addDM()">
            </app-user-list>

            <!-- Apps Section -->
            <div class="sidebar-section">
              <div class="section-header" (click)="toggleAppsExpanded()">
                <mat-icon class="section-icon">apps</mat-icon>
                <span class="section-title">Apps</span>
                <mat-icon class="expand-icon" [class.expanded]="appsExpanded">
                  {{ appsExpanded ? 'expand_less' : 'expand_more' }}
                </mat-icon>
              </div>
              <div class="section-content" *ngIf="appsExpanded">
                <div class="app-item">
                  <mat-icon class="app-icon">calendar_today</mat-icon>
                  <span>Calendar</span>
                </div>
                <div class="app-item">
                  <mat-icon class="app-icon">drive_file_rename_outline</mat-icon>
                  <span>Google Drive</span>
                </div>
                <div class="app-item">
                  <mat-icon class="app-icon">video_call</mat-icon>
                  <span>Zoom</span>
                </div>
              </div>
            </div>
          </div>
        </mat-sidenav>

        <!-- Chat Area -->
        <div class="chat-area">
          <!-- Chat Header -->
          <app-chat-header 
            [chatName]="getCurrentChatName()"
            [chatTopic]="currentChannel?.topic"
            (searchClicked)="openSearch()"
            (notificationsClicked)="toggleNotifications()"
            (settingsClicked)="openSettings()">
          </app-chat-header>

          <!-- Messages Area -->
          <div class="messages-area">
            <app-message-list [messages]="messages"></app-message-list>
          </div>

          <!-- Message Input -->
          <app-message-input 
            [placeholder]="getCurrentChatName()"
            (messageSent)="sendMessage($event)">
          </app-message-input>
        </div>

        <!-- Right Sidebar (Info Panel) -->
        <mat-sidenav #rightSidenav mode="side" opened position="end" class="info-panel" [style.width.px]="300">
          <div class="info-panel-content">
            <div class="info-panel-header">
              <h3>{{ getInfoPanelTitle() }}</h3>
              <button mat-icon-button (click)="closeInfoPanel()" class="close-btn">
                <mat-icon>close</mat-icon>
              </button>
            </div>
            
            <div class="info-panel-body">
              <!-- Channel Info -->
              <div class="channel-details" *ngIf="currentChannel">
                <div class="channel-header">
                  <h4># {{ currentChannel.name }}</h4>
                  <p class="channel-topic">{{ currentChannel.topic || 'No topic set' }}</p>
                  <p class="channel-members">{{ currentChannel.memberCount || 0 }} members</p>
                </div>
                
                <div class="channel-actions">
                  <button mat-stroked-button class="action-btn">
                    <mat-icon>notifications</mat-icon>
                    Notifications
                  </button>
                  <button mat-stroked-button class="action-btn">
                    <mat-icon>star</mat-icon>
                    Star channel
                  </button>
                </div>
              </div>
              
              <!-- User Info -->
              <div class="user-details" *ngIf="currentDM">
                <div class="user-profile">
                  <div class="user-avatar-large">
                    <span>{{ currentDM.fullName?.charAt(0) || currentDM.username?.charAt(0) }}</span>
                  </div>
                  <h4>{{ currentDM.fullName || currentDM.username }}</h4>
                  <p class="user-status" [class.online]="currentDM.online">
                    {{ currentDM.online ? 'Active now' : 'Offline' }}
                  </p>
                  <p class="user-role">{{ currentDM.role || 'Member' }}</p>
                </div>
                
                <div class="user-actions">
                  <button mat-stroked-button class="action-btn">
                    <mat-icon>message</mat-icon>
                    Message
                  </button>
                  <button mat-stroked-button class="action-btn">
                    <mat-icon>call</mat-icon>
                    Call
                  </button>
                </div>
              </div>
              
              <mat-divider></mat-divider>
              
              <!-- Pinned Messages -->
              <div class="pinned-messages">
                <div class="section-header">
                  <h4>Pinned messages</h4>
                  <button mat-icon-button class="icon-btn">
                    <mat-icon>add</mat-icon>
                  </button>
                </div>
                <p class="no-pins" *ngIf="!pinnedMessages.length">No pinned messages yet</p>
                <div class="pinned-item" *ngFor="let message of pinnedMessages">
                  <div class="pinned-content">
                    <p>{{ message.content }}</p>
                    <span class="pinned-author">{{ message.user.fullName }}</span>
                  </div>
                </div>
              </div>
              
              <mat-divider></mat-divider>
              
              <!-- Channel Members -->
              <div class="channel-members" *ngIf="currentChannel">
                <div class="section-header">
                  <h4>Members ({{ users.length }})</h4>
                  <button mat-icon-button class="icon-btn">
                    <mat-icon>person_add</mat-icon>
                  </button>
                </div>
                <div class="member-list">
                  <div class="member-item" *ngFor="let user of users">
                    <div class="member-avatar">
                      <span>{{ user.fullName?.charAt(0) || user.username?.charAt(0) }}</span>
                    </div>
                    <span class="member-name">{{ user.fullName || user.username }}</span>
                    <div class="member-status" [class.online]="user.online"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </mat-sidenav>
      </div>
    </div>
  `,
  styles: [`
    .slack-app {
      height: 100vh;
      display: flex;
      flex-direction: column;
      background-color: #ffffff;
    }

    /* Top Bar */
    .top-bar {
      background-color: #ffffff;
      border-bottom: 1px solid #e0e0e0;
      padding: 0 16px;
      height: 60px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .top-bar-left {
      display: flex;
      align-items: center;
    }

    .workspace-info {
      display: flex;
      align-items: center;
      gap: 8px;
      cursor: pointer;
      padding: 8px;
      border-radius: 4px;
      transition: background-color 0.2s;
    }

    .workspace-info:hover {
      background-color: rgba(0, 0, 0, 0.04);
    }

    .workspace-avatar {
      width: 28px;
      height: 28px;
      background: linear-gradient(135deg, #4a154b, #611f69);
      color: white;
      border-radius: 4px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 14px;
      font-weight: 700;
    }

    .workspace-name {
      font-weight: 600;
      color: #1a1a1a;
    }

    .expand-icon {
      font-size: 16px;
      color: rgba(0, 0, 0, 0.54);
    }

    .top-bar-center {
      flex: 1;
      max-width: 600px;
      margin: 0 24px;
    }

    .search-container {
      position: relative;
      width: 100%;
    }

    .search-icon {
      position: absolute;
      left: 12px;
      top: 50%;
      transform: translateY(-50%);
      color: rgba(0, 0, 0, 0.54);
      font-size: 20px;
    }

    .search-input {
      width: 100%;
      height: 36px;
      padding: 8px 12px 8px 40px;
      border: 1px solid #e0e0e0;
      border-radius: 6px;
      font-size: 14px;
      background-color: #f8f9fa;
      outline: none;
      transition: all 0.2s;
    }

    .search-input:focus {
      background-color: white;
      border-color: #4a154b;
      box-shadow: 0 0 0 2px rgba(74, 21, 75, 0.1);
    }

    .top-bar-right {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .top-bar-btn {
      color: rgba(0, 0, 0, 0.54);
    }

    .user-menu-trigger {
      margin-left: 8px;
    }

    .user-avatar {
      width: 28px;
      height: 28px;
      background-color: #4a154b;
      color: white;
      border-radius: 4px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 14px;
      font-weight: 600;
    }

    /* Menu Styles */
    .workspace-menu-header,
    .user-menu-header {
      padding: 16px;
      background: #f8f9fa;
    }

    .user-menu-header {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .user-menu-avatar {
      width: 40px;
      height: 40px;
      background: #4a154b;
      color: white;
      border-radius: 4px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 16px;
      font-weight: 600;
    }

    .user-menu-info h4 {
      margin: 0 0 4px 0;
      font-size: 16px;
      font-weight: 600;
    }

    .user-menu-info p {
      margin: 0;
      font-size: 14px;
      color: rgba(0, 0, 0, 0.7);
    }

    .menu-workspace-item {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .menu-workspace-avatar {
      width: 24px;
      height: 24px;
      background: #4a154b;
      color: white;
      border-radius: 4px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 12px;
      font-weight: 600;
    }

    /* Main Content */
    .main-content {
      flex: 1;
      display: flex;
      overflow: hidden;
    }

    .sidebar {
      background-color: #3f0e40;
      color: #ffffff;
      border-right: none;
    }

    .sidebar-content {
      padding: 16px 0;
      height: 100%;
      display: flex;
      flex-direction: column;
    }

    /* Workspaces List */
    .workspaces-list {
      display: flex;
      flex-direction: column;
      gap: 8px;
      padding: 0 8px;
      margin-bottom: 16px;
    }

    .workspace-item {
      width: 36px;
      height: 36px;
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: all 0.2s;
      position: relative;
    }

    .workspace-item:hover {
      background-color: rgba(255, 255, 255, 0.1);
    }

    .workspace-item.active {
      background-color: rgba(255, 255, 255, 0.2);
    }

    .workspace-indicator {
      width: 28px;
      height: 28px;
      background: #4a154b;
      color: white;
      border-radius: 6px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 14px;
      font-weight: 600;
    }

    .add-workspace .workspace-indicator {
      background: rgba(255, 255, 255, 0.2);
      color: white;
    }

    /* Apps Section */
    .sidebar-section {
      margin-top: auto;
      padding: 0 16px;
    }

    .section-header {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 8px 0;
      cursor: pointer;
      color: rgba(255, 255, 255, 0.7);
      transition: color 0.2s;
    }

    .section-header:hover {
      color: white;
    }

    .section-icon {
      font-size: 18px;
    }

    .section-title {
      flex: 1;
      font-size: 14px;
      font-weight: 600;
    }

    .expand-icon {
      font-size: 16px;
      transition: transform 0.2s;
    }

    .expand-icon.expanded {
      transform: rotate(180deg);
    }

    .section-content {
      padding-left: 26px;
    }

    .app-item {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 6px 0;
      color: rgba(255, 255, 255, 0.7);
      font-size: 14px;
      cursor: pointer;
      transition: color 0.2s;
    }

    .app-item:hover {
      color: white;
    }

    .app-icon {
      font-size: 16px;
    }

    .chat-area {
      flex: 1;
      display: flex;
      flex-direction: column;
      background-color: #ffffff;
    }

    .messages-area {
      flex: 1;
      overflow: hidden;
    }

    .info-panel {
      background-color: #f8f9fa;
      border-left: 1px solid #e0e0e0;
    }

    .info-panel-content {
      padding: 20px;
      height: 100%;
      overflow-y: auto;
    }

    .info-panel-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
    }

    .info-panel-header h3 {
      margin: 0;
      font-size: 18px;
      font-weight: 600;
      color: #1a1a1a;
    }

    .close-btn {
      color: rgba(0, 0, 0, 0.54);
    }

    .channel-header h4,
    .user-details h4 {
      margin: 0 0 8px 0;
      font-size: 16px;
      font-weight: 600;
      color: #1a1a1a;
    }

    .channel-topic,
    .channel-members {
      margin: 0 0 8px 0;
      color: rgba(0, 0, 0, 0.7);
      font-size: 14px;
    }

    .channel-actions,
    .user-actions {
      display: flex;
      gap: 8px;
      margin: 16px 0;
    }

    .action-btn {
      flex: 1;
      height: 36px;
      font-size: 14px;
      color: #4a154b;
      border-color: #4a154b;
    }

    .user-profile {
      text-align: center;
      margin-bottom: 20px;
    }

    .user-avatar-large {
      width: 80px;
      height: 80px;
      background-color: #4a154b;
      color: white;
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 32px;
      font-weight: 700;
      margin: 0 auto 16px;
    }

    .user-status {
      color: rgba(0, 0, 0, 0.54);
      font-size: 14px;
      margin: 0 0 8px 0;
    }

    .user-status.online {
      color: #4caf50;
    }

    .user-role {
      color: rgba(0, 0, 0, 0.7);
      font-size: 14px;
      margin: 0;
    }

    .pinned-messages,
    .channel-members {
      margin: 20px 0;
    }

    .section-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 12px;
    }

    .section-header h4 {
      margin: 0;
      font-size: 14px;
      font-weight: 600;
      color: #1a1a1a;
    }

    .icon-btn {
      width: 24px;
      height: 24px;
      color: rgba(0, 0, 0, 0.54);
    }

    .no-pins {
      color: rgba(0, 0, 0, 0.54);
      font-size: 14px;
      margin: 0;
    }

    .pinned-item {
      padding: 8px 0;
      border-bottom: 1px solid #e0e0e0;
    }

    .pinned-content p {
      margin: 0 0 4px 0;
      font-size: 14px;
      color: #1a1a1a;
    }

    .pinned-author {
      font-size: 12px;
      color: rgba(0, 0, 0, 0.54);
    }

    .member-list {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .member-item {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 8px 0;
    }

    .member-avatar {
      width: 24px;
      height: 24px;
      background-color: #f5f5f5;
      color: #1a1a1a;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 12px;
      font-weight: 600;
    }

    .member-name {
      flex: 1;
      font-size: 14px;
      color: #1a1a1a;
    }

    .member-status {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background-color: #ccc;
    }

    .member-status.online {
      background-color: #4caf50;
    }

    /* Responsive Design */
    @media (max-width: 768px) {
      .top-bar-center {
        margin: 0 12px;
      }
      
      .info-panel {
        display: none;
      }
      
      .workspaces-list {
        flex-direction: row;
        justify-content: center;
      }
    }
  `]
})
export class MainLayoutComponent implements OnInit {
  channels: any[] = [];
  users: any[] = [];
  messages: any[] = [];
  pinnedMessages: any[] = [];
  currentChannel: any = null;
  currentDM: any = null;
  currentUser: any = null;
  currentWorkspace: any = null;
  availableWorkspaces: any[] = [];
  channelsExpanded: boolean = true;
  dmsExpanded: boolean = true;
  appsExpanded: boolean = false;

  constructor(
    private authService: AuthService,
    private webSocketService: WebSocketService
  ) {}

  ngOnInit() {
    // Initialize WebSocket connection
    this.webSocketService.connect();
    
    // Load current user and workspace
    this.loadCurrentUser();
    this.loadCurrentWorkspace();
    this.loadAvailableWorkspaces();
    
    // Load channels and users (mock data for now)
    this.loadChannels();
    this.loadUsers();
    this.loadMessages();
    this.loadPinnedMessages();
    
    // Select first channel by default
    if (this.channels.length > 0) {
      this.selectChannel(this.channels[0]);
    }
  }

  loadCurrentUser() {
    this.currentUser = this.authService.currentUserValue || {
      id: 1,
      full_name: 'Current User',
      username: 'currentuser',
      email: 'user@example.com'
    };
  }

  loadCurrentWorkspace() {
    const workspaceStr = localStorage.getItem('selectedWorkspace');
    if (workspaceStr) {
      this.currentWorkspace = JSON.parse(workspaceStr);
    } else {
      this.currentWorkspace = {
        id: 1,
        name: 'Slack Clone',
        description: 'Default workspace'
      };
    }
  }

  loadAvailableWorkspaces() {
    this.availableWorkspaces = [
      {
        id: 1,
        name: 'Acme Corporation',
        description: 'Main workspace for Acme Corp team'
      },
      {
        id: 2,
        name: 'Project Alpha',
        description: 'Development team workspace'
      },
      {
        id: 3,
        name: 'Marketing Team',
        description: 'Marketing and communications'
      }
    ];
  }

  getUserInitials(): string {
    if (this.currentUser?.full_name) {
      return this.currentUser.full_name.split(' ').map((n: string) => n[0]).join('').toUpperCase();
    }
    return 'CU';
  }

  selectChannel(channel: any) {
    this.currentChannel = channel;
    this.currentDM = null;
    this.loadMessages();
  }

  selectDM(user: any) {
    this.currentDM = user;
    this.currentChannel = null;
    this.loadMessages();
  }

  getCurrentChatName(): string {
    if (this.currentChannel) {
      return this.currentChannel.name;
    }
    if (this.currentDM) {
      return this.currentDM.fullName || this.currentDM.username;
    }
    return 'Select a channel or DM';
  }

  getInfoPanelTitle(): string {
    if (this.currentChannel) {
      return 'Channel Info';
    }
    if (this.currentDM) {
      return 'User Info';
    }
    return 'Info';
  }

  sendMessage(content: string) {
    if (content.trim()) {
      const message = {
        id: Date.now(),
        content: content,
        user: this.currentUser,
        timestamp: new Date(),
        channelId: this.currentChannel?.id,
        dmUserId: this.currentDM?.id
      };
      
      this.messages.push(message);
      
      // Send via WebSocket
      this.webSocketService.sendMessage({
        type: 'new_message',
        data: message
      });
    }
  }

  addChannel() {
    console.log('Add channel clicked');
  }

  addDM() {
    console.log('Add DM clicked');
  }

  toggleAppsExpanded() {
    this.appsExpanded = !this.appsExpanded;
  }

  toggleWorkspaceMenu() {
    // Menu will be handled by mat-menu
  }

  switchWorkspace(workspace: any) {
    this.currentWorkspace = workspace;
    localStorage.setItem('selectedWorkspace', JSON.stringify(workspace));
    // Reload channels and users for new workspace
    this.loadChannels();
    this.loadUsers();
    this.loadMessages();
  }

  createNewWorkspace() {
    console.log('Create new workspace');
  }

  onSearchFocus() {
    console.log('Search focused');
  }

  openSearch() {
    console.log('Search clicked');
  }

  toggleNotifications() {
    console.log('Notifications toggled');
  }

  openSettings() {
    console.log('Settings opened');
  }

  closeInfoPanel() {
    console.log('Close info panel');
  }

  logout() {
    this.authService.logout();
  }

  private loadChannels() {
    // Mock data - replace with actual API call
    this.channels = [
      { id: 1, name: 'general', topic: 'Company-wide announcements and work-based matters', unreadCount: 0, memberCount: 24 },
      { id: 2, name: 'random', topic: 'Non-work banter and water cooler conversation', unreadCount: 3, memberCount: 18 },
      { id: 3, name: 'announcements', topic: 'Important updates and announcements', unreadCount: 0, memberCount: 24 },
      { id: 4, name: 'development', topic: 'Development team discussions', unreadCount: 0, memberCount: 8 },
      { id: 5, name: 'design', topic: 'Design team discussions', unreadCount: 0, memberCount: 6 }
    ];
  }

  private loadUsers() {
    // Mock data - replace with actual API call
    this.users = [
      { id: 1, fullName: 'John Doe', username: 'johndoe', online: true, role: 'Admin' },
      { id: 2, fullName: 'Jane Smith', username: 'janesmith', online: true, role: 'Member' },
      { id: 3, fullName: 'Bob Johnson', username: 'bobjohnson', online: false, role: 'Member' },
      { id: 4, fullName: 'Alice Brown', username: 'alicebrown', online: true, role: 'Member' },
      { id: 5, fullName: 'Charlie Wilson', username: 'charliewilson', online: false, role: 'Member' }
    ];
  }

  private loadMessages() {
    // Mock data - replace with actual API call
    this.messages = [
      {
        id: 1,
        content: 'Hey everyone! Welcome to our Slack clone! 👋',
        user: { fullName: 'John Doe', username: 'johndoe' },
        timestamp: new Date(Date.now() - 3600000)
      },
      {
        id: 2,
        content: 'This looks great! Much better than email.',
        user: { fullName: 'Jane Smith', username: 'janesmith' },
        timestamp: new Date(Date.now() - 1800000)
      },
      {
        id: 3,
        content: 'I love the real-time messaging feature!',
        user: { fullName: 'Bob Johnson', username: 'bobjohnson' },
        timestamp: new Date(Date.now() - 900000)
      },
      {
        id: 4,
        content: 'The UI is so clean and intuitive. Great job!',
        user: { fullName: 'Alice Brown', username: 'alicebrown' },
        timestamp: new Date(Date.now() - 300000)
      }
    ];
  }

  private loadPinnedMessages() {
    // Mock data - replace with actual API call
    this.pinnedMessages = [
      {
        id: 1,
        content: 'Important: Team meeting tomorrow at 10 AM',
        user: { fullName: 'John Doe' },
        timestamp: new Date()
      }
    ];
  }
}
