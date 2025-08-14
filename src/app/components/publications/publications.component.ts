import { Component } from '@angular/core';
import {StaggerChildrenDirective} from '../../directives/stagger-children.directive';

@Component({
  selector: 'app-publications',
  standalone: true,
  imports: [
    StaggerChildrenDirective
  ],
  templateUrl: './publications.component.html',
  styleUrls: ['./publications.component.scss', '../../styles/animations.scss']
})
export class PublicationsComponent {
}
