import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { HomeRedirectGuard } from './guards/home-redirect.guard';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { MainLayoutComponent } from './components/main-layout/main-layout.component';
import { HomeComponent } from './components/home/home.component';
import { WorkspaceSelectorComponent } from './components/workspace-selector/workspace-selector.component';
import { PlaceholderComponent } from './components/placeholder/placeholder.component';
import { PricingComponent } from './components/pricing/pricing.component';

// New Components
import { SolutionsEngineeringComponent } from './components/solutions-engineering/solutions-engineering.component';
import { SolutionsMarketingComponent } from './components/solutions-marketing/solutions-marketing.component';
import { SolutionsItComponent } from './components/solutions-it/solutions-it.component';
import { ResourcesGuidesComponent } from './components/resources-guides/resources-guides.component';
import { DemoComponent } from './components/demo/demo.component';
import { ContactSalesComponent } from './components/contact-sales/contact-sales.component';

// Task Components
import { TaskFormComponent } from './components/task-form/task-form.component';
import { TaskDetailComponent } from './components/task-detail/task-detail.component';
import { TaskListComponent } from './components/task-list/task-list.component';

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

import { Component } from '@angular/core';

@Component({ selector: 'app-auth-callback', template: `<div style="padding:24px;text-align:center">Signing you in...</div>` })
export class AuthCallbackComponent { constructor() { const p=new URLSearchParams(window.location.search); const t=p.get('token'); if(t){localStorage.setItem('slack_token',t); window.location.href='/app';} else { window.location.href='/home'; } } }

@Component({ selector: 'app-projects', template: `<div class="app-page"><h1>Projects</h1><p>Plan and deliver with boards, lists, and timelines.</p><div *ngIf="currentView" class="view-banner">Selected view: {{ currentView }}</div></div>`, styles:[`.app-page{max-width:960px;margin:24px auto;padding:0 16px;}.view-banner{margin-top:12px;padding:8px 12px;border:1px solid #e0e0e0;border-radius:8px;background:#fafafa;}`]})
export class ProjectsPageComponent {
  currentView: string | null = null;
  constructor(){ const p=new URLSearchParams(window.location.search); this.currentView = p.get('view'); }
}

@Component({ selector: 'app-docs', template: `<div class="app-page"><h1>Docs</h1><p>Team knowledge base and documentation.</p></div>`, styles:[`.app-page{max-width:960px;margin:24px auto;padding:0 16px;}`]})
export class DocsPageComponent {}

@Component({ selector: 'app-devex', template: `<div class="app-page"><h1>DevEx</h1><p>Developer experience dashboards and service catalog.</p></div>`, styles:[`.app-page{max-width:960px;margin:24px auto;padding:0 16px;}`]})
export class DevExPageComponent {}

@Component({ selector: 'app-service', template: `<div class="app-page"><h1>Service Desk</h1><p>Manage requests and operations.</p></div>`, styles:[`.app-page{max-width:960px;margin:24px auto;padding:0 16px;}`]})
export class ServiceDeskPageComponent {}

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent, canActivate: [HomeRedirectGuard] },
  { path: 'auth/callback', component: AuthCallbackComponent },

  // App pages
  { path: 'apps/projects', component: ProjectsPageComponent },
  { path: 'apps/docs', component: DocsPageComponent },
  { path: 'apps/devex', component: DevExPageComponent },
  { path: 'apps/service', component: ServiceDeskPageComponent },

  // Marketing pages
  { path: 'features', component: PlaceholderComponent, data: { pageType: 'features' } },
  { path: 'solutions', component: PlaceholderComponent, data: { pageType: 'solutions' } },
  { path: 'solutions/engineering', component: SolutionsEngineeringComponent },
  { path: 'solutions/marketing', component: SolutionsMarketingComponent },
  { path: 'solutions/it', component: SolutionsItComponent },
  { path: 'enterprise', component: PlaceholderComponent, data: { pageType: 'enterprise' } },
  { path: 'resources', component: PlaceholderComponent, data: { pageType: 'resources' } },
  { path: 'resources/guides', component: ResourcesGuidesComponent },
  { path: 'pricing', component: PricingComponent },
  { path: 'demo', component: DemoComponent },
  { path: 'contact-sales', component: ContactSalesComponent },

  // Company pages
  { path: 'about', component: AboutComponent },
  { path: 'careers', component: CareersComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'blog', component: BlogComponent },

  // Resource pages
  { path: 'help', component: HelpCenterComponent },
  { path: 'developers', component: DevelopersComponent },
  { path: 'api', component: ApiComponent },
  { path: 'community', component: CommunityComponent },

  // Legal pages
  { path: 'privacy', component: PrivacyComponent },
  { path: 'terms', component: TermsComponent },
  { path: 'security', component: SecurityComponent },
  { path: 'cookies', component: CookiesComponent },

  // Task pages (protected)
  { path: 'tasks', component: TaskListComponent, canActivate: [AuthGuard] },
  { path: 'tasks/new', component: TaskFormComponent, canActivate: [AuthGuard] },
  { path: 'tasks/:id', component: TaskDetailComponent, canActivate: [AuthGuard] },

  // Auth pages
  { path: 'auth/login', component: LoginComponent },
  { path: 'auth/register', component: RegisterComponent },

  // App pages (protected)
  { path: 'workspace-selector', component: WorkspaceSelectorComponent, canActivate: [AuthGuard] },
  { path: 'app', component: MainLayoutComponent, canActivate: [AuthGuard] },

  { path: '**', redirectTo: '' }
];

@NgModule({
  declarations: [AuthCallbackComponent, ProjectsPageComponent, DocsPageComponent, DevExPageComponent, ServiceDeskPageComponent],
  imports: [RouterModule.forRoot(routes, { useHash: false })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
