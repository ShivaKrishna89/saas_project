import { Component } from '@angular/core';

@Component({
  selector: 'app-help-center',
  templateUrl: './help-center.component.html',
  styleUrls: ['./help-center.component.less']
})
export class HelpCenterComponent {
  openCategory(category: string) {
    console.log('Opening category:', category);
    // Navigate to category page or show category content
  }

  openArticle(article: string) {
    console.log('Opening article:', article);
    // Navigate to article page
  }

  openSupportChat() {
    console.log('Opening support chat');
    // Open live chat widget
  }

  sendEmail() {
    window.location.href = 'mailto:support@collabx.com';
  }

  scheduleCall() {
    console.log('Scheduling support call');
    // Open calendar booking
  }
}