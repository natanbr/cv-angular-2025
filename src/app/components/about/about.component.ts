import { Component } from '@angular/core';
import { FadeInBottomDirective } from '../../directives/fade-in-bottom.directive';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [FadeInBottomDirective],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss', '../../styles/animations.scss']
})
export class AboutComponent {
  constructor() {}
}
