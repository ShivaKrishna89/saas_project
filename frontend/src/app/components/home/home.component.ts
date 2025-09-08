import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent {
  features = [
    {
      icon: 'smart_toy',
      title: 'AI-Powered Productivity',
      description: 'Leverage artificial intelligence to automate tasks, generate insights, and boost team efficiency by 40%'
    },
    {
      icon: 'real_time_sync',
      title: 'Real-time Collaboration',
      description: 'Work together seamlessly with live editing, instant messaging, and synchronized updates across all devices'
    },
    {
      icon: 'analytics',
      title: 'Advanced Analytics',
      description: 'Get deep insights into team performance, project progress, and productivity metrics with beautiful dashboards'
    },
    {
      icon: 'security',
      title: 'Enterprise Security',
      description: 'Bank-grade security with end-to-end encryption, SSO, and compliance with SOC2, GDPR, and HIPAA'
    },
    {
      icon: 'extension',
      title: '500+ Integrations',
      description: 'Connect with your favorite tools including Slack, Microsoft Teams, Google Workspace, and more'
    },
    {
      icon: 'devices',
      title: 'Cross-Platform',
      description: 'Access your workspace anywhere with native apps for iOS, Android, Windows, Mac, and web browsers'
    }
  ];

  testimonials = [
    {
      quote: "CollabX has completely transformed how our remote team works together. The AI features are game-changing!",
      name: "Sarah Johnson",
      role: "CEO, TechStart Inc."
    },
    {
      quote: "The real-time collaboration features saved us hours every week. Our productivity has increased by 60%.",
      name: "Michael Chen",
      role: "Product Manager, InnovateCorp"
    },
    {
      quote: "Finally, a platform that actually makes team communication fun and efficient. Highly recommended!",
      name: "Emily Rodriguez",
      role: "Team Lead, Creative Agency"
    }
  ];

  solutions = [
    {
      title: 'Sales',
      description: 'Close deals faster',
      route: 'solutions'
    },
    {
      title: 'Marketing',
      description: 'Launch campaigns',
      route: 'solutions'
    },
    {
      title: 'Customer Support',
      description: 'Help customers',
      route: 'solutions'
    },
    {
      title: 'Engineering',
      description: 'Build better products',
      route: 'solutions'
    }
  ];

  integrations = [
    { name: 'Microsoft Teams', icon: 'video_call' },
    { name: 'Google Drive', icon: 'cloud' },
    { name: 'Google Docs', icon: 'description' },
    { name: 'Figma', icon: 'design_services' },
    { name: 'Miro', icon: 'gesture' },
    { name: 'Slack', icon: 'chat' },
    { name: 'Zoom', icon: 'videocam' },
    { name: 'GitHub', icon: 'code' },
    { name: 'Jira', icon: 'bug_report' },
    { name: 'Trello', icon: 'view_kanban' },
    { name: 'Notion', icon: 'note' },
    { name: 'Asana', icon: 'task' }
  ];

  footerSections = [
    {
      title: 'Product',
      links: [
        { name: 'Home', route: 'home' },
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

  constructor(private router: Router) {}

  navigateToLogin() {
    this.router.navigate(['/auth/login']);
  }

  navigateToRegister() {
    this.router.navigate(['/auth/register']);
  }

  navigateToContact() {
    this.router.navigate(['/contact']);
  }

  navigateToSolution(route: string) {
    this.router.navigate(['/' + route]);
  }

  navigateToEnterprise() {
    this.router.navigate(['/enterprise']);
  }

  talkToSales() {
    this.router.navigate(['/contact']);
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}