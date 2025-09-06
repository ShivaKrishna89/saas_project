import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-placeholder',
  template: `
    <div class="placeholder-page">
      <!-- Navigation -->
      <mat-toolbar class="navbar">
        <div class="nav-container">
          <div class="nav-left">
            <div class="logo" (click)="goHome()">
              <mat-icon class="logo-mark">auto_awesome</mat-icon>
              <span class="logo-text brand">CollabX</span>
            </div>
          </div>
          
          <div class="nav-center">
            <a [routerLink]="['/']" class="nav-link" [class.active]="pageType === 'features'">Home</a>
            <a [routerLink]="['/solutions']" class="nav-link" [class.active]="pageType === 'solutions'">Solutions</a>
            <a [routerLink]="['/enterprise']" class="nav-link" [class.active]="pageType === 'enterprise'">Enterprise</a>
            <a [routerLink]="['/resources']" class="nav-link" [class.active]="pageType === 'resources'">Resources</a>
            <a [routerLink]="['/pricing']" class="nav-link" [class.active]="pageType === 'pricing'">Pricing</a>
          </div>
          
          <div class="nav-right">
            <button mat-raised-button color="primary" class="nav-button cta-btn" (click)="navigateToRegister()">
              Create a New Workspace
            </button>
            <button mat-stroked-button color="primary" class="nav-button sign-in-outline" (click)="navigateToLogin()">Sign in</button>
          </div>
        </div>
      </mat-toolbar>

      <!-- Premium Features Hero (only for features page) -->
      <section *ngIf="pageType === 'features'" class="features-hero">
        <div class="hero-inner">
          <div class="hero-copy">
            <h1>
              <span class="muted">Focus</span>
              <span class="accent">on outcomes,</span>
              <span class="muted">not admin</span>
            </h1>
            <p class="subtitle">
              AI-powered project management that removes the work around work. Plan, track, and ship faster with CollabX.
            </p>
            <div class="hero-ctas">
              <button mat-raised-button color="accent" (click)="navigateToRegister()">Get it free</button>
            </div>
            <div class="hero-badges">
              <span class="badge">Lists</span>
              <span class="badge">Boards</span>
              <span class="badge">Timeline</span>
              <span class="badge">AI summaries</span>
            </div>
          </div>
          <div class="hero-panel">
            <mat-card class="ai-card">
              <mat-card-header>
                <div mat-card-avatar class="ai-avatar">CX</div>
                <mat-card-title>Rovo in CollabX</mat-card-title>
                <mat-card-subtitle>Suggested next steps</mat-card-subtitle>
              </mat-card-header>
              <mat-divider></mat-divider>
              <mat-card-content>
                <div class="suggestion">
                  <mat-icon>bolt</mat-icon>
                  Break epic "Mobile onboarding" into 5 tasks
                </div>
                <div class="suggestion">
                  <mat-icon>insights</mat-icon>
                  Flag risk: API throughput trending high
                </div>
                <div class="suggestion">
                  <mat-icon>auto_fix_high</mat-icon>
                  Improve issue descriptions with AI
                </div>
              </mat-card-content>
            </mat-card>
          </div>
        </div>
      </section>

      <!-- Solutions Hero -->
      <section *ngIf="pageType === 'solutions'" class="solutions-hero">
        <div class="hero-inner">
          <div class="hero-copy">
            <h1>
              Solutions for every <span class="accent">team</span>
            </h1>
            <p class="subtitle">From marketing launches to engineering roadmaps, tailor CollabX to your workflow with AI-powered assistance.</p>
            <div class="hero-ctas">
              <button mat-raised-button color="accent" (click)="navigateToRegister()">Get started</button>
              <button mat-stroked-button color="primary" (click)="navigateToResources()">See templates</button>
            </div>
          </div>
          <div class="hero-panel">
            <mat-card class="ai-card">
              <mat-card-header>
                <div mat-card-avatar class="ai-avatar">CX</div>
                <mat-card-title>Recommended templates</mat-card-title>
                <mat-card-subtitle>Jumpstart with best practices</mat-card-subtitle>
              </mat-card-header>
              <mat-divider></mat-divider>
              <mat-card-content>
                <div class="suggestion"><mat-icon>rocket_launch</mat-icon> Product launch plan</div>
                <div class="suggestion"><mat-icon>bug_report</mat-icon> Bug triage board</div>
                <div class="suggestion"><mat-icon>support_agent</mat-icon> IT change requests</div>
              </mat-card-content>
            </mat-card>
          </div>
        </div>
      </section>

      <!-- Enterprise Hero -->
      <section *ngIf="pageType === 'enterprise'" class="enterprise-hero">
        <div class="hero-inner">
          <div class="hero-copy">
            <h1>Enterprise-grade <span class="accent">security</span> & scale</h1>
            <p class="subtitle">Operate confidently with SSO/SAML, SCIM, data residency, audit logs, and advanced compliance controls.</p>
            <div class="hero-ctas">
              <button mat-raised-button color="accent" (click)="navigateToContact()">Talk to sales</button>
              <button mat-stroked-button color="primary" (click)="navigateToSecurity()">Security overview</button>
            </div>
          </div>
        </div>
      </section>

      <!-- Resources Hero -->
      <section *ngIf="pageType === 'resources'" class="resources-hero">
        <div class="hero-inner">
          <div class="hero-copy">
            <h1>Guides, templates, and <span class="accent">docs</span></h1>
            <p class="subtitle">Everything you need to learn, build, and ship faster with CollabX.</p>
            <div class="resource-search">
              <mat-form-field appearance="outline" class="search-field">
                <mat-label>Search resources</mat-label>
                <input matInput placeholder="Search resources">
                <mat-icon matSuffix>search</mat-icon>
              </mat-form-field>
            </div>
          </div>
        </div>
      </section>

      <!-- Page Content -->
      <div class="page-content" [class.tight]="pageType === 'features'">
        <div class="container">
          <div class="hero-section" *ngIf="pageType !== 'features' && pageType !== 'solutions' && pageType !== 'enterprise' && pageType !== 'resources'">
            <h1 class="page-title">{{ getPageTitle() }}</h1>
            <p class="page-subtitle">{{ getPageSubtitle() }}</p>
          </div>
          
          <!-- Enhanced Solutions Content -->
          <div class="content-section" *ngIf="pageType === 'solutions'">
            <div class="solutions-grid-pro">
              <mat-card class="pro-card" *ngFor="let s of solutionCategories">
                <mat-card-header>
                  <div mat-card-avatar class="pro-icon"><mat-icon>{{ s.icon }}</mat-icon></div>
                  <mat-card-title>{{ s.title }}</mat-card-title>
                  <mat-card-subtitle>{{ s.subtitle }}</mat-card-subtitle>
                </mat-card-header>
                <mat-card-content>
                  <ul class="bullet-list">
                    <li *ngFor="let b of s.bullets">{{ b }}</li>
                  </ul>
                </mat-card-content>
              </mat-card>
            </div>
          </div>

          <!-- Enhanced Enterprise Content -->
          <div class="content-section" *ngIf="pageType === 'enterprise'">
            <div class="enterprise-highlights">
              <mat-card class="highlight" *ngFor="let h of enterpriseHighlights">
                <mat-card-header>
                  <div mat-card-avatar class="pro-icon"><mat-icon>{{ h.icon }}</mat-icon></div>
                  <mat-card-title>{{ h.title }}</mat-card-title>
                </mat-card-header>
                <mat-card-content>
                  <p>{{ h.description }}</p>
                </mat-card-content>
              </mat-card>
            </div>
            <div class="integrations trustband">
              <h3>Trusted by modern enterprises</h3>
              <div class="logo-row">
                <span class="logo-pill">SOC 2</span>
                <span class="logo-pill">ISO 27001</span>
                <span class="logo-pill">SSO / SAML</span>
                <span class="logo-pill">SCIM</span>
                <span class="logo-pill">DLP</span>
              </div>
            </div>
          </div>

          <!-- Enhanced Resources Content -->
          <div class="content-section" *ngIf="pageType === 'resources'">
            <div class="resources-grid">
              <mat-card class="resource-card" *ngFor="let r of resourcesList">
                <mat-card-header>
                  <div mat-card-avatar class="pro-icon"><mat-icon>{{ r.icon }}</mat-icon></div>
                  <mat-card-title>{{ r.title }}</mat-card-title>
                  <mat-card-subtitle>{{ r.subtitle }}</mat-card-subtitle>
                </mat-card-header>
                <mat-card-content>
                  <p>{{ r.description }}</p>
                </mat-card-content>
                <mat-card-actions>
                  <button mat-stroked-button color="primary" [routerLink]="['/resources']">Explore</button>
                </mat-card-actions>
              </mat-card>
            </div>
          </div>

          <!-- Existing features content -->
          <div class="content-section" *ngIf="pageType === 'features'">
            <h2 class="content-kicker">Made for complex projects or everyday tasks</h2>
            <div class="feature-grid-pro">
              <mat-card class="pro-card" *ngFor="let f of proFeatures">
                <mat-card-header>
                  <div mat-card-avatar class="pro-icon"><mat-icon>{{ f.icon }}</mat-icon></div>
                  <mat-card-title>{{ f.title }}</mat-card-title>
                </mat-card-header>
                <mat-card-content>
                  <p>{{ f.description }}</p>
                </mat-card-content>
              </mat-card>
            </div>

            <!-- Jira-style pillars list -->
            <div class="pillars">
              <div class="pillar">
                <div class="pillar-icon"><mat-icon>flash_on</mat-icon></div>
                <div class="pillar-body">
                  <h3>Plan and organize tasks</h3>
                  <p>Break big ideas into steps. Create milestones, map dependencies, and keep everyone aligned.</p>
                </div>
              </div>
              <div class="pillar">
                <div class="pillar-icon"><mat-icon>flag</mat-icon></div>
                <div class="pillar-body">
                  <h3>Align work to goals</h3>
                  <p>Link issues to measurable goals so impact is visible across teams and projects.</p>
                </div>
              </div>
              <div class="pillar">
                <div class="pillar-icon"><mat-icon>list</mat-icon></div>
                <div class="pillar-body">
                  <h3>Track work your way</h3>
                  <p>Customize workflows and visualize progress with boards, lists, and backlogs—powered by automation.</p>
                </div>
              </div>
              <div class="pillar">
                <div class="pillar-icon"><mat-icon>insights</mat-icon></div>
                <div class="pillar-body">
                  <h3>Optimize with insights</h3>
                  <p>Spot risks early and improve performance with real‑time data and reports.</p>
                </div>
              </div>
            </div>

            <div class="integrations">
              <h3>Meet teams where they work</h3>
              <p>Integrate CollabX with your favorite tools to keep work in one place.</p>
              <div class="logo-row">
                <span class="logo-pill">Figma</span>
                <span class="logo-pill">Google Drive</span>
                <span class="logo-pill">Miro</span>
                <span class="logo-pill">Slack</span>
                <span class="logo-pill">Zoom</span>
              </div>
              <div style="margin-top:12px">
                <button mat-stroked-button color="primary" [routerLink]="['/resources']">Go to resources</button>
              </div>
            </div>

            <!-- New: Bring every team together under one roof -->
            <div class="two-col-cards">
              <mat-card class="info-card">
                <mat-card-header>
                  <mat-card-title>Everything in one place</mat-card-title>
                </mat-card-header>
                <mat-card-content>
                  <p>The context you need, when you need it. Ship with confidence by seeing designs, release dates, and docs alongside issues.</p>
                </mat-card-content>
                <mat-card-actions>
                  <button mat-stroked-button color="primary" [routerLink]="['/resources']">Explore features</button>
                </mat-card-actions>
              </mat-card>
              <mat-card class="info-card">
                <mat-card-header>
                  <mat-card-title>Tailor for your team</mat-card-title>
                </mat-card-header>
                <mat-card-content>
                  <p>Customize workflows, fields, and automation. Connect your toolchain so teams stay in sync without switching tabs.</p>
                </mat-card-content>
                <mat-card-actions>
                  <button mat-stroked-button color="primary" [routerLink]="['/solutions']">Learn more</button>
                </mat-card-actions>
              </mat-card>
            </div>

            <!-- New: Never lose sight of the big picture -->
            <div class="big-picture">
              <mat-card class="highlight">
                <mat-card-header>
                  <div mat-card-avatar class="pro-icon"><mat-icon>timeline</mat-icon></div>
                  <mat-card-title>Easily see every team’s progress</mat-card-title>
                </mat-card-header>
                <mat-card-content>
                  <p>Track multiple teams on a single timeline. Understand progress, map dependencies, and stay ahead of risks.</p>
                </mat-card-content>
              </mat-card>
              <mat-card class="highlight">
                <mat-card-header>
                  <div mat-card-avatar class="pro-icon"><mat-icon>flag</mat-icon></div>
                  <mat-card-title>Map work to company impact</mat-card-title>
                </mat-card-header>
                <mat-card-content>
                  <p>Connect issues to goals so everyone sees how work contributes to outcomes.</p>
                </mat-card-content>
              </mat-card>
            </div>

            <!-- New: Social proof -->
            <mat-card class="testimonial">
              <mat-card-content>
                <p class="quote">“CollabX keeps our teams aligned with boards, lists, and timelines—all in one place.”</p>
                <p class="byline">— Program Manager, Early Access Customer</p>
              </mat-card-content>
            </mat-card>

            <!-- New: Final CTA -->
            <div class="final-cta">
              <h3>No matter what you dream up, CollabX helps you get it done.</h3>
              <button mat-raised-button color="primary" (click)="navigateToRegister()">Get CollabX free</button>
            </div>
          </div>

          <!-- Fallback Content Card for other pages -->
          <div class="content-section" *ngIf="pageType !== 'features' && pageType !== 'solutions' && pageType !== 'enterprise' && pageType !== 'resources'">
            <mat-card class="content-card">
              <mat-card-content>
                <h2>{{ getContentTitle() }}</h2>
                <p>{{ getContentDescription() }}</p>
              </mat-card-content>
            </mat-card>
          </div>
        </div>
      </div>

      <!-- Footer -->
      <footer class="footer">
        <div class="container">
          <div class="footer-content">
            <div class="footer-section" *ngFor="let section of getFooterSections()">
              <h4>{{ section.title }}</h4>
              <a *ngFor="let link of section.links" [routerLink]="['/' + link.route]" class="footer-link">
                {{ link.name }}
              </a>
            </div>
          </div>
          <div class="footer-bottom">
            <div class="footer-left">
              <div class="footer-logo">
                <mat-icon class="logo-mark">auto_awesome</mat-icon>
                <span class="logo-text">CollabX</span>
              </div>
              <p>&copy; 2024 CollabX. All rights reserved.</p>
            </div>
            <div class="footer-right">
              <a href="#" class="footer-link">Privacy</a>
              <a href="#" class="footer-link">Terms</a>
              <a href="#" class="footer-link">Cookies</a>
              <a href="#" class="footer-link">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  `,
  styles: [`
    .placeholder-page {
      font-family: 'Inter', 'Roboto', sans-serif;
      line-height: 1.6;
      color: #1a1a1a;
    }

    /* Navigation */
    .navbar { position: fixed; top: 0; left: 0; right: 0; background: rgba(255,255,255,.95); backdrop-filter: blur(10px); border-bottom: 1px solid #e0e0e0; z-index: 1000; padding: 8px 0; }
    .nav-container { max-width: 1200px; margin: 0 auto; padding: 0 24px; display: flex; align-items: center; justify-content: flex-start; gap: 16px; }
    .logo { display: flex; align-items: center; gap: 8px; cursor: pointer; }
    .logo-mark { background: linear-gradient(135deg,#6a11cb,#2575fc); -webkit-background-clip: text; background-clip: text; color: transparent; font-size: 28px; }
    .logo-text { font-size: 24px; font-weight: 800; letter-spacing: .2px; color: #1a1a1a; font-family: 'Poppins','Inter',sans-serif; }
    .nav-center { display: flex; gap: 24px; margin-left: 8px; }
    .nav-link { color: #1a1a1a; text-decoration: none; font-weight: 500; transition: color .2s; cursor: pointer; }
    .nav-link:hover, .nav-link.active { color: #4a154b; }
    .nav-right { display: flex; gap: 8px; align-items: center; margin-left: 8px; }
    .nav-button { font-weight: 600; }
    .link-btn { font-weight:600; }
    .cta-btn { font-weight:700; }
    .sign-in-outline { border-color: currentColor !important; background: #ffffff; }

    /* Features hero */
    .features-hero { padding: 120px 0 40px; background: radial-gradient(1000px 400px at 20% -10%, #7e57c2 0, rgba(126,87,194,.0) 60%), linear-gradient(135deg,#4a154b 0%, #611f69 100%); color: #fff; }
    .hero-inner { max-width: 1200px; margin: 0 auto; padding: 0 24px; display: grid; grid-template-columns: 1.2fr .8fr; gap: 48px; align-items: center; }
    .hero-copy h1 { font-size: 56px; line-height: 1.1; margin: 0 0 16px; }
    .hero-copy .muted { opacity: .9; }
    .hero-copy .accent { color: #ecb22e; }
    .subtitle { font-size: 18px; opacity: .9; margin: 0 0 20px; max-width: 620px; }
    .hero-ctas { display: flex; gap: 12px; margin-bottom: 12px; }
    .hero-badges { display: flex; gap: 8px; flex-wrap: wrap; }
    .badge { background: rgba(255,255,255,.12); border: 1px solid rgba(255,255,255,.2); padding: 6px 10px; border-radius: 999px; font-size: 12px; }
    .hero-panel { display:flex; justify-content:center; }
    .ai-card { width: 100%; max-width: 420px; border-radius: 12px; box-shadow: 0 20px 60px rgba(0,0,0,.25); }
    .ai-avatar { background: linear-gradient(135deg,#ecb22e,#ff8a65); color: #1a1a1a; font-weight: 700; display:flex; align-items:center; justify-content:center; }
    .suggestion { display:flex; align-items:center; gap: 10px; padding: 8px 0; color:#1a1a1a; }

    /* Solutions / Enterprise / Resources heros */
    .solutions-hero { padding: 120px 0 40px; background: linear-gradient(135deg,#0d47a1,#1976d2); color: #fff; }
    .enterprise-hero { padding: 120px 0 40px; background: linear-gradient(135deg,#263238,#455a64); color: #fff; }
    .resources-hero { padding: 120px 0 40px; background: linear-gradient(135deg,#1b5e20,#2e7d32); color: #fff; }

    .solutions-grid-pro { display:grid; grid-template-columns: repeat(auto-fit,minmax(280px,1fr)); gap: 20px; }
    .enterprise-highlights { display:grid; grid-template-columns: repeat(auto-fit,minmax(280px,1fr)); gap: 20px; }
    .resources-grid { display:grid; grid-template-columns: repeat(auto-fit,minmax(280px,1fr)); gap: 20px; }

    .bullet-list { margin: 0; padding-left: 18px; }
    .bullet-list li { margin: 6px 0; color: rgba(0,0,0,.8); }

    .trustband { text-align:center; }

    .page-content { padding: 120px 0 120px; min-height: 60vh; background: #f8f9fa; }
    .page-content.tight { padding: 24px 0 40px; }
    .container { max-width: 1200px; margin: 0 auto; padding: 0 24px; }

    .content-kicker { text-align: center; font-size: 14px; text-transform: uppercase; letter-spacing: .12em; color: rgba(0,0,0,.6); margin: 16px 0 24px; }
    .feature-grid-pro { display:grid; grid-template-columns: repeat(auto-fit,minmax(260px,1fr)); gap: 20px; margin-bottom: 28px; }
    .pro-card { border:none; box-shadow: 0 10px 24px rgba(0,0,0,.08); border-radius: 12px; }
    .pro-icon { background: linear-gradient(135deg,#6a11cb,#2575fc); color: #fff; border-radius: 8px; display:flex; align-items:center; justify-content:center; }

    /* Pillars list */
    .pillars { display:grid; grid-template-columns: 1fr; gap:16px; margin: 12px 0 28px; }
    .pillar { display:flex; gap:12px; align-items:flex-start; background:#fff; border:1px solid #eee; border-radius:12px; padding:16px; box-shadow: 0 6px 16px rgba(0,0,0,.04); }
    .pillar-icon { width:36px; height:36px; border-radius:8px; display:flex; align-items:center; justify-content:center; background:#eef2ff; color:#3949ab; flex-shrink:0; }
    .pillar-body h3 { margin:0 0 4px; font-size:18px; }
    .pillar-body p { margin:0; color: rgba(0,0,0,.72); }

    .integrations { background:#ffffff; border: 1px solid #eee; border-radius: 12px; padding: 24px; box-shadow: 0 10px 24px rgba(0,0,0,.06); margin-bottom: 28px; }
    .logo-row { display:flex; gap:10px; flex-wrap:wrap; margin-top:10px; }
    .logo-pill { background:#f1f3f5; border:1px solid #e9ecef; padding:6px 10px; border-radius:999px; font-size:12px; }

    .two-col-cards { display:grid; grid-template-columns: repeat(auto-fit,minmax(280px,1fr)); gap: 20px; margin: 12px 0 28px; }
    .info-card { border:none; box-shadow: 0 10px 24px rgba(0,0,0,.08); border-radius: 12px; }

    .big-picture { display:grid; grid-template-columns: repeat(auto-fit,minmax(280px,1fr)); gap: 20px; margin: 12px 0 28px; }

    .testimonial { border:none; box-shadow: 0 10px 24px rgba(0,0,0,.06); border-radius: 12px; margin: 12px 0 28px; background:#fff; }
    .quote { font-size: 18px; margin: 0 0 6px; }
    .byline { color: rgba(0,0,0,.6); margin: 0; }

    .final-cta { display:flex; align-items:center; justify-content:space-between; gap: 12px; padding: 20px; background:#fff; border:1px solid #eee; border-radius:12px; box-shadow: 0 10px 24px rgba(0,0,0,.06); }
    .final-cta h3 { margin: 0; font-weight: 700; }

    /* Existing styles below remain for non-features pages */
    .hero-section { text-align: center; margin-bottom: 60px; }
    .page-title { font-size: 48px; font-weight: 700; margin-bottom: 16px; color: #1a1a1a; }
    .page-subtitle { font-size: 20px; color: rgba(0,0,0,0.7); max-width: 600px; margin: 0 auto; }

    .content-section { margin-bottom: 60px; }
    .content-card { border: none; box-shadow: 0 4px 12px rgba(0,0,0,0.1); }

    .features-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 32px; margin-top: 32px; }
    .feature-item { text-align: center; padding: 24px; background: #f8f9fa; border-radius: 8px; }
    .feature-icon { font-size: 48px; color: #4a154b; margin-bottom: 16px; }

    /* Footer */
    .footer { background: #f5f5f5; padding: 60px 0 24px; }
    .footer-content { display: grid; grid-template-columns: repeat(4, 1fr); gap: 40px; margin-bottom: 40px; }
    .footer-section h4 { font-weight: 600; margin-bottom: 16px; color: #1a1a1a; }
    .footer-link { display: block; color: rgba(0,0,0,0.7); text-decoration: none; margin-bottom: 8px; transition: color .2s; cursor: pointer; }
    .footer-link:hover { color: #1a1a1a; }
    .footer-bottom { border-top: 1px solid #e0e0e0; padding-top: 24px; display: flex; justify-content: space-between; align-items: center; }
    .footer-left { display: flex; align-items: center; gap: 16px; }
    .footer-logo { display: flex; align-items: center; gap: 8px; }
    .footer-right { display: flex; gap: 24px; }

    @media (max-width: 768px) {
      .nav-center { display: none; }
      .hero-inner { grid-template-columns: 1fr; gap: 24px; text-align:center; }
      .callout { flex-direction: column; align-items: flex-start; }
      .footer-content { grid-template-columns: repeat(2,1fr); }
      .footer-bottom { flex-direction: column; gap: 16px; text-align: center; }
    }
  `]
})
export class PlaceholderComponent implements OnInit {
  @Input() pageType: string = 'features';

  proFeatures = [
    { icon: 'view_kanban', title: 'Plan and organize tasks', description: 'Break big ideas into achievable steps with epics, tasks, boards, and timelines.' },
    { icon: 'flag', title: 'Align work to goals', description: 'Link work to measurable goals so everyone understands impact and priority.' },
    { icon: 'tune', title: 'Work your way', description: 'Customize workflows and stay in sync with the tools your teams already use.' },
    { icon: 'analytics', title: 'Keep projects on track', description: 'Spot risks, surface insights, and improve performance with real-time data.' }
  ];

  solutionCategories = [
    { icon: 'engineering', title: 'Engineering', subtitle: 'Plan, build, ship', bullets: ['Scrum & Kanban boards','Backlogs & sprints','Release tracking'] },
    { icon: 'campaign', title: 'Marketing', subtitle: 'Plan & launch', bullets: ['Campaign plans','Assets & approvals','Content calendar'] },
    { icon: 'support_agent', title: 'IT', subtitle: 'Track requests', bullets: ['Change management','Incident workflows','Service templates'] },
    { icon: 'draw', title: 'Design', subtitle: 'Creative ops', bullets: ['Design reviews','Figma links','Asset handoff'] },
    { icon: 'precision_manufacturing', title: 'Operations', subtitle: 'Custom processes', bullets: ['Work cells','Checklists','Automation'] },
    { icon: 'rocket_launch', title: 'CX (Jumpstart)', subtitle: 'Kickstart quickly', bullets: ['Product launch plan','Bug triage board','IT change requests'] }
  ];

  enterpriseHighlights = [
    { icon: 'verified_user', title: 'Compliance & controls', description: 'SOC 2, ISO 27001, audit logs, data residency, and retention policies.' },
    { icon: 'lock', title: 'Advanced security', description: 'SSO/SAML, SCIM provisioning, enforced MFA, and granular permissions.' },
    { icon: 'trending_up', title: 'Scale & performance', description: 'High concurrency APIs, project archiving, and performance insights.' }
  ];

  resourcesList = [
    { icon: 'menu_book', title: 'Guides', subtitle: 'Best practices', description: 'Best practices for planning, tracking, and reporting.' },
    { icon: 'view_module', title: 'Templates', subtitle: 'Jumpstart quickly', description: 'Boards, lists, and timelines pre-configured for popular workflows.' },
    { icon: 'integration_instructions', title: 'Developer docs', subtitle: 'Build on CollabX', description: 'REST and WebSocket APIs, webhooks, and app examples.' },
    { icon: 'groups', title: 'Community', subtitle: 'Learn together', description: 'Tips, patterns, and showcases from teams using CollabX.' }
  ];

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.data.subscribe(data => {
      if (data['pageType']) {
        this.pageType = data['pageType'];
      }
    });
  }

  getPageTitle(): string {
    const titles: { [key: string]: string } = {
      'features': 'Home',
      'solutions': 'Solutions',
      'enterprise': 'Enterprise',
      'resources': 'Resources',
      'pricing': 'Pricing',
      'about': 'About',
      'careers': 'Careers',
      'contact': 'Contact',
      'blog': 'Blog',
      'help': 'Help Center',
      'developers': 'Developers',
      'api': 'API',
      'community': 'Community',
      'privacy': 'Privacy',
      'terms': 'Terms',
      'security': 'Security',
      'cookies': 'Cookies'
    };
    return titles[this.pageType] || 'Page';
  }

  getPageSubtitle(): string {
    const subtitles: { [key: string]: string } = {
      'features': 'Welcome to CollabX – Real-Time SaaS Platform',
      'solutions': 'Tailored solutions for every team and industry',
      'enterprise': 'Enterprise-grade security and compliance',
      'resources': 'Help, guides, and resources to get the most out of CollabX',
      'pricing': 'Simple, transparent pricing for teams of all sizes',
      'about': 'Learn more about our mission and team',
      'careers': 'Join us in building the future of collaboration',
      'contact': 'We’d love to hear from you',
      'blog': 'Insights and updates from the CollabX team',
      'help': 'Find answers and get support',
      'developers': 'Build on CollabX with our tools and docs',
      'api': 'Integrate using our REST and WebSocket APIs',
      'community': 'Learn together and share best practices',
      'privacy': 'Your data, protected with care',
      'terms': 'Our terms of service',
      'security': 'Security practices and controls',
      'cookies': 'How we use cookies'
    };
    return subtitles[this.pageType] || 'Page description';
  }

  getContentTitle(): string {
    const titles: { [key: string]: string } = {
      'features': 'Everything you need to work together',
      'solutions': 'Solutions that work for your business',
      'enterprise': 'Enterprise security and compliance',
      'resources': 'Resources and support',
      'pricing': 'Choose the right plan for your team',
      'about': 'About CollabX',
      'careers': 'Open roles and culture',
      'contact': 'Get in touch',
      'blog': 'Latest articles',
      'help': 'Help Center',
      'developers': 'Developer resources',
      'api': 'API overview',
      'community': 'Community resources',
      'privacy': 'Privacy policy',
      'terms': 'Terms of service',
      'security': 'Security overview',
      'cookies': 'Cookie policy'
    };
    return titles[this.pageType] || 'Content title';
  }

  getContentDescription(): string {
    const descriptions: { [key: string]: string } = {
      'features': 'Discover the powerful features that make CollabX the ultimate collaboration platform for modern teams.',
      'solutions': 'From small startups to large enterprises, we have solutions designed to meet your specific needs.',
      'enterprise': 'Trust your most sensitive conversations to our enterprise-grade security and compliance features.',
      'resources': 'Get help, learn best practices, and discover new ways to use CollabX effectively.',
      'pricing': 'Start free and scale as you grow. No hidden fees, no surprises.',
      'about': 'We’re building modern tools that help teams plan, track, and ship together.',
      'careers': 'Work with a diverse, remote-first team focused on impact and growth.',
      'contact': 'Reach our sales and support teams for any questions.',
      'blog': 'Product updates, customer stories, and how-to guides.',
      'help': 'Browse FAQs and step-by-step guides to get unstuck.',
      'developers': 'SDKs, examples, and guides for building on CollabX.',
      'api': 'Authentication, endpoints, and webhooks at a glance.',
      'community': 'Join discussions and share patterns with other teams.',
      'privacy': 'Details on what we collect and how we protect your data.',
      'terms': 'Legal terms governing the use of CollabX.',
      'security': 'Our approach to security, compliance, and data protection.',
      'cookies': 'Understand cookie usage and manage preferences.'
    };
    return descriptions[this.pageType] || 'Content description';
  }

  getFeatures(): any[] {
    return [
      { icon: 'chat', title: 'Real-time messaging', description: 'Connect with your team instantly with real-time messaging across channels and direct messages.' },
      { icon: 'folder', title: 'File sharing', description: 'Share files, documents, and images seamlessly with your team members.' },
      { icon: 'search', title: 'Powerful search', description: 'Find anything in your workspace with our powerful search functionality.' },
      { icon: 'notifications', title: 'Smart notifications', description: 'Stay updated with intelligent notifications that keep you informed without being overwhelming.' },
      { icon: 'security', title: 'Secure & private', description: 'Your conversations and data are protected with enterprise-grade security.' },
      { icon: 'phone_android', title: 'Mobile ready', description: 'Access your workspace from anywhere with our responsive mobile-friendly design.' }
    ];
  }

  getSolutions(): any[] {
    return [
      { title: 'Sales', description: 'Close deals faster with better team collaboration' },
      { title: 'Marketing', description: 'Launch campaigns and track results together' },
      { title: 'Customer Support', description: 'Provide better customer service with team coordination' },
      { title: 'Engineering', description: 'Build better products with seamless development workflows' }
    ];
  }

  getPricingPlans(): any[] {
    return [
      { name: 'Free', price: '$0', description: 'Perfect for small teams getting started', features: ['Up to 10 team members','Basic messaging','File sharing','Mobile apps'] },
      { name: 'Pro', price: '$8/user/month', description: 'For growing teams that need more', features: ['Unlimited team members','Advanced messaging','Unlimited file storage','Advanced search','Custom integrations'] },
      { name: 'Enterprise', price: 'Contact Sales', description: 'For large organizations with advanced needs', features: ['Everything in Pro','Advanced security','Compliance features','Priority support','Custom solutions'] }
    ];
  }

  getFooterSections(): any[] {
    return [
      {
        title: 'Product',
        links: [
          { name: 'Home', route: '' },
          { name: 'Solutions', route: 'solutions' },
          { name: 'Pricing', route: 'pricing' },
          { name: 'Enterprise', route: 'enterprise' }
        ]
      },
      {
        title: 'Company',
        links: [
          { name: 'About', route: 'about' },
          { name: 'Careers', route: 'careers' },
          { name: 'Contact', route: 'contact' },
          { name: 'Blog', route: 'blog' }
        ]
      },
      {
        title: 'Resources',
        links: [
          { name: 'Help Center', route: 'help' },
          { name: 'Developers', route: 'developers' },
          { name: 'API', route: 'api' },
          { name: 'Community', route: 'community' }
        ]
      },
      {
        title: 'Legal',
        links: [
          { name: 'Privacy', route: 'privacy' },
          { name: 'Terms', route: 'terms' },
          { name: 'Security', route: 'security' },
          { name: 'Cookies', route: 'cookies' }
        ]
      }
    ];
  }

  goHome() { this.router.navigate(['/']); }
  navigateToLogin() { this.router.navigate(['/auth/login']); }
  navigateToRegister() { this.router.navigate(['/auth/register']); }
  navigateToResources() { this.router.navigate(['/resources']); }
  navigateToContact() { this.router.navigate(['/contact']); }
  navigateToSecurity() { this.router.navigate(['/security']); }
  navigateToProjectsView(view: string) { this.router.navigate(['/apps/projects'], { queryParams: { view } }); }
}
