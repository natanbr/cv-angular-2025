import { Component } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { StaggerChildrenDirective } from '../../directives/stagger-children.directive';

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [
    NgOptimizedImage,
    StaggerChildrenDirective
  ],
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.scss', '../../styles/animations.scss']
})
export class ExperienceComponent {
  constructor() {}
}
