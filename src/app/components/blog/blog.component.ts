import { Component } from '@angular/core';
import {StaggerChildrenDirective} from '../../directives/stagger-children.directive';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [
    StaggerChildrenDirective
  ],
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss', '../../styles/animations.scss']
})
export class BlogComponent {
}
