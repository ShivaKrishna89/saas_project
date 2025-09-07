import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-pricing',
  templateUrl: './pricing.component.html',
  styleUrls: ['./pricing.component.less']
})
export class PricingComponent implements OnInit {
  isAnnual = false;
  isLoggedIn = false;
  currentUser: any = null;

  freeFeatures = [
    'Up to 5 team members',
    'Unlimited messages',
    '10GB file storage',
    'Basic integrations',
    'Mobile apps',
    'Email support',
    'Basic analytics',
    'Standard security'
  ];

  proFeatures = [
    'Everything in Free',
    'Unlimited team members',
    'Advanced AI features',
    '100GB file storage',
    'Premium integrations',
    'Priority support',
    'Advanced analytics',
    'Custom branding',
    'API access',
    'SSO integration',
    'Advanced security',
    'Custom workflows'
  ];

  enterpriseFeatures = [
    'Everything in Pro',
    'Unlimited storage',
    'Dedicated support',
    'Custom integrations',
    'On-premise deployment',
    'Advanced compliance',
    'Custom SLA',
    'Dedicated account manager',
    'Training & onboarding',
    'Custom reporting',
    'White-label solution',
    '24/7 phone support'
  ];

  faqs = [
    {
      question: 'Can I change plans anytime?',
      answer: 'Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately, and we\'ll prorate any billing differences.'
    },
    {
      question: 'What happens to my data if I cancel?',
      answer: 'Your data remains accessible for 30 days after cancellation. You can export all your data during this period. After 30 days, data is permanently deleted.'
    },
    {
      question: 'Do you offer refunds?',
      answer: 'We offer a 30-day money-back guarantee for all paid plans. If you\'re not satisfied, contact our support team for a full refund.'
    },
    {
      question: 'Is there a free trial for paid plans?',
      answer: 'Yes! You can start with our free plan and upgrade anytime. All paid plans come with a 14-day free trial, no credit card required.'
    },
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and bank transfers for annual plans.'
    },
    {
      question: 'Can I get a custom plan for my organization?',
      answer: 'Absolutely! Contact our sales team to discuss custom pricing, features, and deployment options for your organization.'
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

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.checkAuthStatus();
  }

  checkAuthStatus() {
    this.currentUser = this.authService.currentUserValue;
    this.isLoggedIn = !!this.currentUser;
  }

  navigateToLogin() {
    this.router.navigate(['/auth/login']);
  }

  navigateToRegister() {
    this.router.navigate(['/auth/register']);
  }

  talkToSales() {
    this.router.navigate(['/contact']);
  }

  goHome() {
    this.router.navigate(['/']);
  }
}
