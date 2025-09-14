import { Component } from '@angular/core';

@Component({
  selector: 'app-careers',
  templateUrl: './careers.component.html',
  styleUrls: ['./careers.component.less']
})
export class CareersComponent {
  applyForPosition() {
    alert('Thank you for applying. The role is no longer available');
  }
}
