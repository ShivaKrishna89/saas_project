import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TextFieldModule } from '@angular/cdk/text-field';

// Angular Material Modules
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSliderModule } from '@angular/material/slider';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatRadioModule } from '@angular/material/radio';
import { MatGridListModule } from '@angular/material/grid-list';

// App Components
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

// Core Components
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { MainLayoutComponent } from './components/main-layout/main-layout.component';
import { HomeComponent } from './components/home/home.component';
import { WorkspaceSelectorComponent } from './components/workspace-selector/workspace-selector.component';
import { ChannelListComponent } from './components/channel-list/channel-list.component';
import { MessageListComponent } from './components/message-list/message-list.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { ChatHeaderComponent } from './components/chat-header/chat-header.component';
import { MessageInputComponent } from './components/message-input/message-input.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { PlaceholderComponent } from './components/placeholder/placeholder.component';

// Company Pages
import { AboutComponent } from './components/about/about.component';
import { CareersComponent } from './components/careers/careers.component';
import { ContactComponent } from './components/contact/contact.component';
import { BlogComponent } from './components/blog/blog.component';

// Resource Pages
import { HelpCenterComponent } from './components/help-center/help-center.component';
import { DevelopersComponent } from './components/developers/developers.component';
import { ApiComponent } from './components/api/api.component';
import { CommunityComponent } from './components/community/community.component';

// Legal Pages
import { PrivacyComponent } from './components/privacy/privacy.component';
import { TermsComponent } from './components/terms/terms.component';
import { SecurityComponent } from './components/security/security.component';
import { CookiesComponent } from './components/cookies/cookies.component';
import { ScrollToTopComponent } from './components/scroll-to-top/scroll-to-top.component';
import { PricingComponent } from './components/pricing/pricing.component';
import { TaskManagementComponent } from './components/task-management/task-management.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { TeamComponent } from './components/team/team.component';

// New Components
import { SolutionsEngineeringComponent } from './components/solutions-engineering/solutions-engineering.component';
import { SolutionsMarketingComponent } from './components/solutions-marketing/solutions-marketing.component';
import { SolutionsItComponent } from './components/solutions-it/solutions-it.component';
import { ResourcesGuidesComponent } from './components/resources-guides/resources-guides.component';
import { DemoComponent } from './components/demo/demo.component';
import { ContactSalesComponent } from './components/contact-sales/contact-sales.component';

// Services
import { AuthInterceptor } from './services/auth.interceptor';
import { WebSocketService } from './services/websocket.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    MainLayoutComponent,
    HomeComponent,
    WorkspaceSelectorComponent,
    ChannelListComponent,
    MessageListComponent,
    UserListComponent,
    ChatHeaderComponent,
    MessageInputComponent,
    UserProfileComponent,
    PlaceholderComponent,
    AboutComponent,
    CareersComponent,
    ContactComponent,
    BlogComponent,
    HelpCenterComponent,
    DevelopersComponent,
    ApiComponent,
    CommunityComponent,
    PrivacyComponent,
    TermsComponent,
    SecurityComponent,
    CookiesComponent,
    ScrollToTopComponent,
    PricingComponent,
    TaskManagementComponent,
    ProjectsComponent,
    TeamComponent,
    SolutionsEngineeringComponent,
    SolutionsMarketingComponent,
    SolutionsItComponent,
    ResourcesGuidesComponent,
    DemoComponent,
    ContactSalesComponent
  ],
      imports: [
      BrowserModule,
      BrowserAnimationsModule,
      HttpClientModule,
      ReactiveFormsModule,
      FormsModule,
      FlexLayoutModule,
      TextFieldModule,
      AppRoutingModule,
    
    // Angular Material
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDialogModule,
    MatDividerModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatSidenavModule,
    MatSnackBarModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatBadgeModule,
    MatButtonToggleModule,
    MatExpansionModule,
    MatSlideToggleModule,
    MatSliderModule,
    MatStepperModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatAutocompleteModule,
    MatRadioModule,
    MatGridListModule
  ],
  providers: [
    WebSocketService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
