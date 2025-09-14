import { Component } from '@angular/core';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.less']
})
export class BlogComponent {
  readMore() {
    alert('Article content coming soon! This would open the full article.');
  }

  readBlogPost(postTitle: string) {
    alert(`Opening article: "${postTitle}". Article content coming soon!`);
  }

  subscribeToNewsletter() {
    alert('Thanks for subscribing!');
  }
}
