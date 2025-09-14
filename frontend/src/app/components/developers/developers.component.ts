import { Component } from '@angular/core';

@Component({
  selector: 'app-developers',
  templateUrl: './developers.component.html',
  styleUrls: ['./developers.component.less']
})
export class DevelopersComponent {
  joinDeveloperForum() {
    window.open('https://forum.collabx.com', '_blank');
  }

  viewGitHub() {
    window.open('https://github.com/collabx', '_blank');
  }

  joinDiscord() {
    window.open('https://discord.gg/collabx', '_blank');
  }
}