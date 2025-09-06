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
      icon: 'chat',
      title: 'Real-time messaging',
      description: 'Stay connected with instant messaging and file sharing'
    },
    {
      icon: 'group',
      title: 'Team collaboration',
      description: 'Work together seamlessly with channels and direct messages'
    },
    {
      icon: 'search',
      title: 'Powerful search',
      description: 'Find anything instantly with our advanced search capabilities'
    },
    {
      icon: 'security',
      title: 'Enterprise security',
      description: 'Bank-grade security with SSO and compliance features'
    },
    {
      icon: 'integration',
      title: 'Integrations',
      description: 'Connect with 2000+ apps and services you already use'
    },
    {
      icon: 'mobile',
      title: 'Mobile apps',
      description: 'Stay productive on the go with our mobile applications'
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

  footerSections = [
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